/*
    !DEPRECATED - use day-js instead
*/
import moment from 'moment'

// .calendar includes time, this will only show dates/days
moment.fn.calendarDate = function(referenceTime, formats={}){
    formats = Object.assign({
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[last] dddd',
        nextWeek : 'dddd',
        sameElse : 'l'
    }, formats)
    return this.calendar(referenceTime, formats)
}

export function invalidDateString(str=''){
    moment.updateLocale(moment.locale(), { invalidDate: str })
}