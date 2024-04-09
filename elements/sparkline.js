import { LitElement, html, css } from 'lit'
import sparkline from '@fnando/sparkline'

customElements.define('b-sparkline', class extends LitElement{

    constructor(){
        super()
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
    }

    static get properties(){return {
        value: {type: String}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
        }

        .sparkline {
            stroke: var(--sparkline-stroke, var(--theme, var(--blue, #000)));
            fill: var(--sparkline-fill, none);
        }

        .sparkline--spot {
            stroke: var(--pink);
            fill: var(--pink);
        }

        .sparkline--cursor {
            stroke: #ffa726;
        }

        .tooltip[hidden] { display:none; }
        .tooltip {
          position: absolute;
          background: #424242;
          color: #fff;
          padding: 2px 5px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 9999;
          border-radius:2px;    
        }
    `}

    render(){return html`
        <svg class="sparkline" width="100" height="30" stroke-width="3"></svg>
        <span class="tooltip" hidden></span>
    `}

    set value(val){
        let oldVal = this.value
        
        val = val.split(',').map(s=>parseInt(s)||0)
        this.__value = val
        
        this.requestUpdate('value', oldVal)
    }

    firstUpdated(){
        this.tooltip = this.shadowRoot.querySelector('.tooltip')
    }

    updated(){
        sparkline(this.shadowRoot.querySelector('svg'), this.value, {
            interactive: true,
            onmousemove: this.onMouseMove, 
            onmouseout: this.onMouseOut,
        });
    }

    get value(){ return this.__value }

    onMouseMove(e, datapoint) {
      const TOOLTIP_OFFSET = 10;

      // set visible content
      this.tooltip.hidden = false
      this.tooltip.textContent = `${Math.floor(datapoint.value)}`;
      // set position
      this.tooltip.style.top = `${datapoint.y - TOOLTIP_OFFSET}px`;
      this.tooltip.style.left = `${datapoint.x + TOOLTIP_OFFSET}px`;
    }

    onMouseOut() {
      this.tooltip.hidden = true;
    }

})

export default customElements.get('b-sparkline')