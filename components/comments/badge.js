/*
    NOTE: this is an early concept, needs work
    Not the most efficient
*/
import { LitElement, html, css } from 'lit'
import CommentsView from './index'

customElements.define('b-comments-badge', class extends CommentsView{

    static get styles(){return css`
        :host {
            display: inline-block;
        }

        :host(:not([num])),
        :host([num="0"]) {
            visibility: hidden;
        }

        [dot] {
            position: absolute;
            right: 0;
            top: 0;
        }

        b-label {
            padding: 0.15em .3em;
        }
    `}

    updated(){
        this.setAttribute('num', this.coll.length)
        this.toggleAttribute('unread', this.coll.numUnread>0)
    }

    render(){return html`

        <b-label badge="${this.coll.numUnread?'red':'white'}" part="badge">
            ${this.coll.length}
            <!-- <b-label badge="red" dot></b-label> -->
        </b-label>
    `}

})

export default customElements.get('b-comments-badge')