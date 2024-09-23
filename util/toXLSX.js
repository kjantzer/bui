const ExcelJS = require('exceljs');
const {titleize} = require('./string')

module.exports = function toXLSX(data, opts){

	opts = Object.assign({
		title: '',
		letterHead: [],
		headerImage: {}, // {filename, extension}
		headerImageSize: {width: 500, height: 150},
		freeze: true,
		titleize: true,
		workbook: null, // TODO: if workbook object provided, will add the sheet to an existing workbook
		columnFormats: {}, // {columnKey: {numberFormat, alignment, font, fill, border}}
		totalColumns: [], // ['A', 'B', 'C']
		//narrowMargins: false, FIXME: causes column widths to be messed up
		defaultCellWidth: 10
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

	// Parse the data to ensure numbers are integers and not strings
	data = data.map(row=>{
		Object.keys(row).forEach(key=>{
			if( !isNaN(row[key]) && row[key] !== '' )
				row[key] = Number(row[key])
		})
		return row
	})

	let workbook = opts.workbook || new ExcelJS.Workbook()

	// create new worksheet in landscape mode
	let worksheet = workbook.addWorksheet(opts.title || 'Sheet1')

	//TODO: Make opts
	worksheet.pageSetup = {orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 100}

	// FIXME: causes column widths to be messed up
	// if (opts.narrowMargins)
	// 	worksheet.pageSetup.margins = {
	// 		top: 0.75, bottom: 0.75, left: 0.25, right: 0.25
	// 	}

	// Create Header Row and set column width based on the longest value plus a buffer
	// 'total' rows which are generated later
	worksheet.columns = Object.keys(data[0]).map((key)=>{
		let columnWidth = Math.max(key.length, ...data.map(row=>row[key]?.toString().length || 10)) + 4;

		// Limit the column width to 45 in case of extremely long strings
		// TODO: make this an maxCellWidth option
		columnWidth > 45? columnWidth = 45 : columnWidth;

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
			let columnKey = columnHeaders.indexOf(titleize(key))
			columnNumberFormat(worksheet, columnKey, opts.columnFormats[key]);
		});
	}

	// If a letter head image exists, add it to cell C1
	if( opts.headerImage.filename && opts.headerImage.extension ) {
		worksheet.insertRows(1,[[],[],[],[],[],[],[],[]]);
		let img = workbook.addImage({
			filename: opts.headerImage.filename,
			extension: opts.headerImage.extension,
		});

		worksheet.addImage(img, {
			tl: {col: 0, row: 0},
			ext: opts.headerImageSize,
		});
	}

	// Add the letterhead to the top of the sheet
	if(opts.letterHead.length > 0) {
		
		let letterHeadStart = opts.headerImage ? 9 : 1;

		worksheet.insertRows(letterHeadStart,[[],[],[]]);
		worksheet.insertRows(letterHeadStart, opts.letterHead)
		// reset the number format of the letter head rows

		for(let i = 0; i < opts.letterHead.length; i++) {
			worksheet.getRow(letterHeadStart + i).numFmt = '0';
		}	
	}

	// freeze the header row + the letter head rows if provided
	if( opts.freeze ) {
		let freeze = 1 + (opts.letterHead.length > 0 ? (opts.letterHead.length+3): 0) + (opts.headerImage.filename ? 8 : 0)
		worksheet.views = [{state: 'frozen', xSplit: 0, ySplit: freeze, topLeftCell: 'A' + (freeze + 1)}]
	}

		// Create a Total Row if totalColumns are provided
	if( opts.totalColumns.length ) {
		let totalRow = worksheet.addRow([])
		totalRow.getCell(1).value = 'TOTAL:'
		totalRow.font = {bold: true}
		totalRow.fill = {type: 'pattern', pattern:'solid', fgColor:{argb:'FFDDDDDD'}}

		opts.totalColumns.forEach(col=>{
			let columnIndex = worksheet.getColumn(col).number
			let cell = totalRow.getCell(columnIndex)
			let total = data.reduce((acc, row)=>acc + row[col], 0)
			cell.value = total
		})
	}

	return workbook;
}

columnNumberFormat = (worksheet, columnKey, format) => {
	
	if (!format) throw new Error('format is required')

	if( format.numberFormat ) {
		let numFormat = format.numberFormat

		switch(numFormat){
			case 'date':
				numFormat = 'mm-dd-yyyy'
				break;
			case 'currency':
				numFormat = '$#,##0.00'
				break;
			case 'percent':
				numFormat = '0.00%'
				break;
			case 'accounting':
				numFormat = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)'
				break;
			default:
				numFormat = numFormat
				break;
		}

	return worksheet.getColumn(columnKey).numFmt = numFormat
	}

	if( format.alignment ) {
		let alignment = format.alignment
		switch (alignment) {
			case 'center':
				alignment = {vertical: 'bottom', horizontal: 'center'}
				break;
			case 'right':
				alignment = {vertical: 'bottom', horizontal: 'right'}
				break;
			case 'left':
				alignment = {vertical: 'bottom', horizontal: 'left'}
				break;
		}

		return worksheet.getColumn(columnKey).alignment = alignment
	}

	
}
	