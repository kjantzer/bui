import { LitElement, html, css } from 'lit'

// not used by default
customElements.define('b-dragdrop-preview', class extends LitElement{

    static properties = {
        value: {type: String}
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
            position: absolute;
            z-index: 10000;
            left: -10000px;
            pointer-events: none;
            padding: 1em;
            box-sizing: border-box;
            border-radius: 12px;
            box-shadow: var(--theme-shadow-2);
            background: var(--theme-bgd);

            /*background: rgba(var(--theme-text-rgb), .2);*/

        }
    `

    matchSize = true

    render(){return html`
        ${this.value}
    `}

    set data(val){
        let oldVal = this.data
        this.__data = val
    
        this.requestUpdate('data', oldVal)
    }
    
    get data(){ return this.__data}

    onLeave(){
        this.value = ''
    }

})

export default customElements.get('b-dragdrop-preview')