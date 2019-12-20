import Emitter from 'component-emitter'

export default class Layouts extends Map {

    get _storeKey(){ return 'b-list:'+this.key+':layout'}

    constructor(layouts){
        if( !Array.isArray(layouts) )
            layouts = Object.entries(layouts)

        super(layouts)
    }

    at(index){
        return Array.from(this.keys())[index]
    }

    next(){
        let keys = Array.from(this.keys())
        let index = keys.indexOf(this.active)
        index++

        if( index >= keys.length )
            index = 0
        
        this.active = this.at(index)
    }

    get active(){
        return this.__layout || localStorage.getItem(this._storeKey) || this.at(0)
    }

    set active(val){
        let oldVal = this.active

        if( !this.has(val) )
            val = this.at(0)

        this.__layout = val

        if( this.key && val )
            localStorage.setItem(this._storeKey, this.__layout)
        
        else if( this.key && !val )
            localStorage.removeItem(this._storeKey)

        if( val != oldVal )
            this.emit('change', val)
    }

}

Emitter(Layouts.prototype)