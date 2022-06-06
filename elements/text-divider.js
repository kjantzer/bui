import { LitElement, html, css } from 'lit'
import Text from './text'

customElements.define('b-text-divider', class extends Text{

    static get properties(){return Object.assign(super.properties, {
        icon: {type: String},
        thick: {type: Boolean}
    })}

    static get styles(){return [super.styles, css`
        :host {
            display: flex;
            align-items: center;
            align-self: stretch;
            gap: .5em;
            position: relative;
        }

        :host([wrap]) {
            flex-wrap: wrap;
        }

        @media (max-width: 599px) {
            :host {
                flex-wrap: wrap;
            }
        }

        [name="divider:left"] { display: none; }
        :host([center]) [name="divider:left"] { display: contents;}

        b-icon {
            --size: .9em;
        }
        
        [name="right"]::slotted(:first-child) {
            margin-left: auto;
        }

        :host([pad]) { margin: 2rem 0 .5rem; }
        :host([pad="1"]) { margin: 2rem 0 1rem; }
        :host([pad="2"]) { margin: 4rem 0 2rem; }

        :host([bottom]) {
            padding-bottom: .5em;
        }

        :host([bottom]) [name="divider"] {
            position: absolute;
            display: block;
            width: 100%;
            bottom: 0;
        }

        :host([bottom]) [name="right"]::slotted(*) {
            margin-left: auto;
        }

        :host([gradient]) b-hr {
            --bgd: var(--theme-gradient);
        }

        :host([gradient="reverse"]) b-hr {
            --bgd: var(--theme-gradient-reverse, var(--theme-gradient));
        }

        :host ::slotted(*) {
            align-self: unset;
        }
    `]}


    render(){return html`
        <slot name="left"></slot>

        <slot name="divider:left"><b-hr ?thick=${this.thick} pad="none"></b-hr></slot>
        
        <slot name="label">
            ${this.icon?html`
            <b-icon name="${this.icon}" part="icon" class="slot"></b-icon>
            `:''}
            ${super.render()}

            <slot name="label:after"></slot>
        </slot>

        <slot name="divider"><b-hr part="divider" ?thick=${this.thick} pad="none"></b-hr></slot>

        <slot name="right"></slot>
    `}

})

export default customElements.get('b-text-divider')