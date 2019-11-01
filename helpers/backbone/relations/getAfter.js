
module.exports = function(model, loop=true){
	let indx = this.indexOf(model)
	
	if( indx < 0 ) return null;
	
	if( ++indx >= this.length && loop == true )
		indx = 0;
	
	return this.at(indx)
}