
module.exports = arr=>{
    var a = [];
    var l = arr.length;

    for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
            // If arr[i] is found later in the array
            if (arr[i] === arr[j])
                j = ++i;
        }
        a.push(arr[i]);
    }

    return a;
}