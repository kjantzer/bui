/*
	Plural - create singular or plural sentence based on number given (all numbers but 1 return plural sentence)

	New Plural (tagged template)
	plural`There {are|is} ${num} item[s]`
	
	Placeholders:
	{plural|singular} => evaluates based on the following number
	[plural|singular] => evaulates based on the preceding number
	[plural]

	Old Plural:
	var str = "Do you want to delete this? There {are|is} [num] book{s} attached."

	var num = 2 // or 0, 3, 4, ...
		"Do you want to delete this? There are 2 books attached."

	var num = 1
		"Do you want to delete this? There is 1 book attached."
*/

module.exports = function(strings, ...keys){
	
	if( typeof strings == 'string')
		return oldPlural(strings, keys[0])
	
	let str = ''
	strings.forEach((s,i)=>{
		
		let valAfter = keys[i]||''
		if( valAfter && typeof valAfter == 'number' ){
			let indx = valAfter == 1 ? 1 : 0;
			s = s.replace(/\{(.[^}]*)}/g, function(wholematch,firstmatch){
				var values = firstmatch.split('|');
				return values[indx] || '';
			});
		}
		
		let valBefore = keys[i-1]||''
		
		if( valBefore && typeof valBefore == 'number' ){
			let indx = valBefore == 1 ? 1 : 0;
			s = s.replace(/\[(.[^\]]*)\]/g, function(wholematch,firstmatch){
				var values = firstmatch.split('|');
				return values[indx] || '';
			});
			
		}
		
		str += valBefore + s
	})
	return str
}

function oldPlural(str, num){
	
	if( num instanceof Array )
		num = num.length
	if( num instanceof Object )
		num = Object.keys(num).length
	
	var indx = num == 1 ? 1 : 0;

	if( !_.isNumber(num) ){
		if( !_.numberFormat )
			return console.warn('underscore.string not installed')
		
		num = _.numberFormat(parseFloat(num), ((num % 1)>0?1:0) )
	}

	str = str.replace(/\[num\]/, num);

	str = str.replace(/{(.[^}]*)}/g, function(wholematch,firstmatch){

		var values = firstmatch.split('|');

		return values[indx] || '';
	});

	return str;
}