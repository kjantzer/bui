const MarcPart = require('./_part.js')

class MarcPosition extends MarcPart {

    get start(){ return this.get('start') }
    get end(){ return this.get('end') }
    get charLength(){ return this.end - this.start + 1 }

    get shortKey(){
        if( this.start === this.end )
            return this.start
        else
            return key
    }

}

module.exports = MarcPosition