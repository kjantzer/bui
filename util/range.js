
function range(start, stop, step=1) {

    if( start && stop == undefined ){
        stop = start
        start = 1
    }

	start = parseFloat(start) || 0 
	stop = parseFloat(stop) || 0 

    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}

range.alpha = (start, stop)=>{
    start = start.charCodeAt(0)
    stop = stop.charCodeAt(0)
    return range(start, stop).map(code=>String.fromCharCode(code))
}

module.exports = range