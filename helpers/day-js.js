/*
    Adds Day.js plugins that matches Blackstone's use of moment.js

    - Also changes 'Invalid Date' in .format() to empty string
    - adds dayjs.months()
*/
var dayjs = require('dayjs')

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

dayjs.prototype.calendarDate = function(formats={}){
    formats = Object.assign({
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[last] dddd',
        nextWeek : 'dddd',
        sameElse : 'l'
    }, formats)
    return this.calendar(null, formats)
}

const DayJsFormat = dayjs.prototype.format

dayjs.prototype.format = function(...args){
    // https://github.com/iamkun/dayjs/blob/dev/src/index.js#L252
    if (!this.isValid()) return ''
    return DayJsFormat.call(this, ...args)
}

const MONTH_NAMES = {}
dayjs.months = function(format="MMMM"){

    // cached
    if( MONTH_NAMES[format] )
        return MONTH_NAMES[format]

    let d = dayjs()
    let months = []
    let i = 0
    
    while(i<12){
        months.push(d.set('month', i++).format(format))
    }
    MONTH_NAMES[format] = months

    return months
}

module.exports = dayjs