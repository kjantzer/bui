const CollMap = require(`../../collmap`)
const CodeList3 = require('./codelists-3.0')
const CodeList2 = CodeList3 // FIXME:

class OnixElements extends CollMap {

    constructor(data, {name='ONIX', version, parent, level=0}={}){
        
        super(data)

        if( level == 0 ){
            this.version = version
            this.codelist = version == '2.1' ? CodeList2 : CodeList3
            this.flatLookup = new CollMap()
            this.shortTagLookup = new CollMap()
        }

        this.name = name
        this.level = level
        this.parent = parent

        if( this.get('shortTag') ){
            this.top.flatLookup.set(name.toLowerCase(), this)
            this.top.shortTagLookup.set(this.get('shortTag'), this)
        }
        else{
            let mapped = {}
            this.forEach((d,k)=>{

                if( typeof d != 'object' )
                    d = {'shortTag':d}

                d = new OnixElements(d, {name: k, parent: this, level: this.level+1})

                k = k.toLowerCase()
                mapped[k] = d
                this.root.flatLookup.set(k, d)
            })

            this.clear()
            this.set(mapped)
        }
    }

    parseConstructorData(key, data){
        return [key, data]
    }

    get codeList(){ return this.has('codeList') ? this.top.codelist?.[this.get('codeList')] : null }
    get formatList(){ return this.has('formatList') ? this.top.codelist?.[this.get('formatList')] : null }

    valueOf(code, {noCode=true}={}){
        if( !this.has('codeList') ) return code
        let value = this.codeList?.[code]?.value
        return noCode ? value : [value, code]
    }

    getTag(name){
        name = name?.toLowerCase()
        return this.top.flatLookup.get(name) || this.top.shortTagLookup.get(name)
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
            path.unshift(obj)
        }
        return path
    }

    get pathName(){ return this.path.map(d=>d.name) }
}

module.exports = OnixElements