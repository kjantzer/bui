import {Collection} from 'backbone'

export default class Coll extends Collection {

    constructor({root='/api/ftp'}){
        super()
        this.urlRoot = root
        this.path = []
    }
    
    get url(){ return this.urlRoot+(this.path.length>0?('/'+this.path.join('/')):'') }

    get pathString(){
        return this.path.join('/')
    }

    set path(val){
        if( typeof val == 'string' )
            val = val.split('/').map(s=>decodeURIComponent(s))

        this.__path = Array.isArray(val) ? val : []
        this.trigger('change:path')
    }

    get path(){ return this.__path }

    push(path){
        this.path.push(path)
        this.trigger('change:path')
    }
    
    pop(){
        this.path.pop()
        this.trigger('change:path')
    }

    navTo(index=''){
        index = parseInt(index)
        if( isNaN(index) )
            this.path = []
        this.path = this.path.slice(0,index+1)
        this.trigger('change:path')
    }
}