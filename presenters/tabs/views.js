import TabView from './view'
import store from '../../util/store'

function viewsFromNodes(nodes){

    let views = []
    nodes.forEach(node=>{

        // ignore these node types
        if( node.slot || ['#comment', 'SCRIPT', 'STYLE'].includes(node.nodeName) )
            return

        // already a tab view
        if( node.tabView )
            return

        if( node.nodeName == '#text' ){
            
            let str = node.textContent.trim()
            if( !str ) return
            
            let _views = str.split("\n").map(s=>s.trim())
            _views = _views.filter(v=>v) // ignore empty lines
            views.push(..._views)
            node.textContent = ''

        }else{

            // all tab views should have a title, so add one
            if( !node.title )
                node.title = '[unnamed]'

            views.push(node)

        }
    })

    return views
}

export default class TabViews extends Map {

    constructor(key, nodes){
        super()

        if( key )
            this.cache = store.create('tab-bar:'+key+':active')

        viewsFromNodes(nodes).forEach(v=>{
            v = new TabView(v)
            this.set(v.id, v)
        })
    }

    add(nodes){
        let nextA
        viewsFromNodes(nodes).forEach((v,i)=>{
            v = new TabView(v)

            if( this.get(v.id) )
                return console.warn('b-tabs: cannot add, `'+v.id+'` already exists')
            
            this.set(v.id, v)

            if( i == 0 )
                this.active = v
        })
    }

    remove(nodes){
        nodes.forEach(node=>{

            if( !node.tabView ) return

            console.log('time to remove', node.tabView);

            this.delete(node.tabView.id)
            delete node.tabView
        })

        if( !this.active )
            this.active = this.first
    }

    set active(view){
        
        if( view instanceof HTMLElement )
            view = view.tabBar.id
        if( view instanceof TabView )
            view = view.id
        
        view = this.get(view) || this.first
        
        // view is already the active one
        // if( view && view == this.active )
        //     return 

        if( view && !view.canDisplay ){

            // find the first view we can display
            let fallbackView
            this.forEach(v=>{
                if( !fallbackView && v.canDisplay )
                    fallbackView = v
            })

            this.active = fallbackView
            return false
        }
        
        this.forEach(v=>v.active=false)

        if( view ){
            this.__active = view.id
            view.active = true
        }

        if( this.cache )
            view ? this.cache(view.id) : this.cache(null)
    }

    get active(){
        let active = this.cache ? this.cache() : this.__active
        return active && this.get(active)
    }
    
    get first(){
        return this.at(0)
    }

    at(i){
        return Array.from(this.values())[i]
    }

    get last(){
        return this.at(this.size-1)
    }

    map(fn){
        let resp = []
        this.forEach((v, key)=>resp.push(fn(v, key)))
        return resp
    }
}