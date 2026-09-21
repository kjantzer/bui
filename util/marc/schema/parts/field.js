const MarcPart = require('./_part.js')

class MarcField extends MarcPart {

    get tag(){ return this.key }
    type = 'field'

    get docsURL(){
        return `https://www.loc.gov/marc/bibliographic/bd${this.key}.html`
    }

    get ordinal(){
        if( this.key == 'leader' ) return 0
        return parseInt(this.key)
    }

    get shortKey(){
        // if( this.key == 'leader' ) return 'ldr'
        return parseInt(this.key) || this.key
    }

    get charLength(){
        if( this.get('positions') )
            return this.get('positions').charLength

        return Infinity
    }
}

module.exports = MarcField