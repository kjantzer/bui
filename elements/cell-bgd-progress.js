import { LitElement, html, css } from 'lit'

customElements.define('b-cell-bgd-progress', class extends LitElement{

    static properties = {
        width: {type: Number, reflect: true}
    }

    static styles = css`
         :host{
            position: absolute;
            top: 2px;
            left: 2px;
            bottom: 2px;
            border-radius: 3px;
            max-width: calc(100% - 4px);

            width: calc((var(--width) * 1%) - 4px);
            background: var(--list-cell-hover-bgd, var(--theme-bgd-accent));
            pointer-events: none;
        }

        :host([bottom-bar]){
            top: auto;
            bottom: 0px;
            height: 4px;
            background: rgba(var(--theme-rgb), .3);
        }

        :host([bottom-bar][width="100"]){
            background: rgba(var(--theme-rgb), 1);
        }

        :host-context([isselected]){
            background: rgba(var(--theme-rgb), .1);
        }
    `

    set width(val){
        let oldVal = this.width
        console.log(val);
        if( val > 100 ) val = 100
        if( val < 0 ) val = 0
        this.__width = val

        this.setAttribute('width', val)
        this.style.setProperty('--width', val)
        this.requestUpdate('width', oldVal)
    }
    
    get width(){ return this.__width}

    render(){return html`
        
    `}

})

export default customElements.get('b-cell-bgd-progress')