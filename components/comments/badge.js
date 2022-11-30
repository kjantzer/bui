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

        :host([hidden]) { opacity: 0; pointer-events: none; }

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
        this.setAttribute('num-unread', this.coll.numUnread)
    }

    render(){return html`

        <b-label badge="${this.coll.numUnread?'red':'white'}" part="badge">
            ${this.coll.length}
            <!-- <b-label badge="red" dot></b-label> -->
        </b-label>
    `}

    markRead(e){
        // dont mark read from the badge
    }

})

export default customElements.get('b-comments-badge')