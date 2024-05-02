import { LitElement, html, css } from 'lit'

// TODO: maybe rename?
customElements.define('b-circle-progress', class extends LitElement{

    static properties = {
        val: {type: Number}
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        svg {
            width: 1em;
            stroke-dashoffset: 0;
            rotate: -90deg; /* start at top */
        }

        circle {
            fill: none;
            stroke: var(--theme);
            stroke-width: 32px;
        }

        circle.bgd {
            stroke: var(--theme-bgd-accent);
        }
    `

    set val(val){
        let oldVal = this.val
        
        if( val < 0 ) val = 0
        if( val >= 100 ) val = 101 /* to complete circle */

        this.__val = val

        this.requestUpdate('val', oldVal)
    }
    
    get val(){ return this.__val}

    render(){return html`
        <svg viewBox="0 0 64 64" >
            <circle r="25%" cx="50%" cy="50%" style="stroke-dasharray: 100" class="bgd"></circle>
            <circle r="25%" cx="50%" cy="50%" style="stroke-dasharray: ${this.val} 100"></circle>
        </svg>
    `}

})

export default customElements.get('b-circle-progress')