/*
    # Array.Chunk

    ```js
    import dedupe from 'bui/util/array.chunk'
    chunk.call(someArray, {size=1000})
    ```
*/
// https://stackoverflow.com/a/8495740/484780
module.exports = async function(cb, {size=1000}={}){
    var i,j, chunked, n=0;
    for (i = 0,j = this.length; i < j; i += size) {
        chunked = this.slice(i, i + size);

        let start = (n*size)+1
        let end = start+chunked.length-1

        await cb(chunked, n++, start, end)
    }
}