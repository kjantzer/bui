/*
    TODO:
    - add sliding animation?
*/
import { LitElement, html, css } from 'lit-element'

customElements.define('b-carousel', class extends LitElement{

    static get properties(){return {
        views: {type: Array}
    }}

    constructor(){
        super()
        this.views = []
        this.active = 0
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            --dotSize: 14px;
            --dotPadding: 4px;
            --dotMargin: 5px;
            --dotExpand: scale(1.4);
        }

        [hidden] {
            display: none;
        }

        nav {
            display: flex;
            margin: 1em 0;
            justify-content: center;
            align-items: center;
        }

        nav > div {
            width: var(--dotSize);
            height: var(--dotSize);
            margin: var(--dotMargin);
            padding: var(--dotPadding);
            cursor: pointer;
        }

        nav > div > div {
            height: 100%;
            width: 100%;
            border-radius: 20px;
            background: #ccc;
            transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }

        nav > div:hover > div {
            transform: var(--dotExpand);
        }

        nav > div[active] > div {
            background: #2196F3;
        }
        
        @media print {
            nav {
                display: none;
            }

            ::slotted(*) {
                display: block !important
            }
        }
    `}

    render(){return html`
        <slot></slot>
        <nav ?hidden=${this.views.length<=1}>${this.views.map((v,i)=>html`
            <div i=${i} ?active=${i==this.active} @click=${this.navTo}>
                <div></div>
            </div>
        `)}</nav>
    `}

    get active(){ return this.__active }
    set active(val){
        this.__active = val
        this.views.forEach(v=>v.hidden=true)

        if( !this.views[val] ) return 

        this.views[val].hidden = false
        this.update()
    }

    navTo(e){
        let i = e.currentTarget.getAttribute('i')
        this.active = i
    }

    firstUpdated(){

        let slot = this.shadowRoot.querySelector('slot');

        slot.addEventListener('slotchange', e=>{
            this.views = slot.assignedElements();
            this.active = 0
        });
    }

})

export default customElements.get('b-carousel')