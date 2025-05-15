/*
    # csvSplit

    Given a CSV string - or array of CSV lines as strings - split it into chunks of a given size.

    ```js
    let csv = 'header1,header2\nvalue1,value2\nvalue3,value4'

    let chunks = csvSplit(csv, {maxLines: 100})
    let chunks = csvSplit(csv, {maxLines: 100, returnLines: true})
    ```
*/
// TODO: support `numChunks` instead of `maxLines`?
module.exports = function(csv, {maxLines, hasHeader=true, returnLines}={}){

    let isArray = Array.isArray(csv)
    let lines = isArray ? csv : csv.split(/\r?\n/)
    let header = hasHeader ? lines.shift() : null

    lines = lines.filter(s=>s.trim())

    let chunks = []

    for (let i = 0; i < lines.length; i += maxLines) {
        let chunk = lines.slice(i, i + maxLines)
        if(hasHeader) chunk.unshift(header)

        if( returnLines !== true && isArray )
            chunk = chunk.join('\n')

        chunks.push(chunk)
    }

    return chunks
}