import {Collection, Model} from 'backbone'
import {Dialog} from 'bui'

const Types = [
    {label: 'Private', description: 'Viewable by only you', val: 'private'},
    {label: 'Public', description: 'Other people can use, but only you can modify', val: 'public'},
    {label: 'Shared', description: 'Anyone can use and modify', val: 'shared'}
]

export default class ListFilterSets extends Collection {

    get url(){ return '/api/v6/bui-list-filters/'+this.key }
    get model(){ return ListFilterSet }
    
    // find a preset that matches (exactly) the applied filters
    findMatchesFilters(filters){
        return this.find(m=>filtersMatch(filters, m))
    }

    filtersMatchModel(filters, model){ return filtersMatch(filters, model) }

    // ungrouped first, then by group; in a group by `sort` (unsorted last), then name (same as the server)
    comparator(a, b){
        let ga = a.get('group_name') || '', gb = b.get('group_name') || ''
        if( ga != gb ) return !ga ? -1 : !gb ? 1 : ga.localeCompare(gb)

        let sa = a.get('sort') ?? Infinity, sb = b.get('sort') ?? Infinity
        if( sa != sb ) return sa < sb ? -1 : 1

        return (a.get('name')||'').localeCompare(b.get('name')||'')
    }

    // [[groupName, [models]], ...] in display order ('' = ungrouped)
    get groups(){
        let groups = new Map()
        this.forEach(m=>{
            let name = m.get('group_name') || ''
            if( !groups.has(name) ) groups.set(name, [])
            groups.get(name).push(m)
        })
        return [...groups]
    }

    get groupNames(){
        return this.groups.map(([name])=>name).filter(name=>name)
    }

    // saves the order of these presets (ex: one group's, after a drag)
    async saveSort(models){
        models.forEach((m, i)=>m.set('sort', i+1, {silent: true}))
        this.sort()
        this.trigger('update', this, {})
        await fetch(this.url+'/sort', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ids: models.map(m=>m.id)})
        })
    }

    async moveToGroup(model, group_name){
        group_name = group_name || null
        if( group_name == (model.get('group_name')||null) ) return

        // goes to the end of its new group
        let last = this.filter(m=>(m.get('group_name')||null) == group_name).length
        await model.saveSync({group_name, sort: last+1}, {patch: true})
        this.sort()
        this.trigger('update', this, {})
    }
}

// nothing custom about the model
class ListFilterSet extends Model {}


/* 
    UTIL 
*/

export function filtersMatch(filters, model){
    
    let filterValues = {}
    let modelFilters =  {...model.get('filters')}
    let matches = true

    // stringify all values of set filters
    for( let k in filters ){
        filterValues[k] = JSON.stringify(filters[k])

        // make sure model has this filter key, so we can compare it
        if( modelFilters[k] === undefined )
            modelFilters[k] = undefined
    }

    // now compare each of the model filters to the given filters
    for( let k in modelFilters ){

        // contains filter NOT applied
        if( filterValues[k] == undefined ) matches = false

        let val = JSON.stringify(modelFilters[k])

        if( val != filterValues[k] ) matches = false
    }

    return matches
}

export async function edit(model){

    let isModel = model?.toJSON
    let groups = (model?.collection || this?.coll)?.groupNames || []
    let vals = isModel ? model.toJSON() : {
        name: this.filters?.toString(),
        type: 'private'
    }

    let attrs = await Dialog.prompt({
        icon: 'layers',
        title: isModel ? 'Edit Filter Preset' : 'Create Filter Preset',
        prompts: [
            {label: 'Name', key: 'name', required: true},
            {label: 'Summary', key: 'summary', placeholder: '(optional)'},
            {label: 'Group', key: 'group_name', placeholder: '(optional)',
                helpText: groups.length ? 'Groups: '+groups.join(', ') : 'Shown as a heading; presets with the same group are listed together'},
            {_label: 'Visibility', key: 'type', segment: {_stacked: false},
                options: Types}
        ],
        val: vals,
        btns: ['cancel', (isModel?'save':'create')]
    }).modal()

    if( attrs && attrs.name && model && model.toJSON ){
        let regrouped = (attrs.group_name||null) != (model.get('group_name')||null)
        if( regrouped ) attrs.sort = null // (goes to the end of its new group)
        await model.saveSync(attrs, {patch: true})
        model.collection?.sort()
    }

    return attrs
}

