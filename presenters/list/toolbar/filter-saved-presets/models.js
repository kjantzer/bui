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
            {_label: 'Visibility', key: 'type', segment: {_stacked: false},
                options: Types}
        ],
        val: vals,
        btns: ['cancel', (isModel?'save':'create')]
    }).modal()

    if( attrs && attrs.name && model && model.toJSON ){
        model.saveSync(attrs, {patch: true})
    }

    return attrs
}

