import {Collection} from 'backbone'
import {register as panelRegister} from '../../presenters/panel'

export default class Coll extends Collection {

    set url(val){ this.__url = val }
    get url(){ return this.__url+'/'+encodeURIComponent(this.term||'')  }

    fetchSync(...args){
        if( !this.term ) return Promise.resolve()
        return super.fetchSync(...args)
    }

    parse(resp, opts){

        // when viewing default "recent history" and we just fetched the first page of results,
        // prepend with any open panel views
        if( resp && this.term == 'user-history' && opts?.data?.pageAt === 0 ){
            
            let openViews = panelRegister.openPanels().map(d=>{
                return {
                    result_type: 'view-open',
                    label: d.panel.title,
                    icon: d.panel.icon,
                    url: d.route.currentPath,
                    model: d.panel.view.model,
                    ...d
                }
            }).filter(d=>!['Search'].includes(d.label))

            openViews.shift() // remove first view, it's already the top most view

            resp.unshift(...openViews)
        }

        return resp
    }

}