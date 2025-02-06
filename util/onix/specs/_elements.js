const CollMap = require(`../../collmap`)
const CodeLists67 = require('./codelists67')
const CodeLists36 = require('./codelists36')

// TODO:
function tempUnifiyCodelist(codelist){
    data = Object.entries(data).map(([key, value])=>{
        if( typeof value !== 'object') value = {value}
        return {key, ...value}
    })

    data = data.sort((a,b)=>a.key<b.key?-1:1)
}

class OnixElements extends CollMap {

    constructor(data, {name='ONIX', release, parent, level=0}={}){
        
        super(data)

        if( level == 0 ){
            this.release = release
            this.codelist = release == '2.1' ? CodeLists36 : CodeLists67
            this.flatLookup = new CollMap()
            this.shortTagLookup = new CollMap()
        }

        this.name = name
        this.level = level
        this.parent = parent

        if( this.get('shortTag') || this.get('components') ){

            if( !this.get('shortTag') )
                this.set('shortTag', name.toLowerCase())

            if( !this.top.flatLookup.has(name.toLowerCase()))
                this.top.flatLookup.set(name.toLowerCase(), this)

            if( !this.top.shortTagLookup.has(this.get('shortTag')) )
                this.top.shortTagLookup.set(this.get('shortTag'), this)

            if( this.get('components') ){
                this.set('components', new OnixElements(this.get('components'), {name: 'components', parent: this, level: this.level}))
            }

        }else{
            let mapped = {}
            this.forEach((d,k)=>{

                if( typeof d != 'object' )
                    d = {'shortTag':d}

                d = new OnixElements(d, {name: k, parent: this, level: this.level+1})

                k = k.toLowerCase()
                mapped[k] = d

                if( !this.root.flatLookup.has(k) )
                    this.root.flatLookup.set(k, d)
            })

            this.clear()
            this.set(mapped)
        }
    }

    parseConstructorData(key, data){
        return [key, data]
    }

    // _get(key){
    //     // support dotnotation
    //     let keys = key.toLowerCase().split('.')
    //     key = keys.shift()

    //     // attemp to get the item
    //     let resp = super.get(key)

    //     keys = keys.join('.')
        
    //     // looks like we have further dotnotation to follow
    //     if( keys && resp)
    //         return resp.get(keys)
    //     else
    //         return resp
    // }

    get codeList(){ 
        if( !this.has('codeList') ) return null 
        return this.top.codelist?.[this.get('codeList')]
        || this.top.codelist?.['List'+this.get('codeList')]
    }
    get formatList(){ return this.has('formatList') ? this.top.codelist?.[this.get('formatList')] : null }

    valueOf(code, {noCode=true}={}){
        if( !this.has('codeList') ) return code
        let list = this.codeList
        let value = list?.[code]?.value || list?.['codes']?.[code]
        return noCode ? value : [value, code]
    }

    getTag(name){
        name = name?.toLowerCase()
        return this.top.flatLookup.get(name) || this.top.shortTagLookup.get(name)
    }

    tagAllowed(name){
        name = name?.toLowerCase()
        return this.get('components').find(m=>m.name.toLowerCase() == name || m.get('shortTag') == name)
    }
    
    get shortTag(){ return this.get('shortTag') }

    get top(){ return this.root }

    get root(){
        let root = this.parent || this
        while(root?.parent){
            root = root.parent
        }
        return root
    }

    get path(){
        let path = [this]
        let obj = this
        while(obj?.parent){ 
            obj = obj.parent

            if( obj?.name != 'components' )
                path.unshift(obj)
        }
        return path
    }

    get pathName(){ return this.path.map(d=>d.name) }
}

module.exports = OnixElements