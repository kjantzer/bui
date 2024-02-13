import {html} from 'lit'
import dayjs from 'dayjs'

export function dateQuarterPresets({startOf='startOf', dateOffset=null, numQuarters=16}={}){
    let date = new dayjs()
    
    if( dateOffset && Array.isArray( dateOffset) )
        date = date.add(...dateOffset)
    if( dateOffset && typeof dateOffset == 'function' )
        date = dateOffset(date) || date

    let i = 0
    let presets = []
    let quarters = (numQuarters + (5-date.quarter()))
    let today = dayjs()
    
    while(i++ < quarters ){

        let quarterDate = date[startOf]('quarter')
        let quarter = date.quarter()
        let sameYear = date.isSame(today, 'year')
        let sameMonth = today.quarter() == quarter && sameYear //date.isSame(today, 'month')

        if( i > 1 && quarter == 1 )
            presets.push(sameYear ? {divider:'Current Year'} : '-')
        

        presets.push({
            label: html`<b-text xbold ?gradient=${sameMonth}>Q${quarter}</b-text> 
                        <b-text ?gradient=${sameYear}>${date.year()}</b-text>`,
            value:d=>quarterDate,
        })

        date = quarterDate.add(3, 'month')
    }

    return presets
}

export function reportingPeriods(){
    
    let presets = []

    let date = new dayjs()

    date = date.startOf('year').add(-1, 'month')

    presets.push({divider: 'Annual'})
    ;[-1,0,1].forEach(k=>{
        let dateEnd = date.add(k*12, 'month').endOf('month')
        let dateStart = dateEnd.add(-11, 'month').startOf('month')

        presets.push({
            label: dateStart.format('YYYY'),
            start: d=>dateStart,
            end: d=>dateEnd
        })
    })

    presets.push({divider: 'Semi-Annual'})
    ;[-1,0,1,2].forEach(k=>{
        let dateEnd = date.add(k*6, 'month').endOf('month')
        let dateStart = dateEnd.add(-5, 'month').startOf('month')

        presets.push({
            label: dateStart.format('MMM')+'-'+dateEnd.format('MMM YYYY'),
            start: d=>dateStart,
            end: d=>dateEnd
        })
    })

    presets.push({divider: 'Quarterly'})
    ;[-2,-1,0,1,2].forEach(k=>{
        let dateEnd = date.add(k*3, 'month').endOf('month')
        let dateStart = dateEnd.add(-2, 'month').startOf('month')

        presets.push({
            label: dateStart.format('MMM')+'-'+dateEnd.format('MMM YYYY'),
            start: d=>dateStart,
            end: d=>dateEnd
        })
    })

    return presets
}

window.reportingPeriods = reportingPeriods // TEMP