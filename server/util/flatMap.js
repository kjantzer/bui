
Array.prototype.flatMap = function(fn){
    return this.map(k=>fn(k))
                .reduce((a,b)=>a.concat(...b), [])
}

Object.defineProperty(Array.prototype, 'flatMap', {enumerable: false});