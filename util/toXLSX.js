const XLSX = require('xlsx');
const {titleize} = require('./string')

module.exports = (data, opts)=>{

  opts = Object.assign({
    title: '',
    description: '',
    //header: true,
    titleize: false,
    workbook: null, // TODO: if workbook object provided, will add the sheet to an existing workbook
  }, opts)

  if( !data || data.length == 0 )
    // create a workbook with a single sheet containing a message
    return XLSX.utils.book_new({SheetNames:['Sheet1'], Sheets:{'Sheet1':XLSX.utils.aoa_to_sheet([['No data to export']])}});

  // see if the array of data contains Backbone Models or custom classes that implement `toXLSX` or `toJSON`
  data = data.flatMap(d=>{
    if( d && d.toXLSX )
      return d.toXLSX(opts)

    if( d && d.toJSON )
      return d.toJSON()
    
    return d
  })



  // Package Data

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  if (opts.titleize) {
    const header = Object.keys(data[0]);
    const headerTitleized = header.map(s=>titleize(s));
    XLSX.utils.sheet_add_aoa(worksheet, [headerTitleized], {origin: 'A1'});
  }

  if (opts.workbook)
    return XLSX.utils.book_append_sheet(opts.workbook, worksheet, opts.title || 'Sheet1'); //TODO: add a check for existing sheet names

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, opts.title || 'Sheet1'); 

  return workbook;
}
