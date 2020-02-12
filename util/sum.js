
const sum = function(array, fn){
    
    if( array === undefined ){
        fn = array
        array = this
    }
    
    return array.reduce((n, val)=>{
        return parseFloat(typeof fn == 'function' ? fn(val) : val) +n
    }, 0)
}

export default sum

Array.prototype.sum =  function(fn){ return sum(this, fn)}
Object.defineProperty(Array.prototype, 'sum', {enumerable: false});