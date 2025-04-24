/*
    # csvToArray

    This will parse a delimited string into an array of
    arrays. The default delimiter is the comma, but this
    can be overriden in the second argument.

    ```js
    let data = csvToArray('name,gender\njohn,male', opts)
    ```

    ### Opts

    - strDelimiter=','
    - hasHeader=true
    - mergeHeader=true
    - normalizeHeader=false
    - formatHeader=null
    - rowLengthThreshold=0.3 // rows must be greater (ratio of non-empty cells to determined "row cell length")
    - headerLengthThreshold=true // true means use rowLengthThreshold
    -ignoreComments=true,
    - ignoreEmptyLines=true

    ref: http://stackoverflow.com/a/1293163/2343
*/

const mode = require('./math').mode

function csvToArray(strData, {
    strDelimiter=',',
    hasHeader=true,
    mergeHeader=true,
    normalizeHeader=false,
    formatHeader=null,
    // TODO: support 'auto' mode; lower threshold when rowLength is small, higher threshold when large row length
    rowLengthThreshold=0.3, // rows must be greater (ratio of non-empty cells to determined "row cell length")
    headerLengthThreshold=true, // true means use rowLengthThreshold
    ignoreComments=true,
    ignoreEmptyLines=true
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

    // filter out comments (CSVs)
    if( ignoreComments )
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

        // CSVs may have rows with different lengs
        if( row.length < rowLength ){

            if( row[0] && foundRow )
                footer.push(row)
                
            else if( row[0] )
                header.push(row)
            
            return false

        // possible all rows, even headers/footers have same length
        // particularly if the csv was genereated from an excel file
        }else if( rowLengthThreshold !== false || ignoreEmptyLines ){

            // filter out empty cells
            let rowDataOnly = row.filter(d=>d)

            if( ignoreEmptyLines && rowDataOnly.length == 0 )
                return false

            // are we less than the min threshold?
            if( rowLengthThreshold !== false && 
            (!rowDataOnly.length || (rowDataOnly.length / rowLength) <= rowLengthThreshold) ){
                
                // if row still has data, add to header/footer
                if( rowDataOnly.length > 0 )
                    foundRow ? footer.push(row) : header.push(row)

                return false
            }
        }

        foundRow = true
        return true
    })

    addDataHeader: if( hasHeader ){

        let dataHeader = null
        let _headerLengthThreshold = headerLengthThreshold 
            ? (headerLengthThreshold === true ? rowLengthThreshold : headerLengthThreshold )
            : 1 // perfect match

        while(!dataHeader && arrData.length > 0 ){
            
            // in most cases, the header should not have any empty cells
            dataHeader = arrData.shift()
            let dataHeaderDataOnly = dataHeader.filter(d=>d)

            // dont use this "data header" if NOT the same num of columns
            if( (dataHeaderDataOnly.length / rowLength) <= _headerLengthThreshold ){
                
                // if row still has content, add it to the "header"
                if( dataHeader.length > 0 )
                    header.push(dataHeader)

                // clear, then try to get next row as header
                dataHeader = null
            }                
        }

        // hmm...no data header could be determined
        if( !dataHeader ) break addDataHeader

        if( normalizeHeader )
            dataHeader = dataHeader.map(str=>_normalizeHeader(str?.trim()))

        if( formatHeader )
            dataHeader = formatHeader(dataHeader)
        
        if( mergeHeader )
            arrData = arrData.map(line=>{
                let obj = {};
                dataHeader.forEach((key, i) => obj[key] = line[i]);
                return obj
            })
        
        arrData.dataHeader = dataHeader
    }

    arrData.comments = comments.join(`\n`)
    arrData.header = header // TODO: rename to "heading"?
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