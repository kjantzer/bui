import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/menu/README.md'
import Menu from 'bui/presenters/menu'

customElements.define('demo-presenter-menu', class extends View{

    static get title(){ return 'Menu' }

    get docs(){ return docs }


    renderContent(){ return html`

        <b-btn outline onclick="showMenu(this)">Open Menu</b-btn>

        <br><br>
        <h2>Documentation</h2>
    `}

})

export default customElements.get('demo-presenter-menu')

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
        console.log(selected);
        
    }

}