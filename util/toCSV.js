/*
	# toCSV
	
	Convert an array of data to a CSV string (or tab delimited)

	```js
	let data = [{title: 'title 1', info: 'info'}, {title: 'title 2', info: 'info'}]
	let csvData = toCSV(data, {title: 'My Data'})
	```

	> NOTE: The array of data can also contain backbone models or custom objects that implement `toCSV` or `toJSON`

	##### Options
	- `delimiter: ','`
	- `newline: "\n"`
	- `title: ''` - title at the top of the csv data
	- `description: ''` - similar to title ^ 
	- `header: true` - show header row?

	##### Downloading
	You can use `util/download` to download your csv data to a file

	```js
	import {downloadCSV} from 'bui/util/download'
	downloadCSV(csvData)
	downloadCSV(csvData, 'custom-file-name.csv')
	```
*/
const {titleize} = require('./string')

module.exports = (rawData, opts)=>{

	opts = Object.assign({
		delimiter: ',',
		newline: "\n",
		title: '',
		description: '',
		header: true,
		titleize: false,
		preset: undefined
	}, opts)


	if( !rawData || rawData.length == 0 )
		return console.log('No data to export');

	// see if the array of data contains Backbone Models or custom classes that implement `toCSV` or `toJSON`
	rawData = rawData.flatMap(d=>{
		if( d && d.toCSV )
			return d.toCSV(opts)

		if( d && d.toJSON )
			return d.toJSON()
		
		return d
	})
	
	var header = Object.keys(rawData[0])
	var rows = rawData.map(d=>Object.values(d))

	if( opts.titleize )
		header = header.map(s=>titleize(s))
				
	var data = opts.header === false ? rows : [header].concat(rows);

	if( opts.title || opts.description )
		data.unshift([]);

	if( opts.description )
		Array.isArray(opts.description) 
		? data.unshift(...opts.description.map(d=>[d]))
		: data.unshift([opts.description]) 
		

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

			if( Array.isArray(val) ){
				val = '[array]'
			}
	
			return val;
		})
	})

	if( opts.footer )
		data.push([opts.footer]);
	
	let csvContent = "\ufeff"; // utf-8 bom
	data.forEach(function(infoArray, index){
	   let dataString = infoArray.join(opts.delimiter);
	   csvContent += index < data.length ? dataString+ opts.newline : dataString;
	});

	
	return csvContent
}