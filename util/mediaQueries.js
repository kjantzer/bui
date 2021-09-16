import {css} from 'lit-element'
import device from './device'

const MediaQueries = new Map()

MediaQueries.set('sm', styles=>css`
    @media (max-width:599px) {
        ${styles}
    }
`)

MediaQueries.set('md', styles=>css`
    @media (max-width:1199px) {
        ${styles}
    }
`)

MediaQueries.set('sm-md', styles=>css`
    @media (min-width:600px) and (max-width:1199px) {
        ${styles}
    }
`)

MediaQueries.set('tablet', styles=>device.isTablet&&css`
    ${styles}
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