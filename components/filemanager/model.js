import {Model} from 'backbone'
import { round } from '../../util/math'
import CollMap from '../../util/collmap'
import tinycolor from 'tinycolor2'
import colorScheme from '../../util/color-scheme'

const RESOLUTIONS = {
    '3840x2160': '4K',
    '1920x1080': '1080p',
    '1280x720': '720p'
}

export default class FileModel extends Model {

    name = 'file'

    get displayURL(){ return this.url()+'?display' }
    get previewURL(){ return this.url()+'?display=preview' }
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
        return this.traits.toc?.navMap?.navPoint?.length||0
    }

    get resolution(){
        let size = Math.max(this.width, this.height)+'x'+Math.min(this.width, this.height)
        return RESOLUTIONS[size] || ''
    }

    get origFilenameLabel(){
        return this.get('orig_filename').replace(RegExp(`\.${this.get('ext')}$`), '')
    }

    get filenameLabel(){
        return this.get('filename').replace(RegExp(`\.${this.get('ext')}$`), '')
    }

    get isVideo(){
        return this.get('type').match(/video/)
    }

    get isAudio(){
        return this.get('type').match(/audio/)
    }

    get isImg(){
        return this.get('type').match(/image/)
    }

    get isDocument(){
        return this.get('type').match(/pdf/)
    }

    get isEpub(){
        return this.get('ext') == 'epub'
    }

    get isNonStandardDocument(){
        let min = Math.min(this.width, this.height)
        let max = Math.max(this.width, this.height)
        return this.isDocument && min && max && (min != 8.5 || max != 11)
    }

    get palette(){
        return this.__palette = this.__palette || new Palette(this.traits.palette)
    }
}



export class Palette extends CollMap {

    constructor(data, opts={}){
        
        if( data && data.hasOwnProperty('id') && !data.id )
            data = {}

        opts.appendKey = true

        super(data, opts)
        this.opts = opts
    }

    clearVars(el){
        let styles = Array.from(el.style)
        styles.forEach(style=>{
            if( style.startsWith('--palette-') || style.startsWith('--theme') )
                el.style.removeProperty(style)
        })
    }

    applyVars(el, {overrideTheme=true}={}){
        
        // https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/?utm_source=devtools#avoid-forced-synchronous-layouts
        requestAnimationFrame(()=>{

            this.clearVars(el)

            if( this.size == 0 ) return

            this.forEach((color, name)=>{
                el.style.setProperty(`--palette-${name}`, color.rgb.join(' '))
            })

            el.style.setProperty('--theme-rgb', this.get('vibrant').rgb.join(', '))

            el.style.setProperty('--palette-gradient', 
                `linear-gradient(var(--palette-gradient-direction, to right), 
                    rgb(var(--palette-vibrant)),
                    rgb(var(--palette-muted))
                )`
            )

            el.style.setProperty('--palette-gradient-rainbow', 
                `linear-gradient(var(--palette-gradient-direction, to right), 
                    rgb(var(--palette-vibrant)),
                    rgb(var(--palette-lightvibrant)),
                    rgb(var(--palette-lightmuted)),
                    rgb(var(--palette-muted))
                )`
            )

            el.style.setProperty(`--palette-text-accent`, this.textAccent.hex)

            if( overrideTheme ){
                el.style.setProperty('--theme', 'var(--palette-text-accent)')
                el.style.setProperty('--theme-gradient', 'var(--palette-gradient)')
            }

        })
    }

    get textAccent(){
        let bgd = this.opts.bgdColor || colorScheme.getCssVar('theme-bgd') || '#ffffff'
        let color = ['vibrant', 'lightvibrant', 'muted'].find(color=>{
            return tinycolor.isReadable(bgd, this.get(color)?.hex, {level:"AA",size:"large"})
        }) || 'darkvibrant'

        return this.get(color)
    }
}