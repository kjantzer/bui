const MarcPart = require('./_part.js')

class MarcSection extends MarcPart {

    type = 'section'

    get charLength(){
        return this.map(part => part.charLength||0).reduce((a, b) => a + b, 0)
    }

}

module.exports = MarcSection