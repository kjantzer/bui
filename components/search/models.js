import {Collection} from '../../models'

export default class Coll extends Collection {
    
    constructor(url='/api/search'){
        super()
        this.__url = url
        this.term = ''
    }

    get url(){ return this.__url+'/'+encodeURIComponent(this.term)  }

    fetch(...args){
        if( !this.term ) return false
        return super.fetch(...args)
    }

}