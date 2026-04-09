import {Model} from 'backbone'
import { round } from '../../util/math'
import Palette from '../../util/palette'

const RESOLUTIONS = {
    '3840x2160': '4K',
    '1920x1080': '1080p',
    '1280x720': '720p'
}

export {Palette}

export default class FileModel extends Model {

    name = 'file'

    get displayURL(){ return this.collection || this.urlRoot ? this.url()+'?display' : ''}
    get previewURL(){ return this.collection || this.urlRoot ? this.url()+'?display=preview' : ''}
    get downloadURL(){ return this.url()+'?download' }

    get attrTypes(){return {
        timestamp_created: 'date'
    }}

    get traits(){ return this.attributes.traits || {} }

    saveTrait(key, val){
        let traits = this.traits
        let changes = {[key]:val}

        // given an hash of changes
        if( typeof key !== 'string' && val == undefined )
            changes = key

        // apply each change, deleting trait if value is "null"
        for( let k in changes ){
            let v = changes[k]

            if( v == null )
                delete traits[k]
            else
                traits[k] = v
        }

        this.save('traits', traits, {patch:true})

        // if changed a single trait
        if( val !== undefined )
            this.trigger('change:traits:'+key, this, {traits})

        this.trigger('change', this, {traits})
    }

    get width(){
        return round(this.traits.width||0, 4)
    }

    get height(){
        return round(this.traits.height||0, 4)
    }

    get duration(){
        return this.traits.duration||0
    }

    get pages(){
        return this.traits.pages||0
    }

    get chapters(){
        // TODO: support more than single nested navPoint?
        return this.traits.toc?.navMap?.navPoint?.flatMap(d=>d.navPoint||d)?.length||0
    }

    get resolution(){
        let size = Math.max(this.width, this.height)+'x'+Math.min(this.width, this.height)
        return RESOLUTIONS[size] || ''
    }

    get audioRMS(){ return round(this.traits.stats?.['RMS level dB']) || '' }
    get audioPeak(){ return round(this.traits.stats?.['Peak level dB']) || '' }
    get audioNoiseFloor(){ return round(this.traits.stats?.['Noise floor dB']) || this.traits.stats?.['Noise floor dB'] || '' }

    get origFilenameLabel(){
        return this.get('orig_filename').replace(RegExp(`\.${this.get('ext')}$`), '')
    }

    get filenameLabel(){
        return this.get('filename').replace(RegExp(`\.${this.get('ext')}$`), '')
    }

    get isVideo(){
        return !!this.get('type').match(/video/)
    }

    get isAudio(){
        return !!this.get('type').match(/audio/)
    }

    get isImg(){
        return !!this.get('type').match(/image/)
    }

    // may not be reliable
    get isPhoto(){
        // ie "Sony" or "Canon"
        return this.isImg && !!this.get('traits')?.exif?.image?.Make
    }

    get isDocument(){
        return !!this.get('type').match(/pdf/)
    }

    get isEpub(){
        return ['epub', 'mobi'].includes(this.get('ext'))
    }

    get isNonStandardDocument(){
        let min = Math.min(this.width, this.height)
        let max = Math.max(this.width, this.height)
        return this.isDocument && min && max && (min != 8.5 || max != 11)
    }

    get isArchived(){
        return this.get('traits')?.archived
    }

    get palette(){
        return this.__palette = this.__palette || new Palette(this.traits.palette)
    }
}
