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