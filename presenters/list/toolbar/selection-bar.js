import { LitElement, html, css } from 'lit-element'

customElements.define('b-list-selection-bar', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:absolute;
            z-index: 10;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            background: var(--theme-bgd, #fff);

            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 0;
            padding: 0 .5em;
        }

        :host(:not(.show)) {
            display: none;
        }

        .cancel-btn {
            margin-right: .5em;
            /* margin: 0 1em; */
        }

        @media (max-width: 699px) {
            .count > span {
                display: none;
            }
        }

    `}

    set selection(selection){
        this.__selection = selection
        
        // TODO: unbind when changing?
        selection.on('begin', e=>{
            this.classList.add('show')
            this.update()
        })

        selection.on('end', e=>{
            this.classList.remove('show')
        })

        selection.on('change', result=>{
            this.update()
        })
    }

    get selection(){ return this.__selection }

    render(){return html`
        ${this.selection?html`

            <div>
                <b-btn class="cancel-btn" icon="cancel-1" @click=${this.end} outline></b-btn>

                <span class="count">
                ${this.selection.result.size} <span>selected</span>
                </span>

                <slot name="left"></slot>
            </div>

            <div>
                <slot name="right"></slot>
            </div>
        `:''}
    `}

    end(){
        this.selection.end()
    }

})
