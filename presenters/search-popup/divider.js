import { LitElement, html, css } from 'lit-element'
// import dayjs from 'dayjs'

customElements.define('b-search-popup-results-divider', class extends LitElement{

    static shouldDisplay(prevModel, model, list){

        if( model._historyTs ){

            if( !prevModel ) return true
            // TODO: show "yesterday, two days ago, older" dividers?
        }

        return false
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: 1em .5em 0 .5em;
        }

        :host(:first-child) {
            padding-top: 0;
        }

        :host(:not(:hover)) .clear {
            display: none;
        }
    `}

    render(){return html`

        <span>
            <b-text ucase bold sm>History</b-text>
            <!-- <b-btn text class="clear" sm thin color="red">clear</b-btn> -->
        </span>
    `}

    clearHistory(){
        
    }

})

export default customElements.get('b-search-popup-results-divider')