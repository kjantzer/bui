import {css} from 'lit'
import device from './device'
import ColMap from './collmap'

// TODO: add warning when setting/adding new media query when `b-media-query` already defined
const MediaQueries = new ColMap()

MediaQueries.set('sm', styles=>css`
    @media (max-width:599px) {
        ${styles}
    }
`)

MediaQueries.set('sm-landscape', styles=>css`
    @media (max-width:599px) and (orientation:landscape) {
        ${styles}
    }
`)

MediaQueries.set('sm-portrait', styles=>css`
    @media (max-width:599px) and (orientation:portrait) {
        ${styles}
    }
`)

MediaQueries.set('md', styles=>css`
    @media (max-width:1199px) {
        ${styles}
    }
`)

MediaQueries.set('md-landscape', styles=>css`
    @media (max-width:1199px) and (orientation:landscape) {
        ${styles}
    }
`)

MediaQueries.set('md-portrait', styles=>css`
    @media (max-width:1199px) and (orientation:portrait) {
        ${styles}
    }
`)

MediaQueries.set('sm-md', styles=>css`
    @media (min-width:600px) and (max-width:1199px) {
        ${styles}
    }
`)

MediaQueries.set('lg', styles=>css`
    @media (min-width:1200px) {
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