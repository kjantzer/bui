module.exports = (str, {stripQuotes=true, lower=true, removeSpaces=false, removePeriods=false}={})=>{

	if( !str ) return str;

	if( stripQuotes )
		str = str.replace(/^("|“|”|'|‘|’)|("|“|”|'|‘|’)$/g, '')

	if( removePeriods )
		str = str.replace(/\./g, '')

	if( removeSpaces )
		str = str.replace(/\s/g, '')
	
	str = str.trim().replace(/(^The |^A |^An )(.*)/g, (match, p1, p2)=>{
		return p2 + (p1 ? ', '+p1.trim() : '')
	})
	
	if( lower )
		str = str.toLowerCase()

	return str
}