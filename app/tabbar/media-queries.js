import { css } from 'lit'
import {mediaQuery, MediaQueries} from '../../util/mediaQueries'

export {mediaQuery, MediaQueries}

// NOTE: change this name
if( !MediaQueries.get('b-app-landscape') )
MediaQueries.set('b-app-landscape', styles=>css`
    @media
    (min-width:900px) and (min-height: 600px),
    (min-width: 700px) and (max-height: 700px) {

        ${styles}

    }
`)