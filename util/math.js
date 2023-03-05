// https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript

const BMath = {

round(num, decimals=2){
    if( typeof num == 'string' )
		num = parseFloat(num)
	
	let divisor = Math.pow(10, decimals)
	
	return Math.round(num * divisor) / divisor 
},

inToMM(val, decimals=1){ return BMath.round(val * 25.4, decimals) },
mmToIn(val, decimals=1){ return BMath.round(val / 25.4, decimals) },

/**
 * The "median" is the "middle" value in the list of numbers.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated median value from the specified numbers.
 */
median(numbers){
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    var median = 0, numsLen = numbers.length;
    numbers.sort();
 
    if (
        numsLen % 2 === 0 // is even
    ) {
        // average of two middle numbers
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = numbers[(numsLen - 1) / 2];
    }
 
    return median;
},

/**
 * The "mode" is the number that is repeated most often.
 *
 * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
 *
 * @param {Array} numbers An array of numbers.
 * @return {Array} The mode of the specified numbers.
 */
mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
},

roundTo(num, ratio=2){
    num = parseFloat(num)
    if( isNaN(num) ) return ''
    return Math.round(num * ratio) / ratio;
},

prettyDecimal(val='', ratio=null){
    if( ratio != null )
        val = this.roundTo(val, ratio)

    val = String(val)

    val = val.replace(/\.00?$/, '');
    val = val.replace(/\.25$/, '¼');
    val = val.replace(/\.50?$/, '½');
    val = val.replace(/\.75$/, '¾');
    val = val.replace(/^0*/, '') // remove leading 0s
    return val
},

// based on: https://stackoverflow.com/a/20811670/484780
// may not be best solution
// TODO: let `replaceWith` be an "average"?
fixOutliers(values, {remove=false, replaceWith='auto', iqrLower=1.5, iqrUpper=1.5}={}){ 

    // Copy the values, rather than operating on references to existing values
    let vals = values.concat()

    // remove null/undefined values
    vals = vals.filter(val=>val!==null&&val!==undefined)

    // Then sort
    vals.sort((a, b)=>a-b)

    /* Then find a generous IQR. This is generous because if (vals.length / 4) 
     * is not an int, then really you should average the two elements on either 
     * side to find q1.
     */     
    let q1 = vals[Math.floor((vals.length / 4))]
    // Likewise for q3. 
    let q3 = vals[Math.ceil((vals.length * (3 / 4)))]
    let iqr = q3 - q1;

    // Then find min and max vals
    let minValue = q1 - iqr * iqrLower
    let maxValue = q3 + iqr * iqrUpper

    // Then filter anything beyond or beneath these vals.
    let filteredVals = vals.filter(x=>{
        return (x <= maxValue) && (x >= minValue);
    })

    values = values.concat()

    // now officially remove or replace bad values (we do this here to maintain original order)
    if( remove )
        return values.filter(val=>filteredVals.includes(val))
    else{
        let prevVal = minValue
        return values.map(val=>{
            
            if( !filteredVals.includes(val) ){
                if( replaceWith === 'auto' )
                    val = prevVal
                else
                    val = replaceWith
            }
            
            return prevVal = val
        })
    }
}

}

module.exports = BMath