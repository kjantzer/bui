import { LitElement, html, css } from 'lit-element'
import Menu from 'bui/presenters/menu'
import Dialog from 'bui/presenters/dialog'
import 'bui/helpers/colors-list'
import 'bui/presenters/form-control'
import 'bui/presenters/list'
import 'bui/presenters/cal'
import './form-control'
import './notif'
import './tabs'
import './selection'
import './mentions'
import './panel'

customElements.define('demo-presenters', class extends LitElement{

    static get title(){ return 'Presenters' }
    static get icon(){ return 'window' }
    static get path(){ return 'presenters(/:tab)' }

    static get styles(){return css`
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            overflow: hidden;
        }

        b-cal,
        a-list-view {
            height: 100%;
        }
    `}

    render(){return html`
        <b-tabs-router path="presenters/" key="presenters" layout="left" >

            demo-presenter-form-control

                <section title="Dialog">
                    <h1>Dialog</h1>

                    <div class="cols-2">
                        <div>
                            <b-paper id="dialog-success" compact></b-paper>
                            <b-paper id="dialog-warn" compact></b-paper>
                            <b-paper id="dialog-error" compact></b-paper>
                        </div>
                        <div>
                            <b-label divider>Modals</b-label><br>
                            <b-btn outline onclick="dialogs.success(this)">Success Modal</b-btn><br><br>
                            <b-btn outline onclick="dialogs.error(this)">Error Modal</b-btn><br><br>
                            <b-btn outline onclick="dialogs.warn(this)">Warn Modal</b-btn><br><br>
                            <b-btn outline onclick="dialogs.confirm(this)">Confirm Modal</b-btn><br><br>

                            <br><b-label divider>Popover</b-label><br>
                            <b-btn outline onclick="dialogs.errorPopover(this)">Error Popover</b-btn><br><br>
                            <b-btn outline onclick="dialogs.confirmDelete(this)">Confirm Delete Popover</b-btn>
                        </div>
                    </div>

                </section>

                <section title="Menu">
                    <h1>Menu</h1>
                    
                    <div class="cols-2">

                        <b-paper compact id="render-menu"></b-paper>

                        <div>
                            <b-btn outline onclick="showMenu(this)">Open Menu</b-btn>
                        </div>
                    </div>

                </section>

                demo-presenter-panel
                demo-presenter-notif
                demo-presenter-tabs

                
                <a-list-view title="List"></a-list-view>

                <b-cal title="Calendar">
                    <div class="cal-event" style="font-size: .8em; line-height: 1em;">
                        A calendar event
                    </div>
                    <div class="cal-event2" style="font-size: .8em; line-height: 1em;">
                        Another event
                    </div>
                </b-cal>
                <script>
                    setTimeout(()=>{
                        // setting the event slots this way so they always show for the current month
                        document.querySelector('.cal-event').slot=moment().set({date:12}).format('YYYY-MM-DD')
                        document.querySelector('.cal-event2').slot=moment().set({date:24}).format('YYYY-MM-DD')
                    },500)
                </script>

                demo-presenter-selection
                demo-presenter-mentions

            </b-tabs-router>
    `}

})

export default customElements.get('demo-presenters')




window.showMenu = async function(el, renderTo=false){

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

    menu = new Menu(menu)

    if( renderTo ){
        el.appendChild(menu.el)
        menu.render()
    }else{
        let selected = await menu.popover(el)
    }

}

// showMenu(document.querySelector('#render-menu'), true)

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
            /* margin: -2em; */
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
            border-bottom: solid 1px var(--theme-bgd-accent);
        }
    `}

    render(){return html`
        ${this.model.label}
    `}

})

customElements.define('tab-divider', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            color: inherit;
            margin: 1em 0 0 0;
            padding: 1em 1.2em .5em;
            border-top: solid 1px rgba(0,0,0,.1);
        }
    `}

    render(){return html`
        <b-label><slot></slot></b-label>
    `}

})


// import formControlDocs from '../presenters/form-control/README.md'
// document.querySelector('#form-control-docs').innerHTML = formControlDocs

// import listDocs from '../presenters/list/README.md'
// document.querySelector('#list-docs').innerHTML = listDocs



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


// document.querySelector('#dialog-success').appendChild(Dialog.success().el)
// document.querySelector('#dialog-warn').appendChild(Dialog.warn({title: 'Ooops', msg: 'That is not supported'}).el)
// document.querySelector('#dialog-error').appendChild(Dialog.error({title: 'Error', msg: 'Something went wrong'}).el)


