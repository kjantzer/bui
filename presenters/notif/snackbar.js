import { LitElement, html, css } from 'lit-element'
import {unsafeHTML} from 'lit-html/directives/unsafe-html'
import makeBtn, {cancelBtns} from '../dialog/make-btn'
import '../../helpers/lit-element/events'

customElements.define('b-snackbar', class extends LitElement{

    static get properties(){ return {
        msg: {type: String},
        btns: {type: Array},
        icon: {type: String},
    }}

    static get styles(){return css`
        :host {
            padding: var(--b-snackbar-padding, .85em 1em);
            display: grid;
            grid-template-columns: auto 1fr max-content;
            align-items: center;
        }

        .icon > b-icon,
        .icon > .icon {
            margin: -.5em 0;
            margin-right: .75em;
            --size: 1.2em;
            vertical-align: middle;
        }

        .msg {
            margin: 0.05em 0 -.05em; /* better alignment with icon and btns */
        }

        .btns {
            margin-top: -0.05em;
            margin-right: calc(-.5 * var(--padding));
            margin-left: calc(-.5 * var(--padding));
        }

        .btns b-btn {
            font-weight: bold;
            text-transform: uppercase;
            margin: -1em 0;
            vertical-align: middle;
        }

        .btns b-btn[color=''] {
            color: var(--b-notif-btn-color, #333);
        }

        :host([color]) .btns b-btn  {
            color: var(--b-notif-btn-color, #333);
        }

        @media (hover){
            .btns b-btn:hover {
                --bgdColor: var(--b-notif-btn-bgd, rgba(0,0,0,.05));
            }
        }
    `}

    render(){return html`
        <div class="icon">${this.renderIcon()}</div>
        <div class="msg">${this.msg}</div>
        <div class="btns" @click=${this.onBtnClick}>
            ${this.btns.map(btn=>this.renderBtn(btn))}
        </div>
    `}

    renderIcon(){
        if( !this.icon ) return ''

        if( typeof this.icon == 'string' )
            return html`<b-icon name="${this.icon}"></b-icon>`
        
        else
            return this.icon
    }

    renderBtn(btn){
        return html`${unsafeHTML(makeBtn(btn))}`
    }

    onBtnClick(e){

        e.stopPropagation()
        let index = Array.from(e.currentTarget.children).indexOf(e.target)
        let btnData = index > -1 ? this.btns[index] : e.target

        if( cancelBtns.includes(btnData) )
            btnData = undefined

        this.emitEvent('click', btnData)
    }

})

export default customElements.get('b-snackbar')