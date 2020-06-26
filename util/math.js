// https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript

module.exports = {

round(num, decimals=2){
    if( typeof num == 'string' )
		num = parseFloat(num)
	
	let divisor = Math.pow(10, decimals)
	
	return Math.round(num * divisor) / divisor 
},

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
}

}