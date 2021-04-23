import {css} from 'lit-element'
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

export default {
    ifWindows(){ return device.isWindows ? styles : css`` },
    forAll(){ return styles }
}