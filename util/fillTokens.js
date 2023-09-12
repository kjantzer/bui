const uniq = require('./uniq')

module.exports = function(val, target, {
    tokenStart='{',
    tokenChars='[A-Za-z0-9_]',
    tokenEnd='}'
}={}){

    if( !target ) throw new Error('Cannot fill tokens - missing target')

    let isJSON = typeof val !== 'string'
    let valStr = isJSON ? JSON.stringify(val) : val
    let tokens = JSON.stringify(val).match(new RegExp(`${tokenStart}(${tokenChars}+)${tokenEnd}`, 'g'))

    if( !tokens ) return val

    tokens = uniq(tokens)

    tokens.forEach(token=>{
        let attr = token.replace(new RegExp(`${tokenStart}|${tokenEnd}`, 'g'), '')
        let val = target.get?.(attr) || target[attr] || attr

        valStr = valStr.replace(new RegExp(token, 'g'), val)
    })

    if( isJSON )
        val = JSON.parse(valStr)
    else 
        val = valStr

    return val
}