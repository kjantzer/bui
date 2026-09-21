const MarcPart = require('./_part.js')

class MarcSubfield extends MarcPart {

    type = 'subfield'

    get role(){
        // 0-9 are control characters, a-z are data characters
        return this.code.charCodeAt(0) <= 56 ? 'control' : 'data'
    }

    get ordinal(){
        let num = String(this.code).charCodeAt(0)
        if( num <= 56 ) num += 100 // numbers should come after letters
        return num
    }

}

module.exports = MarcSubfield