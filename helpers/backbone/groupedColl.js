/*
    Grouped Collection

    Similar to bui/util/groupedData
*/
import {Collection, Model} from 'backbone'
import CollMap from '../../util/collmap'
import {round} from '../../util/math'
import dayjs from 'dayjs'
import {capitalize} from '../../util/string'

export class GroupedCollModel extends Model {
    
    // override if needed
    // should return dayjs
    get ts(){ return this.get('timestamp_created') }

    get tsWeek(){ return this.ts.startOf('week').format('YYYY-MM-DD') }
    get tsHour(){ return this.ts.startOf('hour').format('YYYY-MM-DD HH:00:00') }
    get tsDay(){ return this.ts.format('YYYY-MM-DD') }
    get tsMonth(){ return this.ts.format('YYYY-MM') }
}

class GroupedColl extends Collection {

    get label(){ return this.name }

    dateRange({unit, startDate, endDate, dateKey}){ return rangeOfDates.call(this, {unit, startDate, endDate, dateKey})}

    sum(key, {decimals=0}={}){
        return Math.round(this.reduce((num, m)=>{
            return num + (m.get(key)||0)
        }, decimals))
    }

    max(key){ return this.map(m=>m.get(key)).sort().pop() }
    min(key){ return this.map(m=>m.get(key)).sort().shift() }

    filterBy(fn){ return new this.constructor(this.filter(fn)) }

    values(key){ return this.map(m=>m.get(key)) }

    byHour(){ return this.groupBy('tsHour', this.dateRange({unit: 'hour'})) }
    byDay(){ return this.groupBy('tsDay', this.dateRange({unit: 'day'})) }
    byWeek(){ return this.groupBy('tsWeek', this.dateRange({unit: 'week'})) }
    byMonth(){ return this.groupBy('tsMonth', this.dateRange({unit: 'month'})) }

    byTimeUnit(unit){
        let fnName = 'by'+capitalize(unit)
        return this[fnName]?.()
    }

    groupBy(fn, sequentialGroups=[]){

        // get group of models
        let groupedModels = super.groupBy(groupByGetter(fn))
        let groups = new GroupedColls()

        // convert group of models to groups of Collections
        for( let key in groupedModels ){
            let groupColl = new this.constructor(groupedModels[key])
            groupColl.path = String(fn)
            groupColl.name = key
            groups.set(key, groupColl)
        }

        // if given a specific sequential range, use it to fill the groups
        // we do this so we can have a sequential list of data even if a data point is missing
        if( sequentialGroups.length > 0 ){
            let _sequentialGroups = new GroupedColls()
            sequentialGroups.forEach(key=>{
                let groupColl = groups.get(key)
                if( !groupColl ){
                    groupColl = new this.constructor()
                    groupColl.path = String(fn)
                    groupColl.name = key
                }
                _sequentialGroups.set(key, groupColl)
            })
            groups = _sequentialGroups
        }

        groups.forEach(group=>{
            group.parent = this
            group.level = (this.level||0) + 1
        })

        return groups
    }

    get pathValue(){
        let parent = this
        let labels = []
        while(parent&&parent.label){
            labels.unshift(parent.label)
            parent = parent.parent
        }
        return labels
    }

    get pathName(){
        let parent = this
        let path = []
        while(parent&&parent.path){
            path.unshift(parent.path)
            parent = parent.parent
        }
        return path
    }
}

export default GroupedColl

// future proof
class GroupedColls extends CollMap {}


function groupByGetter(fn){
    // create default groupBy function if a string is given
    if( typeof fn == 'string'){
        let k = fn
        fn = m=>{
            // see if the model has a getter matching the key
            if( Object.getOwnPropertyDescriptor(m.constructor.prototype, k) )
                return m[k]
            else if( m[k] !== undefined )
                return m[k]
            // else use default `get()`
            else
                return m.get(k)
        }
    }
    return fn
}

// NOTE: maybe move to bui/util?
export function rangeOfDates({unit, startDate, endDate, dateKey='date'}={}){

    let format = {
        'year': 'YYYY',
        'month': 'YYYY-MM',
        'week': 'YYYY-MM-DD',
        'day': 'YYYY-MM-DD',
        'hour': 'YYYY-MM-DD HH:00:00'
    }[unit]||'YYYY-MM-DD'

    let dates = this.map(m=>dayjs(m.get(dateKey)).format(format))

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