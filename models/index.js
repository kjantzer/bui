/*
    NOTE: proof of concept – still in development
    NOTE: sort of replicates Backbone functionality, but with less 
    overhead and modified for our needs...still thinking things through
*/

export class Collection {

    constructor(){
        this.models = []
    }

    get length(){ return this.models.length }

    forEach(fn){ return this.models.forEach(fn) }
    map(fn){ return this.models.map(fn) }
    flatMap(fn){ return this.models.flatMap(fn) }
    filter(fn){ return this.models.filter(fn) }
    reduce(fn, start=0){ return this.models.reduce(fn, start) }

    async fetchSync(params){ return this.fetch(params) } // alias to match older Backbone change

    async fetch(params){

        let url = new URL(this.url)
        let Model = this.model || Object
        
        if( params.data ){
            let data = params.data

            if( data.filters )
                data.filters = JSON.stringify(params.data.filters)

            url.search = new URLSearchParams(data)
        }
            
        let data = []

        try {
            data = await fetch(url).then(resp=>resp.json())
        }catch(err){
            console.log('failed to fetch data');
            return
        }

        let models = data.map(d=>{
            let m = new Model(d)
            m.coll = this
            return m
        })

        if( params.data && params.data.pageAt > 0 ){
            this.models.push(...models)
        }else{
            this.models.forEach(m=>{
                delete m.coll
            })
            this.models = models
        }
    }
}