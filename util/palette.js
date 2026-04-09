/*
    # Palette

    Intially designed to work with filemanager that captures a color palette upon upload
*/
import CollMap from './collmap'
import tinycolor from 'tinycolor2'
import {colorScheme} from './color-scheme'

export default class Palette extends CollMap {

    constructor(data, opts={}){
        
        if( data && data.hasOwnProperty('id') && !data.id )
            data = {}

        opts.appendKey = true

        super(data, opts)
        this.opts = opts
    }

    clearVars(el, {overrideTheme=true}={}){
        let styles = Array.from(el.style)
        styles.forEach(style=>{
            if( style.startsWith('--palette-') || (overrideTheme && style.startsWith('--theme')) )
                el.style.removeProperty(style)
        })
    }

    applyVars(el, {overrideTheme=true}={}){
        
        // https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/?utm_source=devtools#avoid-forced-synchronous-layouts
        requestAnimationFrame(()=>{

            this.clearVars(el, {overrideTheme})

            if( this.size == 0 ) return

            this.forEach((color, name)=>{
                el.style.setProperty(`--palette-${name}`, color.rgb.join(' '))
            }) 

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
                el.style.setProperty('--theme-rgb', this.get('vibrant').rgb.join(', '))
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