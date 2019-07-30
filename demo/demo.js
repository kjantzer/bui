import '../elements/icon'
import '../elements/btn'
import '../elements/spinner'
import '../elements/spinner-overlay'
import '../elements/uploader'
import '../elements/paper'
import '../elements/timer'
import '../elements/empty-state'
import '../elements/label'
import '../elements/hr'


import { LitElement, html, css } from 'lit-element';
import router from '../router'
import '../presenters/tabs'
import '../presenters/form-control'
import '../presenters/list'
import Panel from '../presenters/panel'
import Menu from '../presenters/menu'
import Dialog from '../presenters/dialog'

window.Dialog = Dialog

window.showMenu = async function(el){

    let menu = [
        {divider: 'Group Title'},
        {label: 'Menu Item 1', val: '1'},
        {label: 'Menu Item 2', val: '2'},
        {label: 'Menu Item 3', val: '3'},
        'divider',
        {label: 'More', menu: [
            {label: 'Submenu 1', val: 'more-1'},
            {label: 'Submenu 2', val: 'more-2'}
        ], menuOpts: {popover: {align: 'right-start'}}},
        {text: 'Look at the console after selecting a value'}
    ]

    let selected = await new Menu(menu).popover(el)

    console.log(selected)
}

Panel.register('view-1', ()=>html`
    <b-panel-toolbar shadow>
        <b-btn href="/#/view-2" slot="right">View 2</b-btn>
        <span slot="left">
            <b-hr vert></b-hr>
            Left Content
        </span>
        <span slot="middle"> <b-label filled>Badge</b-label></span>
    </b-panel-toolbar>
    <main style="flex:1">
        <b-tabs layout="left">
            <div title="View 1">View 1 content</div>
            <div title="View 2">View 2 content</div>
        </b-tabs>
    </main>
`, {title: 'View 1'})


customElements.define('view-two', class extends LitElement{

    static get styles(){return css`
        main {
            padding: 1em;
            overflow: auto;
        }
    `}

    render(){return html`
        <b-panel-toolbar look="white" noshadow>
            <b-btn slot="right" @click=${this.btnMenu}>Change Style</b-btn>
        </b-panel-toolbar>
        <main>
            content
        </main>
    `}

    async btnMenu(e){
        let selected = await new Menu([
            {label: 'Modal', opts:{width: '600px', height: '400px', anchor:'center'}},
            {label: 'Drawer', opts:{width: '600px', height: '', anchor:'right'}},
            {label: 'Drawer Left ', opts:{width: '600px', height:'', anchor:'left'}},
            {label: 'Slide Top ', opts:{width: '100%', height:'50vh', anchor:'top'}},
            'divider',
            {label: 'Reset', icon: 'arrows-ccw', opts:{width: '100%', height: '100%', anchor:'right'}}
        ]).popover(e.target, {align: 'bottom-end'})

        if( selected ){
            console.log(selected)
            for( let key in selected.opts ){
                console.log(key);
                this.panel[key] = selected.opts[key]
            }
        }
    }
})

Panel.register('view-2', 'view-two', {title: 'View 2'})
Panel.register('view-2-small', 'view-two', {
    title: 'View 2 Small',
    width: '600px',
    height: '400px',
    anchor: 'center'
})

let listData = []
let i = 0
while(i++ <100){
    listData.push({id: i, label: 'Row '+i, date: (new Date()).getTime()+(i*10000000)})
}

const listSorts = {
    id: {
        label: 'ID',
        sortBy(m){ return m.id }
    }
}

customElements.define('a-list-view', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            height: 340px;
            margin: -2em;
            border-bottom: solid 1px rgba(0,0,0,.1);
        }

        b-list {
            height: 100%;
            overflow: hidden;
        }
    `}

    render(){return html`
        <b-list
            key="a-list-view"
            row="a-list-view-row"
            .sorts=${listSorts}
            .coll=${listData}
        ></b-list>
    `}

})

customElements.define('a-list-view-row', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            padding: .5em 1em;
        }
    `}

    render(){return html`
        ${this.model.label}
    `}

})

window.dialogs = {
    async success(el){
        Dialog.success().modal()
    },

    async warn(el){
        Dialog.warn({title: 'Ooops', msg: 'That is not supported'}).modal()
    },

    async error(el){
        Dialog.error({title: 'Error', msg: 'Something went wrong'}).modal()
    },

    async errorPopover(el){
        Dialog.error({title: 'Error', msg: 'Something went wrong'}).popover(el)
    },

    async confirm(el){
        if( await Dialog.confirm().modal() )
            console.log('confimed')
    },

     async confirmDelete(el){
        if( await Dialog.confirmDelete().popover(el) )
            console.log('confimed delete')
    }
}

window.openView = el=>{
    event.preventDefault()
    router.goTo(el.getAttribute('href'))
}


router.start()