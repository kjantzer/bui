/*
    Can be used to change the theme for a particular element/view

    Example: force dark mode
    ```html
    <my-custom-view>
        <b-theme mode="dark"></b-theme>
    <my-custom-view>
    ```
*/
import { LitElement, html, css } from 'lit'

const modes = {

    light: /*css*/`
        --theme-text-rgb: var(--light-text-rgb);
        --theme-bgd-rgb: var(--light-bgd-rgb);
        --theme-text: var(--light-text);
        --theme-text-accent: var(--light-text-accent);
        --theme-text-accent2: var(--light-text-accent2);
        --theme-bgd: var(--light-bgd);
        --theme-bgd-accent: var(--light-bgd-accent);
        --theme-bgd-accent2: var(--light-bgd-accent2);
        --theme-bgd-hc: var(--light-bgd-hc);
        --theme-shadow: var(--light-shadow);
        --theme-shadow-0: var(--light-shadow-0);
        --theme-shadow-1: var(--light-shadow-1);
        --theme-shadow-2: var(--light-shadow-2);
        --theme-shadow-3: var(--light-shadow-3);
        color: var(--theme-text);
    `,

    dark: /*css*/`
        --theme-text-rgb: var(--dark-text-rgb);
        --theme-bgd-rgb: var(--dark-bgd-rgb);
        --theme-text: var(--dark-text);
        --theme-text-accent: var(--dark-text-accent);
        --theme-text-accent2: var(--dark-text-accent2);
        --theme-bgd: var(--dark-bgd);
        --theme-bgd-accent: var(--dark-bgd-accent);
        --theme-bgd-accent2: var(--dark-bgd-accent2);
        --theme-bgd-hc: var(--dark-bgd-hc);
        --theme-shadow: var(--dark-shadow);
        --theme-shadow-0: var(--dark-shadow-0);
        --theme-shadow-1: var(--dark-shadow-1);
        --theme-shadow-2: var(--dark-shadow-2);
        --theme-shadow-3: var(--dark-shadow-3);
        color: var(--theme-text);
    `,

    inverse: /*css*/`
        --theme-text-rgb: var(--theme-inverse-text-rgb);
        --theme-bgd-rgb: var(--theme-inverse-bgd-rgb);
        --theme-text: var(--theme-inverse-text);
        --theme-text-accent: var(--theme-inverse-text-accent);
        --theme-text-accent2: var(--theme-inverse-text-accent2);
        --theme-bgd: var(--theme-inverse-bgd);
        --theme-bgd-accent: var(--theme-inverse-bgd-accent);
        --theme-bgd-accent2: var(--theme-inverse-bgd-accent2);
        --theme-bgd-hc: var(--theme-inverse-bgd-hc);
        --theme-shadow: var(--theme-inverse-shadow);
        --theme-shadow-0: var(--theme-inverse-shadow-0);
        --theme-shadow-1: var(--theme-inverse-shadow-1);
        --theme-shadow-2: var(--theme-inverse-shadow-2);
        --theme-shadow-3: var(--theme-inverse-shadow-3);
        color: var(--theme-text);
    `

}

customElements.define('b-theme', class extends LitElement{

    static properties = {
        mode: {type: String},
        el: {type: String}
    }

    static styles = css`
        :host {
            display: none;
        }
    `

    // constructor(){
    //     super()
    //     // this.styleEl = document.createElement('style') 
    // }

    connectedCallback(){
		super.connectedCallback()
        this.host = this.parentElement || this.getRootNode()?.host
        // this.root = this.getRootNode()
		// this.host = this.root.host
        this._applyTheme()
	}

	disconnectedCallback(){
		super.disconnectedCallback()
		this._releaseHost()
	}

    onModelChange(){
        this._applyTheme()
    }

    _releaseHost(){
        delete this.host
    }

    async _applyTheme(){
        let el = this.host

        if( this.el ){
            el = await new Promise(resolve=>setTimeout(_=>{
                resolve(el.shadowRoot?.querySelector(this.el))
            }))
        }
            
        
        if( !el ) return console.warn('b-theme: could not apply to unfound element', this.el)
        
        if( this.mode && modes[this.mode] ){
            let props = cssToProps(modes[this.mode])

            props.forEach(([key, val])=>{
                el.style.setProperty(key, val)
            })

        }
    }

})

export default customElements.get('b-theme')

function cssToProps(str){
    return str.trim().split('\n').map(s=>s.trim().split(':').map(s=>s.trim().replace(/;$/, '')))
}

