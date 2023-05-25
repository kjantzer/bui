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