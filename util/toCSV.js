/*
	# toCSV
	
	Convert an array of data to a CSV string (or tab delimited)

	```js
	let data = [
		{title: 'title 1', info: 'info', price: 10.00}, 
		{title: 'title 2', info: 'info', price: 20.00}
	]
	let csvData = toCSV(data, {
		title: 'My Data', 
		footer: {title: 'Total', price: 'sum'}
	})
	```

	> NOTE: The array of data can also contain backbone models or custom objects that implement `toCSV` or `toJSON`

	##### Options
	- `delimiter: ','`
	- `newline: "\n"`
	- `title: ''` - title at the top of the csv data
	- `description: ''` - similar to title ^ 
	- `header: true` - show header row?
	- `footer: false` - give an object of keys that match (or partially match) the data
		- set value to `sum` to sum the values of the key
		- set value to `count` to count the number of rows

	##### Footer


	##### Downloading
	You can use `util/download` to download your csv data to a file

	```js
	import {downloadCSV} from 'bui/util/download'
	downloadCSV(csvData)
	downloadCSV(csvData, 'custom-file-name.csv')
	```
*/
const {titleize} = require('./string')
const {round} = require('./math')
require('./sum')

module.exports = (rawData, opts)=>{

	opts = Object.assign({
		delimiter: ',',
		newline: "\n",
		title: '',
		description: '',
		header: true,
		titleize: false,
		preset: undefined,
		headerSample: 10, // sample first 10 rows to determine header
		footer: false
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
	
	// var header = Object.keys(rawData[0])
	var header = Array.from(new Set(
		// longer (more complete) set of headers first
		rawData.slice(0,opts.headerSample).map(d=>Object.keys(d)).sort((a,b)=>a.length>b.length?-1:1).flatMap(d=>d)
	))

	// make sure all rows have same columns in same order
	var rows = rawData.map(d=>{
		return header.map(h=>d[h])
	})

	// add a footer with sum
	if( opts.footer ){

		let footer = header.map(h=>{

			let v = opts.footer[h] || ''

			if( v == 'sum' )
				v = round(rawData.sum(d=>d[h]), 2)
			if( v == 'count' || v == 'num' )
				v = rawData.length+ ' rows'

			return v
		})

		rows.push(footer)
	}

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

	// if( opts.footer )
	// 	data.push([opts.footer]);
	
	let csvContent = "\ufeff"; // utf-8 bom
	data.forEach(function(infoArray, index){
	   let dataString = infoArray.join(opts.delimiter);
	   csvContent += index < data.length ? dataString+ opts.newline : dataString;
	});

	
	return csvContent
}