import { LitElement, html, css } from 'lit'
import Popover from '../../presenters/popover'

customElements.defineShared('b-palette', class extends LitElement{

    static get properties(){return {
        palette: {}
    }}

    static open(palette, target){
        this.shared.palette = palette
        new Popover(target, this.shared)
    }

    static get styles(){return css`

        :host([in-popover]) {
            display: block;
            padding: 1em;
        }

        .colors {
            text-align: center;
        }

        .swatch {
            height: 3rem;
            width: 3rem;
            border-radius: 2em;
            background: var(--color);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: .8em;
        }

        .info {
            line-height: 0;
        }
    `}

    set palette(val){
        let oldVal = this.palette
        
        if( val ){
            let _val = []
            for(let k in val){
                _val.push(Object.assign({name: k}, val[k]))
            }
            val = _val
        }

        this.__palette = val || []
    
        this.requestUpdate('palette', oldVal)
    }
    
    get palette(){ return this.__palette }

    render(){return html`
        <b-flex class="colors">
        ${this.palette.map(c=>html`
            <b-flex col style="--color:${c.hex};" center gap=".5">
                <div class="swatch" title="Population">${c.pop}</div>
                <div class="info">
                    <b-text xs block>${c.name}</b-text>
                    <b-text xs muted>${c.hex}</b-text>
                </div>
            </b-flex>
        `)}
        </b-flex>
    `}

})

export default customElements.get('b-palette')