import { LitElement, html, css } from 'lit-element'
import Icon, {importMaterialIcons} from 'bui/elements/icon'
import AllIcons from '@material-icons/svg/data.json'
import {Collection} from '../../app/models'
import '../../elements/flex'
import uniq from '../../util/uniq'

const RegisteredIcons = Icon.registeredIconNames()
const MaterialIcons = importMaterialIcons(AllIcons.icons.map(icon=>icon.name))

console.log(RegisteredIcons);
window.Icon = Icon

const Categories = uniq(AllIcons.icons.flatMap(icon=>icon.categories))

// mark which icons are in use by the main application
AllIcons.icons.forEach(icon=>{
    icon.isRegistered = RegisteredIcons.includes(icon.name)
})

// register material icons
Icon.register(...MaterialIcons)

customElements.define('b-demo-icons', class extends LitElement{

    static get title(){ return 'Material Icons' }

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            height: 100%;
        }

        b-list::part(list) {
            display: grid;
            --grid-size: 200px;
            grid-template-columns: repeat( auto-fill, var(--grid-size) );
            grid-template-rows: auto;
            align-content: flex-start;
            justify-content: center;
            padding: 1em;
            gap: 1em;
        }
    `}

    constructor(){
        super()
        this.coll = new Collection(AllIcons.icons)
    }

    render(){return html`
        <b-list
            key="demo-icons"
            row="b-demo-icons-row"
            .filters=${filters}
            .coll=${this.coll}
        >
        </b-list>
    `}

})

const filters = {
    search: {
        minCharLength: 2,
        threshold: .2,
        data(m){
            return {
                name: m.name,
                tags: m.tags
            }
        }
    },
    category: {
        values: [{label: 'All', val: ''}, '-'].concat(Categories),
        filterBy(m, v, k){
            return m.categories.includes(v)
        }
    },
    isRegistered: {
        label: 'In Use',
        values: [
            {label: 'All', val: ''},
            '-',
            {label: 'Yes', val: 1},
            {label: 'No', val: 0}
        ]
    }
}

customElements.define('b-demo-icons-row', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: 1em;
        }

        b-icon {
            font-size: 2.2em;
        }

        :host([registered]) {
            background: var(--theme-bgd-accent);
            border-radius: 1em;
        }
    `}

    updated(){
        this.toggleAttribute('registered', this.model.isRegistered)
    }

    render(){return html`
        <b-flex col center>
            <b-icon name=${this.model.name}></b-icon>
            <b-text sm>${this.model.name}</b-text>
        </b-flex>
    `}

})
