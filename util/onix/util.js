
// per docs, if format not given, default is `YYYYMMDD`
function formatDate(val, format="YYYYMMDD"){

    let map = {
        'YYYYMMDD': [/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'],
        'YYYYMM': [/(\d{4})(\d{2})/, '$1-$2']
    }

    format = map[format]
    if( format ){
        val = String(val).replace(format[0], format[1])
    }
    
    return val
}

function uniformAndDedupeCSV(str){
    if( !str ) return str
    return Array.from(
        new Set(String(str)?.split(/,|;/g)) // dedupe
    ).map(s=>s.trim()).sort().join(';') // order and unify delimiter
}

module.exports = {formatDate, uniformAndDedupeCSV}