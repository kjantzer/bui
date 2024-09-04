/*
    # Sum

    ```js
    sum([1,4,5]) // 10
    sum([{n:1}, {n:2}], o=>o.n) // 3

    [1,2,3].sum() // 6
    ```

    > NOTE: this also extnds native Arrays with `.sum`
*/
const sum = function(array, fn){
    
    if( array === undefined ){
        fn = array
        array = this
    }
    
    return array.reduce((n, val)=>{
        return parseFloat(typeof fn == 'function' ? fn(val) : val) +n
    }, 0)
}

module.exports = sum

Array.prototype.sum =  function(fn){ return sum(this, fn)}
Object.defineProperty(Array.prototype, 'sum', {enumerable: false});