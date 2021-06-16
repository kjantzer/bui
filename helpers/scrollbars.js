import {css, unsafeCSS} from 'lit-element'
import device from '../util/device'

const styles = css`
    ::-webkit-scrollbar {
        width: 8px; /* 1px wider than Lion. */
        /* This is more usable for users trying to click it. */
        background-color: rgba(0,0,0,0);
        -webkit-border-radius: 100px;
    }

    /* hover effect for both scrollbar area, and scrollbar 'thumb' */
    ::-webkit-scrollbar:hover {
        background-color: rgba(0, 0, 0, 0.09);
    }

    /* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
    ::-webkit-scrollbar-thumb:vertical {
        /* This is the EXACT color of Mac OS scrollbars.
            Yes, I pulled out digital color meter */
        background: rgba(0,0,0,0.5);
        -webkit-border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb:vertical:active {
        background: rgba(0,0,0,0.61); /* Some darker color when you click it */
        -webkit-border-radius: 100px;
    }
`

const hide = (el=':host')=>css`
${unsafeCSS(el)}::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
}
`

const stopWheelScrolling = target=>{
    target.addEventListener('wheel', e=>{
        e.preventDefault()
        e.stopPropagation()
        return false
    })
}

const styleWindows = ()=>device.isWindows ? styles : css``
const styleAll = ()=>styles

export default {
    styleWindows,
    styleAll,
    hide,
    stopWheelScrolling,

    // DEPRECATED
    ifWindows(){ return styleWindows() },
    forAll(){ return styleAll() }
}