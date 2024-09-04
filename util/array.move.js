/*
    # Array.Move

	Move an value from a known index to another. Useful for reordering features

    ```js
    import move from 'bui/util/array.move'
    move.call(someArray, fromIndex, toIndex)
    ```
*/
module.exports = function(fromIndex, toIndex) {
	this.splice(toIndex, 0, this.splice(fromIndex, 1)[0] );
	return this;
}