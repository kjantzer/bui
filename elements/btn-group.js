import { LitElement, html, css } from 'lit-element'

customElements.define('b-btn-group', class extends LitElement{

    static get styles(){return css`
        :host {
            display: inline-flex;
        }

        ::slotted(b-btn:first-of-type:not(:last-of-type)){
            border-radius: var(--radius) 0 0 var(--radius);
        }

        ::slotted(b-btn:not(:first-of-type):not(:last-of-type)){
            border-radius: 0;
            border-left: solid 1px rgba(0,0,0,.2);
        }

        ::slotted(b-btn:last-of-type:not(:first-of-type)){
            border-radius: 0 var(--radius) var(--radius) 0;
            border-left: solid 1px rgba(0,0,0,.2);
        }
    `}

    render(){return html`
        <slot></slot>
    `}

})

export default customElements.get('b-btn-group')