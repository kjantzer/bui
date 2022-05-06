/*
    Adds Day.js plugins that matches Blackstone's use of moment.js

    - Also changes 'Invalid Date' in .format() to empty string
    - adds dayjs.months()
    - adds dayjs.weekdays()
    - supports hash of changes in `.set()`
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

dayjs.prototype.weeksInMonth = function(){
    return Math.ceil((this.daysInMonth()+1+this.day()) / 7)
}

const DayJsFormat = dayjs.prototype.format
dayjs.prototype.format = function(...args){
    // https://github.com/iamkun/dayjs/blob/dev/src/index.js#L252
    if (!this.isValid()) return ''
    return DayJsFormat.call(this, ...args)
}

dayjs.prototype.sortValue = function(invalidAddition=9, {invalidVal=99999999999999, desc=false}={}){
    if (!this.isValid()) return invalidAddition+invalidVal
    let val = this.unix()

    if( desc )
        val = Math.round((new Date('2099-01-01').getTime()/1000)) - val

    return val
}

// let `.set` handle hash of changes
const DayJsSet = dayjs.prototype.set
dayjs.prototype.set = function(...args){
    
    if( args.length == 1 && typeof args[0] == 'object'  ){
        let date = this
        for( let unit in args[0] ){
            date = DayJsSet.call(date, unit, args[0][unit])
        }
        return date
    }
    
    return DayJsSet.call(this, ...args)
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

dayjs.monthsShort = function(){ return dayjs.months('MMM') }

const WEEKDAY_NAMES = {}
dayjs.weekdays = function(format="dddd"){

    // cached
    if( WEEKDAY_NAMES[format] )
        return WEEKDAY_NAMES[format]

    let d = dayjs()
    let days = []
    let i = 0
    
    while(i<7){
        days.push(d.set('day', i++).format(format))
    }
    WEEKDAY_NAMES[format] = days

    return days
}

dayjs.weekdaysShort = function(){ return dayjs.weekdays('ddd') }
dayjs.weekdaysMin = function(){ return dayjs.weekdays('dd') }

module.exports = dayjs