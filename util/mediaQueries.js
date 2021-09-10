import {css} from 'lit-element'
import device from './device'

const MediaQueries = new Map()

MediaQueries.set('small', styles=>css`
    @media (max-width:599px) {
        ${styles}
    }
`)

const mediaQuery = (key, styles)=>{
    let query = MediaQueries.get(key)
    
    if( !query ){
        console.warn(`MediaQuery '${key}' does not exist`)
        return css``
    }

    if( !styles instanceof css.constructor ){
        console.warn(`MediaQuery '${key}' was not given lit-css`) 
        return css
    }

    return query(styles) || css``
}

device.mediaQuery = mediaQuery

export {mediaQuery, MediaQueries, device, css}