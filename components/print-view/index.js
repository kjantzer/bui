import { LitElement, html, css } from 'lit'
import Panel from 'panel'
import Menu from 'menu'
import '../../helpers/lit/shared'

customElements.defineShared('b-print-view', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            overflow: auto !important;
        }

        @media print {
            :host{
                display: contents;
            }

            b-panel-toolbar{
                display: none;
            }
        }

        b-panel-toolbar {
            background-color: var(--theme-bgd);
            position: sticky;
            top: 0;
        }

        @media screen {

            :host {
                display: grid;
                height: 100%;
                grid-template-rows: auto 1fr;
            }

            div {
                overflow: auto;
                padding: 1em;
            }

            main {
                width: var(--page-width, 8.5in);
                padding: var(--page-margin, .5in);
                margin: 1em auto;
                box-sizing: border-box;
                box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 60%);
                background: white;
                --theme-text: var(--light-text);
                --theme-text-accent: var(--light-text-accent);
                --theme-text-rgb: var(--light-text-rgb);
                color: black;
            }
        }
    `}

    constructor(){
        super()
        this.customStyles = document.createElement('style');
        document.head.appendChild(this.customStyles);
        // this.onKeydown = this.onKeydown.bind(this)
    }

    async open(models, {
        views,
        view,
        autoPrint=false,
        target,
        align='bottom-end',
        data=null
    }={}){

        if( this.panel && this.panel.isOpen )
            return window.print()
            
        if( !view ){

            let viewMenu = views
            
            if( typeof viewMenu == 'function' )
                viewMenu = viewMenu()

            viewMenu = viewMenu.filter(o=>o).map(v=>{
                return {label: v.name, val: v}
            })

            if( viewMenu.length == 1 )
                view = viewMenu[0].val
            else{

                let selected = false
                if( target )
                    selected = await new Menu(viewMenu).popover(target, {align})
                else
                    selected = await new Menu(viewMenu).modal({title: 'Select Print View', icon: 'print'})

                if( !selected ) return

                view = selected.val
            }
        }

        let View = typeof view == 'string' ? customElements.get(view) : view

        if( !View ) throw Error('wrong view')

        this.view = new View(models)
        this.view.models = models
        this.view.data = data

        let panel = new Panel(this, {
            title: this.view.name||'Print'
        })
        panel.open()

        this.setStyles()

        this.update()

        if( autoPrint )
            setTimeout(()=>{
                window.print()
            },700)
    }

    setStyles(){
        let styles = ''

        if( this.view.pageMargins )
            styles += /*css*/`
                :root { --page-margin: ${this.view.pageMargins}; }
                @page { margin: ${this.view.pageMargins}; }
            `

        if( this.view.pageSize ){
            let [w, h] = this.view.pageSize.split(' ')
            styles += /*css*/`
                :root { --page-width: ${w}; --page-height: ${h} }
                @page { size: ${this.view.pageSize}; }
            `
        }
        
        this.customStyles.innerHTML = styles
    }

    render(){return html`

        <b-panel-toolbar>
            <b-btn color="theme" @click=${this.print} slot="right">Print</b-btn>
        </b-panel-toolbar>

        <div>
            <main>
                ${this.view}
            </main>   
        </div>
        
        <!-- <main>
            page one?
        </main>

        <main>
            page two?
        </main> -->

    `}

    print(){
        window.print()
    }

})

export default customElements.get('b-print-view')