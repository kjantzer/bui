/*
    # rangeOfDates

    Create a range of dates. Can be given a partial list of `dates` and this will fill the missing dates for a complete range

    ```js
    rangeOfDates({endDate: 30, unit: 'month'}) // 30 days starting today
    rangeOfDates({endDate: 12, unit: 'month'}) // 12 months from today
    rangeOfDates({startDate: -6, endDate: 6, unit: 'month'}) // 6 months in past to 6 months in future
    ```

    #### Opts
    - `dates` 
    - `unit` ='day'
    - `startDate` 
    - `endDate` 
    - `dateKey` ='date'
    - `returnDate` =false
*/
const dayjs = require('dayjs')

module.exports = function rangeOfDates({
    dates, 
    unit='day', 
    startDate, 
    endDate, 
    dateKey='date', 
    returnDate=false
}={}){

    let format = {
        'year': 'YYYY',
        'month': 'YYYY-MM',
        'week': 'YYYY-MM-DD',
        'day': 'YYYY-MM-DD',
        'hour': 'YYYY-MM-DD HH:00:00'
    }[unit]||'YYYY-MM-DD'

    if( !dates )
        dates = (this !== globalThis && this?.map(m=>dayjs(m.get(dateKey)).format(format))) || []

    dates.sort()
    dates = dates.filter(d=>d) // remove empty values

    // if start/end dates are numbers, assume number of `units` from current date (or other date given)
    if( startDate && typeof startDate == 'number' )
        startDate = dayjs(typeof endDate == 'number' ? undefined : endDate).add(startDate, unit)
    
    if( endDate && typeof endDate == 'number' )
        endDate = dayjs(typeof startDate == 'number' ? undefined : startDate).add(endDate, unit)

    dates = dates.map(date=>dayjs(date).startOf(unit).format(format))
    dates = [...new Set(dates)]
    startDate ? startDate = dayjs(startDate).startOf(unit).format(format) : startDate = dates[0]
    endDate ? endDate = dayjs(endDate).startOf(unit).format(format) : endDate = dates[dates.length-1]

    if (!startDate) startDate = dates[0] //dayjs().format(format)

    if (!endDate) endDate = dates[dates.length-1] //dayjs().format(format

    if (startDate > endDate) throw new Error('Start date must be before end date')

    let date = dayjs(startDate)
    let endDateDate = dayjs(endDate)
    let range = [returnDate ? date : date.format(format)]

    // create range of dates (years or months)
    while( date.format(format) != endDateDate.format(format) ){
        date = date.add(1, unit)
        range.push( returnDate ? date : date.format(format))
    }

    return range
}