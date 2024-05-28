const ExcelJS = require('exceljs');
const {titleize} = require('./string')

module.exports = function toXLSX(data, opts){

	opts = Object.assign({
		title: '',
		letterHead: [],
		imagePath: '',
		freeze: true,
		titleize: true,
		workbook: null, // TODO: if workbook object provided, will add the sheet to an existing workbook
		columnFormats: {}, // {columnKEy: format}
	}, opts)

	// TEMP: create a workbook with a single sheet containing a message to prevent errors when trying to apend a sheet to another workbook
	if( !data?.length )
		return new ExcelJS.Workbook().addWorksheet('Sheet1').addRow(['No data to display'])

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

	// I think this should be at the top?
	// shouldn't this be used when data.length is empty?
	let workbook = opts.workbook || new ExcelJS.Workbook();

	let worksheet = workbook.addWorksheet(opts.title || 'Sheet1');

	// Parse the data to ensure numbers are integers and not strings
	data = data.map(row=>{
		Object.keys(row).forEach(key=>{
			if( typeof row[key] === 'string' && !isNaN(row[key]) )
				row[key] = parseFloat(row[key])
		})
		return row;
	})

	// Create Header Row and set column width based on the longest value in the column + 2
	// TODO: 10 should probably be a `opts.defaultCellWidth`?
	worksheet.columns = Object.keys(data[0]).map((key)=>{
		let columnWidth = Math.max(key.length, ...data.map(row=>row[key]?.toString().length || 10)) + 2;
		return {header: titleize(key), key: key, width: columnWidth};
	});

	// Style the Header Row
	let headerRow = worksheet.getRow(1);
	headerRow.font = {bold: true};
	headerRow.fill = {type: 'pattern', pattern:'solid', fgColor:{argb:'FFDDDDDD'}};

	// Add the data to the worksheet
	worksheet.addRows(data);

	// Apply column formats get the column number from the column key and apply the format
	if (opts.columnFormats) {

		Object.keys(opts.columnFormats).forEach(key => {
			let columnHeaders = worksheet.getRow(1).values;
			let columnKey = columnHeaders.indexOf(titleize(key))	;
			columnNumberFormat(worksheet, columnKey, opts.columnFormats[key]);
		});
	}

	// If a letter head image exists, add it to cell C1
	// FIXME: PUBLIC_PATH should not be used in BUI; this util function should only accept full image paths
	// I would rename `imagePath` to something like `headerImg` and require {filename, extension} as arg
	if( opts.imagePath ) {
		worksheet.insertRows(1,[[],[],[],[],[],[],[],[]]);
		let img = workbook.addImage({
			filename: PUBLIC_PATH + opts.imagePath,
			extension: 'png',
		});

		worksheet.addImage(img, {
			tl: {col: 1, row: 0},
			// FIXME: would also make this part of the `headerImg` arg as I believe this is largely
			// dependent on the image given
			ext: {width: 500, height: 150},
		});
	}

	// If a letter head exists, add it and give a buffer of 3 empty rows.
	if(opts.letterHead.length > 0) {
		
		let letterHeadStart = opts.imagePath? 9 : 1;

		worksheet.insertRows(letterHeadStart,[[],[],[]]);
		worksheet.insertRows(letterHeadStart, opts.letterHead)
		// worksheet.getRows(letterHeadStart, opts.letterHead.length).numFmt = '0'
	}

	// freeze the header row + the letter head rows if provided
	if( opts.freeze ) {
		let freeze = 1 + (opts.letterHead.length > 0 ? (opts.letterHead.length+3): 0) + (opts.imagePath ? 8 : 0);
		worksheet.views = [{state: 'frozen', xSplit: 0, ySplit: freeze, topLeftCell: 'A' + (freeze + 1)}];
	}

	return workbook;
}

columnNumberFormat = (worksheet, columnKey, format) => {
	switch(format){
		case 'date':
			format = 'mm-dd-yyyy';
			break;
		case 'currency':
			format = '$#,##0.00';
			break;
		case 'percent':
			format = '0.00%';
			break;
		case 'accounting':
			format = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)';
			break;
		default:
			format = format || '0';
			break;
	}

	return worksheet.getColumn(columnKey).numFmt = format;
}
	