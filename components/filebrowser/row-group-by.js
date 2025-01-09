import { LitElement, html, css } from 'lit'
import GroupByDivider from '../../presenters/list/group-by/divider'

customElements.define('b-filebrowser-group-by-row', class extends GroupByDivider{

    static styles = [GroupByDivider.styles, css`
        .label {
            grid-column: span 3;
        }
    `]

    render(){return html`
        <b-text class="label" clip sticky>
            ${this.model.name.replace(/^(\d+|Z)_/, '').replace('null','-')}
            <b-text nobold muted>(${this.model.length})</b-text>    
        </b-text>
        <!--<b-text class="end">
            <b-text sm muted>${this.model.sortLabelPartial}</b-text>
        </b-text>-->
    `}

})

export default customElements.get('b-filebrowser-group-by-row')