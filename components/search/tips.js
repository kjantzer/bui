import { LitElement, html, css } from 'lit'
import '../../elements/grid'
import '../../elements/label'
import '../../elements/grid'

customElements.defineShared('b-search-popup-tips', class extends LitElement{

    static get styles(){return css`
        :host {
            display: contents;
        }

        :host(.__view) {
            background-color: var(--theme-bgd);
            display: block;
            padding: 1em;
        }
    `}

    render(){return html`
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
    `}

})

export default customElements.get('b-search-popup-tips')