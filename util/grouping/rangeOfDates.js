import dayjs from 'dayjs'

export default function rangeOfDates({dates, unit, startDate, endDate, dateKey='date'}={}){

    let format = {
        'year': 'YYYY',
        'month': 'YYYY-MM',
        'week': 'YYYY-MM-DD',
        'day': 'YYYY-MM-DD',
        'hour': 'YYYY-MM-DD HH:00:00'
    }[unit]||'YYYY-MM-DD'

    if( !dates )
        dates = this.map(m=>dayjs(m.get(dateKey)).format(format))

    dates.sort()

    dates = dates.map(date=>dayjs(date).startOf(unit).format(format))
    dates = [...new Set(dates)]
    startDate ? startDate = dayjs(startDate).startOf(unit).format(format) : startDate = dates[0]
    endDate ? endDate = dayjs(endDate).startOf(unit).format(format) : endDate = dates[dates.length-1]

    if (!startDate) startDate = dates[0] //dayjs().format(format)

    if (!endDate) endDate = dates[dates.length-1] //dayjs().format(format

    if (startDate > endDate) throw new Error('Start date must be before end date')

    let date = dayjs(startDate)
    let endDateDate = dayjs(endDate)
    let range = [date.format(format)]

    // create range of dates (years or months)
    while( date.format(format) != endDateDate.format(format) ){
        date = date.add(1, unit)
        range.push(date.format(format))
    }

    return range
}