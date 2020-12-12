import Emitter from 'component-emitter'
import dayjs from 'dayjs'

export default function dateRange(start, end, {
    min=false,
    max=false,
    range=true,
    active='start'
}={}){
    
    start = dayjs(start).startOf('day')
    end = dayjs(end).startOf('day')

    // https://javascript.info/proxy
    return new Proxy(Emitter({start, end, min, max, active}),{

        get(target, prop) {

            if( prop == 'label' )
                return label(target.start, target.end)

            if( prop == 'toString' )
                return function(){
                    return `${this.start.format('l')} – ${this.end.format('l')}`
                }.bind(target)

            return target[prop];
        },

        set(obj, prop, value){

            if( !['start', 'end', 'min', 'max', 'active', 'range'].includes(prop) ){
                obj[prop] = value
                return true
            }

            if( prop == 'active' ){
                if( !['start', 'end'].includes(value) )
                    throw new Error(`Invalid active: ${value}`)

                obj[prop] = value
                obj.emit('change', prop, value)
                return true
            }

            // allow setting min/max to "false"
            if( ['min', 'max'].includes(prop) ){
                if( (prop||false) === false ){
                    obj[prop] = false
                    return true
                }
            }

            if( prop == 'range' ){

                if( !Array.isArray(value) )
                    throw new Error('Invalid range:', value)
                
                let start = validateDate(obj, value[0])
                let end = validateDate(obj, value[1])

                if( start.isAfter(end, 'day') ){
                    obj.start = end
                    obj.end = start
                }else{
                    obj.start = start
                    obj.end = end
                }

                obj.emit('change', 'range', [obj.start, obj.end])

                return true
            }

            let propChanged = prop

            value = validateDate(obj, value)

            // range disabled, set both start/end to same value
            if( !range ){

                if( prop == 'end' )
                    prop = 'start'
                
                obj.end = value

            // make sure start/end values stay in order
            }else{
                
                if( prop == 'start' && value.isAfter(obj.end, 'day') ){
                    let _value = obj.end
                    obj.end = value
                    propChanged = 'end'
                    value = _value
                }
                if( prop == 'end' && value.isBefore(obj.start, 'day') ){
                    let _value = obj.start
                    obj.start = value
                    propChanged = 'start'
                    value = _value
                }
            }

            obj[prop] = value;

            obj.active = (propChanged == 'start' ? 'end' : 'start')
            obj.emit('change', 'active', obj.active)
            
            obj.emit('change', propChanged, value)

            return true;
        },

        // https://javascript.info/proxy#in-range-with-has-trap
        //example: `let inRange = '1/1/2020' in dateRange`
        has(target, prop){
            prop = dayjs(prop)

            if( !prop instanceof dayjs || !prop.isValid() )
                return false
            
            prop = prop.unix()

            return prop >= target.start.unix() && prop <= target.end.unix()
        }
    })
}

function validateDate(obj, value){
    
    value = dayjs(value)
            
    if( !value instanceof dayjs || !value.isValid() )
        throw new Error(`Invalid date`)

    // make sure the value is within min/max
    if( obj.min && value.isBefore(obj.min, 'day') )
        value = obj.min.clone()
    if( obj.max && value.isAfter(obj.max, 'day') )
        value = obj.max.clone()

    return value
}

export function label(start, end){

    let m = dayjs().startOf('day')
    let m1 = dayjs(start)
    let m2 = dayjs(end)
    let thisYear = m1.year() == m.year() && m2.year() == m2.year()
    let sameYear = m1.year() == m2.year()

    // single day selected
    if( m1.isSame(m2, 'day') ){

        if( m.isSame(m1, 'day') )
            return 'Today'

        let diffDays = m.diff(m1, 'days')

        if( diffDays == 1 )
            return 'Yesterday'

        if( diffDays > 1 && diffDays <= 14 )
            return diffDays+' days ago'

        // leave off the year since it's this year
        if( thisYear )
            return m1.format('MMM D')

        return m1.format('M/D/YY')
    }

    // month range (beginning of one month to end of another month)
    if( m1.date() == 1 && m2.date() == m2.clone().endOf('month').date() ){

        let month1 = m1.format('MMM')
        let month2 = m2.format('MMM')
        
        if( month1 == month2 && sameYear ){

            if( month1 == m.format('MMM') && thisYear )
                return 'This Month'
            
            if( thisYear )
                return month1

            return month1+' ‘'+m1.format('YY')
        }

        if( thisYear && sameYear && m1.month() == 0 && m2.month() == 11)
            return 'This Year'
        else if( thisYear && sameYear )
            return month1+' - '+month2
        else if( sameYear )
            return month1+' - '+month2+' '+m2.format('YYYY')
        else
            return month1+' ‘'+m1.format('YY')+' - '+month2+' ‘'+m2.format('YY')
    }

    // leave off the year since it's this year
    if( thisYear )
        return m1.format('MMM D')+' - '+m2.format('MMM D')

    return m1.format('M/D/YY')+' - '+m2.format('M/D/YY')
}