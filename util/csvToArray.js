// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
const mode = require('./math').mode

function csvToArray(strData, {
    strDelimiter=',',
    hasHeader=true,
    normalizeHeader=false,
    formatHeader=null,
}={}){

    if( !strData ) return null

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
            "gi"
        );

    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;

    strData = strData.trim();

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
            new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }


    let comments = []

    // filter out comments
    arrData = arrData.filter(row=>{
        if( row && row[0] && row[0][0] == '#' ){
            comments.push(row)
            return false
        }
        return true
    })

    let header = []
    let footer = []
    let foundRow = false
    let rowLengths = arrData.map(r=>r.length)
    let rowLength = mode(rowLengths)[0]

    arrData = arrData.filter(row=>{

        if( row.length < rowLength ){

            if( row[0] && foundRow )
                footer.push(row)
            else if( row[0] )
                header.push(row)
            
            return false
        }
        foundRow = true
        return true
    })

    if( hasHeader ){
        let header = arrData.shift()

        if( normalizeHeader )
            header = header.map(str=>_normalizeHeader(str))

        if( formatHeader )
            header = formatHeader(header)
    
        arrData = arrData.map(line=>{
            let obj = {};
            header.forEach((key, i) => obj[key] = line[i]);
            return obj
        })
    }

    arrData.comments = comments.join(`\n`)
    arrData.header = header
    arrData.footer = footer

    // Return the parsed data.
    return( arrData );
}

module.exports = csvToArray

function _normalizeHeader(str){
    return str.toLowerCase()
    .replace(/\s{2,}/g, ' ')
    .replace(/\s|-/g, '_')
    .replace(/[\/\[\]\(\)]/g, '')
    .replace(/_{2,}/g, '_')
}

csvToArray.normalizeHeader = _normalizeHeader