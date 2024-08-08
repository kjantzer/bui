// https://en.wikipedia.org/wiki/Serial_comma
module.exports = function serialComma(strings, {limit=0, conjunction='and'}={}){
    
    strings = [...strings] // make sure we dont alter the orig array
    let serialComma = strings.length > 2 ? ',' : ''

    if( limit && strings.length > limit+1 ){
        let extras = strings.splice(limit)
        return strings.join(', ') + `${serialComma} ${conjunction} ${extras.length} ${conjunction=='and'?'more':'others'}`
    }

    const last = strings.length > 1 ? strings.pop() : null
    
    return strings.join(', ') + (last ? `${serialComma} ${conjunction} `+last : '')
}