import { LitElement, html, css } from 'lit'
import {hexToRgb} from '../../util/color-shift'
import {copyText} from '../../util/clipboard'
import tinycolor from 'tinycolor2'

customElements.define('b-demo-colors', class extends LitElement{

    static title = 'Colors'

    static styles = css`
        :host {
            display: block;
            position:relative;
            padding: var(--gutter);
            overflow: auto;
        }
    `

    render(){return html`

        <b-text-divider xbold lg>
            Colors (Material)
            <b-btn clear slot="right" color="theme" href="https://materialui.co/colors">Source</b-btn>
        </b-text-divider>
        
        <b-demo-list-of-colors></b-demo-list-of-colors>
    `}

})

customElements.define('b-demo-list-of-colors', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            --grids:repeat(auto-fill, minmax(140px, 1fr));
            grid-template-columns: var(--grids);
            gap: var(--gutter);
        }

        [group="default"] {
            grid-column: 1/5;
        }

        [group="default"] .colors {
            display: grid;
            grid-template-columns: var(--grids);
            gap: 1em;
        }

        .color {
            border: 1px solid rgba(0,0,0,.12);
            padding: .5em;
            height: 4em;
            /* display: flex;
            justify-content: space-between;
            align-items: center; */
        }

        [num="900"] + [num] {
            margin-top: .5em;
        }

        @media (max-width: 550px) {
            :host {
                --grids: 1fr 1fr;
            }

            [group="default"] {
                grid-column: 1/3
            }
        }
    `}

    connectedCallback(){
        super.connectedCallback()

        this.colors = []

        for( let sheet of document.styleSheets ){

            let rules = null

            try{ rules = sheet.cssRules }catch(e){}

            if( rules )
            for( let rule of rules ){

                // material colors
                if( rule.cssText.match(/:root { --red-50: /) ){
                    
                    let matches = rule.cssText.match(/--.[^:)]+: (.[^;]+);/g)
                    let colors = {}
                    
                    matches.map(v=>{

                        let [str, name, num, color] = v.match(/--(.[^\d(A\d)]+)(?:-(.+))?: (.[^;]+);/)
                        let key = name + (num?'-'+num:'')
                        
                        if( num ){
                            colors[name] = colors[name] || {name: name, colors: []}
                            colors[name].colors.push({ key, name, num, color })
                        }else{
                            colors['default'] = colors['default'] || {name: 'default', colors: []}
                            colors['default'].colors.push({ key, name, num, color})
                        }
                            
                    })

                    this.colors = Object.values(colors)
                }
            }
        }

        this.colors.forEach(colorGroup=>{

            colorGroup.colors.forEach(d=>{

                let color = ['#fff', '#000'].find(color=>{
                    return tinycolor.isReadable(d.color, color, {level:"AA",size:"large"})
                })

                d.textColor = color
            })
        })

        console.log(this.colors);
        
    }

    render(){return html`
        ${this.colors.map(g=>html`
            <div group="${g.name}">
                <b-text caps xbold >${g.name}</b-text>
                <div class="colors">
                ${g.colors.map(c=>html`

                    <div .model=${c} num=${c.num} key="${c.key}" class="color" 
                        @click=${this.copyColor}
                        style="background-color: var(--${c.key}); color: ${c.textColor}">
                        <div>${c.num}</div>
                    </div>
                `)}
                </div>
            </div>
        `)}
    `}

    copyColor(e){
        let {model} = e
        let color = model.color

        if( e.metaKey || e.ctrlKey )
            color = hexToRgb(color, {string: 'rgba'})
        
        copyText(color)
        throw new UIAlertError(`Copied ${color}`)
    }

})