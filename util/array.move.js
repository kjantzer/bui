
module.exports = function(fromIndex, toIndex) {
	this.splice(toIndex, 0, this.splice(fromIndex, 1)[0] );
	return this;
}