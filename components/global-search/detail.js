import { LitElement, html, css } from 'lit'
import device from '../../util/device'

let CMD = device.isMac?'⌘':'Ctrl'

customElements.define('b-global-search-row-detail', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            border-left: solid 1px var(--theme-bgd-accent);
            padding: 1.5em 1em;
            width: 200px;
            overflow: auto;
            /*background: linear-gradient(to right, var(--theme-bgd-accent2), var(--theme-bgd));*/
        }

        :host([hidden]) {display: none; }
    `

    render(){
        
        let resultRender = this.parentElement?.host?.resultRender?.get(this.model?.get('result_type'))

        if( resultRender ){

            // cache?
            if( typeof resultRender == 'string' ){
                let el = new (customElements.get(resultRender))()
                el.model = this.model
                return el
            }
            return resultRender(this.model, {detail: true})
        }    
        
        return html`
            <b-empty-state overlay>
                <b-grid cols=1>
                <b-text dim heading>Type <b-code keyboard>/</b-code> for commands</b-text>
                <b-text dim heading balance>Navigate rows with <b-code keyboard>↑</b-code> and <b-code keyboard>↓</b-code></b-text>
                <b-text dim heading>Select with <b-code keyboard title="Enter" style="min-width: 1.6em">↵</b-code></b-text>
                <b-text dim heading balance>Open this view with <b-code keyboard>${CMD}</b-code>+<b-code keyboard>K</b-code></b-text>
                <b-text dim heading>Press <b-code keyboard>esc</b-code keyboard> to close</b-text>
                <b-text dim heading>Open to commands with <b-code keyboard>${CMD}</b-code>+<b-code keyboard>/</b-code></b-text>
                </b-grid>
            </b-empty-state>
        `
    }

})

export default customElements.get('b-global-search-row-detail')