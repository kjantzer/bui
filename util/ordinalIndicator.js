/*
    # Ordinal Indicator

    Add `st`, `nd`, `rd` and `th` to numbers

    ```js
    ordinalIndicator(100) // 100th
    ```
*/
module.exports = function ordinalIndicator(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}