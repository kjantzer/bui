const XLSX = require('xlsx');
const {titleize} = require('./string')

module.exports = function toXLSX(data, opts){

	opts = Object.assign({
		title: '',
		//description: '',
		freeze: true,
		titleize: false,
		workbook: null, // TODO: if workbook object provided, will add the sheet to an existing workbook
	}, opts)

	// TEMP: create a workbook with a single sheet containing a message to prevent errors when trying to apend a sheet to another workbook
	if( !data?.length )
		return XLSX.utils.book_new({SheetNames:['Sheet1'], Sheets:{'Sheet1':XLSX.utils.aoa_to_sheet([['No data to export']])}});

  	// see if the array of data contains Backbone Models or custom classes that implement `toXLSX` or `toJSON`
	data = data.flatMap(d=>{
		if( d?.toXLSX )
			return d.toXLSX(opts)
		
		if( d?.toCSV )
			return d.toCSV(opts)

		if( d?.toJSON )
			return d.toJSON()

		return d
	})

	let worksheet = XLSX.utils.json_to_sheet(data);

	// fix column width by finding the max width of each column with a minimum of the column header width
	let colWidths = data.reduce((acc, row)=>{

		Object.keys(row).forEach((key, i)=>{
			let val = row[key];
			let len = val ? val.toString().length : 0;
			acc[i] = Math.max(acc[i] || 0, len);
		});

		return acc;

	}, Object.keys(data[0]).map(key=>key.length + 2));

	worksheet['!cols'] = colWidths.map(width=>({wch: width}));

	if( opts.titleize ) {
		let header = data[0];
		let titleizedHeader = Object.keys(header).map(s=>titleize(s));
		XLSX.utils.sheet_add_aoa(worksheet, [titleizedHeader], {origin: "A1"});
	}

	if (opts.workbook)
		return XLSX.utils.book_append_sheet(opts.workbook, worksheet, opts.title || 'Sheet1'); //TODO: add a check for existing sheet names


	let workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, opts.title || 'Sheet1'); 

	return workbook;
}
