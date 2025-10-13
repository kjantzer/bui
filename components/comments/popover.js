/*
    Note: expected to get coll from ./badge
*/
import { LitElement, html, css } from 'lit'
import PopoverView from 'bui/presenters/popover/view'

customElements.defineShared('b-comment-popover', class extends PopoverView{

    static styles = [PopoverView.styles, css`
        :host {
            display: block;
            position:relative;
            width: 600px;
        }
    `]

    render(){return html`
        <b-comments newest
            .coll=${this.coll}
        ></b-comments>
    `}

    load(id){
        super.load(id)
        this.coll.fetchSync()
    }

})

export default customElements.get('b-comment-popover')