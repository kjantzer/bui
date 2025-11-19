/*
    # numToAlpha

    Converts a number to a letter like a spreadsheet column label.

    Example: 0 -> A, 25 -> Z, 26 -> AA, 27 -> AB, ..., 701 -> ZZ, 702 -> AAA, etc.

    ```js
    numToAlpha(0) // 'A'
    numToAlpha(25) // 'Z'
    numToAlpha(26) // 'AA'
    numToAlpha(27) // 'AB'
    numToAlpha(701) // 'ZZ'
    numToAlpha(702) // 'AAA'
    ```
*/
module.exports = function(n){
    let letter = ''

    while (n >= 0) {
        letter = String.fromCharCode(65 + (n % 26)) + letter
        n = Math.floor(n / 26) - 1
    }
    
    return letter
}