
// https://stackoverflow.com/a/8495740/484780
module.exports = async function(cb, {size=1000}={}){
    var i,j, chunked;
    for (i = 0,j = this.length; i < j; i += size) {
        chunked = this.slice(i, i + size);
        await cb(chunked)
    }
}