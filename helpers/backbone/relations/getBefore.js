
module.exports = function(model, loop=true){
	let indx = this.indexOf(model)
	
	if( indx < 0 ) return null;
	
	if( --indx == 0 && loop == true )
		indx = this.length - 1;
	
	return this.at(indx)
}