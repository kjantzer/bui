import { LitElement, html, css } from 'lit'
import Icon from 'bui/elements/icon'
import MaterialIcons from '@material-icons/svg/data.json'
import AllMaterialIcons from './all-material-icons'
import {Collection} from '../../app/models'
import '../../elements/flex'
import '../../elements/animate'
import uniq from '../../util/uniq'
import copyText from '../../util/copyText'
import '../../helpers/lit/emitEvent'

const RegisteredIcons = Icon.registeredIconNames()
const Categories = uniq(MaterialIcons.icons.flatMap(icon=>icon.categories))

// mark which icons are in use by the main application
// TODO
MaterialIcons.icons.forEach(icon=>{
    icon.isRegistered = RegisteredIcons.includes(icon.name)
})

// register material icons
Icon.register(...AllMaterialIcons)

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

        @media (max-width: 599px) {

            b-list::part(list) {
                --grid-size: 74px;
            }
        }
    `}

    constructor(){
        super()
        this.coll = new Collection(MaterialIcons.icons)
    }

    render(){return html`

        <b-list
            key="demo-icons"
            row="b-demo-icons-row"
            .filters=${filters}
            .coll=${this.coll}
            @row-click=${this.onRowClick}
        >

            <b-list-selection-btn></b-list-selection-btn>
            <b-btn text color="theme" slot="actions:left" @click=${this.copy}>Copy Import Code</b-btn>

            <b-btn slot="toolbar:after" icon="github" color="theme" clear
                href="https://github.com/material-icons/material-icons">Source</b-btn>

        </b-list>
    `}

    copy(){
        
        if( this.list.currentModels.length == 0 )
            throw new UIAlertError('No icons selected')

        copyImportCode(this.list.currentModels)
    }

    onRowClick(e){
        let {model} = e.detail
        copyImportCode([model])
    }

})

function copyImportCode(models){
    let code = models.map(d=>{
        return formatImportCode(d)
    })

    copyText(code.join(`,\n`))
    throw new UIAlertError('Import code copied')
}

function formatImportCode(d){
    return `['${d.name}', require('@material-icons/svg/svg/${d.name}/baseline.svg')]`
}

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

    onClick(){
        this.emitEvent('row-click', this)
    }

    render(){return html`
        <b-flex col center>
            <b-animate scale="1.2" @click=${this.onClick}>
                <b-icon name=${this.model.name}></b-icon>
            </b-animate>
            <b-text sm>${this.model.name}</b-text>
        </b-flex>
    `}

})
