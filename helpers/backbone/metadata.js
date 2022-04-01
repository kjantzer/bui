
const metadata = {
    
    // example: metadata.save.call(model, 'traits', 'width', '400px')
    // aka: model.get('traits').width = '400px'
    // TODO: use proxies to effectively do this ^?
    save(attr, key, val){

        let data = this.get(attr) || {}

        data = metadata.applyTo(data, key, val)

        this.save(attr, data, {patch:true})

        // if changed a single data point
        if( val !== undefined )
            this.trigger(`change:${attr}:${key}`, this, {[attr]:data})

        this.trigger('change', this, {[attr]:data})
    },

    applyTo(data, key, val){

        data = data || {}
        let changes = {[key]:val}

        // given an hash of changes
        if( typeof key !== 'string' && val == undefined )
            changes = key

        // apply each change, deleting data if value is "empty"
        for( let k in changes ){
            let v = changes[k]

            if( v == null || (Array.isArray(v) && v.length == 0) )
                delete data[k]
            else
                data[k] = v
        }

       return data
    }

}

export default metadata