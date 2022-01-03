import { LitElement, html, css } from 'lit-element'
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
            gap: .5em;
        }

        [name="divider:left"] { display: none; }
        :host([center]) [name="divider:left"] { display: contents;}

        b-icon {
            --size: .9em;
        }

        :host([pad]) {
            margin: 2rem 0 .5rem;
        }
    `]}


    render(){return html`
        <slot name="left"></slot>

        <slot name="divider:left"><b-hr ?thick=${this.thick} pad="none"></b-hr></slot>
        
        <slot name="label">
            ${this.icon?html`
            <b-icon name="${this.icon}" class="slot"></b-icon>
            `:''}
            ${super.render()}
        </slot>

        <slot name="divider"><b-hr ?thick=${this.thick} pad="none"></b-hr></slot>

        <slot name="right"></slot>
    `}

})

export default customElements.get('b-text-divider')