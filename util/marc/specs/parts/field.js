const MarcPart = require('./_part.js')

class MarcField extends MarcPart {

    get docsURL(){
        return `https://www.loc.gov/marc/bibliographic/bd${this.key}.html`
    }
}

module.exports = MarcField