function stringToSubfields(str){
    if( !str ) return []

    let SF = '$'
    let i = 0
    let sf = []

    while( i < str.length ){
        if( str[i] !== SF ){
            i++
            continue
        }

        const code = str[i + 1]
        let end = i + 2
        while( end < str.length && str[end] !== SF )
            end++

        let val = str.substring( i + 2, end )
        sf.push([code, val])
        i = end
    }

    return sf
}

module.exports = {
    stringToSubfields
}