import { LitElement, html, css } from 'lit-element'

customElements.define('b-comment-summary', class extends LitElement{

    static get properties(){return {
        summary: {type: Object},
        resolved: {type: Boolean}
    }}

    constructor(){
        super()
        this.resolved = false
    }

    static get styles(){return css`
        :host {
            display: inline-block;
            position:relative;
        }
        
        b-text {
            position: absolute;
            color: var(--theme-bgd);
            left: 0;
            top: .2rem;
            width: 100%;
            height: calc(100% - .45rem);
            font-size: .65em;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: bold;
        }

        b-label {
            position: absolute;
            top: -1px;
            right: -3px;
            box-shadow: var(--theme-bgd) 0 0 0 1px;
        }

        :host(:not([show])) {
            display: none;
        }

        :host([muted]) b-icon {
            color: var(--theme-text-accent);
        }
    `}

    updated(){
        this.toggleAttribute('show', this.total > 0)
    }

    get total(){
        if( !this.summary ) return 0
        return this.resolved ? this.summary.total : this.summary.unresolved
    }

    get _summary(){ return this.summary || {} }

    render(){return html`
      
        <b-icon name="comment"></b-icon>
        <b-text>${this.total}</b-text>
        <b-label dot filled="red" ?hidden=${this._summary.unread==0}></b-label>

    `}

})

export default customElements.get('b-comment-summary')