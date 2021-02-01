import { LitElement, html, css } from 'lit-element'
import device from '../../util/device'

customElements.define('b-search-popup-empty-results', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
        }

        b-code {
            color: var(--theme-bgd);
            background-color: var(--theme-text);
        }

        b-empty-state {
            color: var(--theme-text-accent);
        }
    `}

    render(){return html`

        ${this.list.coll.length==0&&this.list.coll.term?html`

            <b-empty-state>No results found</b-empty-state>

        `:device.isMobile?'':html`
            <b-empty-state sm>

                <b-grid cols=3 gap=2>

                    <div>
                        <b-label filled="black">
                            <b-icon name="up"></b-icon>
                        </b-label>
                        
                        <b-label filled="black"><b-icon name="down"></b-icon></b-label> to navigate
                    </div>

                    <div>
                        <b-label filled="black">RETURN</b-label> to select
                    </div>

                    <div>
                        <b-label filled="black">ESC</b-label> to cancel
                    </div>

                </b-grid>

                <br><br>

                <b-grid gap=2>
                    
                    <div>
                        <b-label filled="black">ctrl</b-label>
                        + <b-label filled="black">k</b-label> to open search
                    </div>

                    <div>
                        <b-label filled="black">alt</b-label> 
                        + <b-label filled="black"><b-icon name="up"></b-icon></b-label> to toggle enlarge
                    </div>

                    <div colspan>
                        Start with <b-label filled="black">&nbsp;/&nbsp;</b-label> 
                        for shortcuts
                    </div>
                    
                </b-grid>

            </b-empty-state>
        `}
    `}

})

export default customElements.get('b-search-popup-empty-results')