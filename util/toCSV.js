
export default (rawData, opts)=>{

	opts = Object.assign({
		delimiter: ',',
		newline: "\n",
		title: '',
		description: '',
		header: true,
	}, opts)


	if( !rawData || rawData.length == 0 )
		return console.log('No data to export');

	// see if the array of data contains Backbone Models or custom classes that implement `toCSV` or `toJSON`
	rawData = rawData.map(d=>{
		if( d && d.toCSV )
			return d.toCSV()

		if( d && d.toJSON )
			return d.toJSON()
		
		return d
	})
	
	var header = Object.keys(rawData[0])
	var rows = rawData.map(d=>Object.values(d))
				
	var data = opts.header === false ? rows : [header].concat(rows);

	if( opts.title || opts.description )
		data.unshift([]);

	if( opts.description )
		data.unshift([opts.description]);

	if( opts.title )
		data.unshift([opts.title]);
	
	// clean data
	data = data.map(row=>{
		return row.map(val=>{
	
			// encapsulate in "" if the value contains a delimiter or new line
            // TODO: this needs to be dynamic to match the opts
			if( typeof val === 'string' && val.match(/,|\n|"/) ){
				val = '"'+val.replace(/"/gi,'""')+'"';
			}
	
			return val;
		})
	})
	
	let csvContent = "\ufeff"; // utf-8 bom
	data.forEach(function(infoArray, index){
	   let dataString = infoArray.join(opts.delimiter);
	   csvContent += index < data.length ? dataString+ opts.newline : dataString;
	});

	
	return csvContent
}