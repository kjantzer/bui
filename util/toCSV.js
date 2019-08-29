
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

    // let downloadName = 'download'
    // let blob = new Blob([csvContent], {type:'text/csv'});
    // let csvUrl = window.URL.createObjectURL(blob);
    
    // let ext = opts.delimiter == ',' ? 'csv' : 'txt'
    // let link = document.createElement("a");
    // link.setAttribute("href", csvUrl);
    // link.setAttribute("download", downloadName+"."+ext);
    
    // link.click();
	
	return csvContent
}