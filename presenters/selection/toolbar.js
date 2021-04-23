import { LitElement, html, css } from 'lit-element'

customElements.define('b-selection-bar', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;

            display: flex;
            align-items: center;
            padding: 0 1em;
        }

        :host(:not(.show)) {
            display: none;
        }

        .cancel-btn {
            margin: 0 1em;
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
            <b-btn class="cancel-btn" icon="cancel-1" @click=${this.end} outline></b-btn>

            ${this.selection.result.size} selected

        `:''}
    `}

    end(){
        this.selection.end()
    }

})
