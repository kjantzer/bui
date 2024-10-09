import { LitElement, html, css } from 'lit'

customElements.define('b-global-search-row-divider', class extends LitElement{

    static shouldDisplay(prevModel, model, list){

        if( !prevModel && model.get('result_type') == 'view-open' )
            return {label: 'Open Views'}

        if( prevModel?.get('result_type') == 'view-open' && model.get('result_type') != 'view-open' )
            return {label: 'Recent'}

        return false
    }

    static get styles(){return css`
        :host {
            display: block;
            padding: .25em 1em 0;
            /*border-bottom: solid 1px var(--theme-bgd-accent);*/
        }
    `}

    render(){return html`

        <b-text xbold xs ucase>${this.data.label}</b-text>
    `}

})

export default customElements.get('b-global-search-row-divider')