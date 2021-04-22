import { LitElement, html, css } from 'lit'
import View from './view'
import docs from 'bui/presenters/panel/README.md'
import Panel, {Modal} from 'bui/presenters/panel'
import Menu from 'bui/presenters/menu'
import router from 'bui/router'

customElements.define('demo-presenter-panel', class extends View{

    static get title(){ return 'Panel' }

    static get styles(){return [super.styles, css`
        b-panels {
            z-index: 1000;
        }
    `]}

    get docs(){ return docs }


    renderContent(){ return html`
        <b-panels name="inset"></b-panels>

        
        <b-paper overshadow>
            <b-btn text view="view-1" @click=${e=>openView(e)}>Default Panel view</b-btn>
            <b-btn text view="view-2-small" @click=${e=>openView(e)}>Custom sizing and anchor</b-btn>
            <b-btn text view="view-3" @click=${e=>openView(e)}>Inside another view</b-btn>
            <b-btn text view="view-animate" @click=${e=>openView(e)}>Animate</b-btn>
            <b-btn text @click=${openModalPanel}>Modal type panel</b-btn>
        </b-paper>

        <br><br>
        <h2>Documentation</h2>
    `}

})

export default customElements.get('demo-presenter-panel')

Panel.register('view-1', ()=>html`
    <div style="display: grid; grid-template-rows: auto 1fr;">
    <b-panel-toolbar shadow>
        <b-btn slot="right" text>Btn</b-btn>
        <span slot="left">
            <b-btn outline>Btn</b-btn>
        </span>
        <span slot="middle"> <b-label badge="red" style="vertical-align: top;" dot></b-label></span>
    </b-panel-toolbar>
    <main style="flex:1">
        <b-tabs layout="left">
            <div title="View 1">Try using your browser's back button</div>
            <div title="View 2">View 2 content</div>
        </b-tabs>
    </main>
    </div>
`, {title: 'View 1'})


customElements.define('view-two', class extends LitElement{

    static get styles(){return css`
        main {
            padding: 1em;
            overflow: auto;
        }
    `}

    render(){return html`
        <b-panel-toolbar noshadow>
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
            for( let key in selected.opts ){
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

customElements.define('view-animate', class extends LitElement{

    static get styles(){return css`
        main {
            padding: 1em;
            overflow: auto;
        }
    `}

    render(){return html`
        <b-panel-toolbar  noshadow></b-panel-toolbar>
        <main>
            <b-btn @click=${this.animate}>bounce</b-btn>
            <b-btn @click=${this.animate}>shake</b-btn>
        </main>
    `}

    animate(e){
        let fn = e.target.innerText
        this.panel[fn]()
    }
})

Panel.register('view-animate', 'view-animate', {
    title: 'View Animate',
    width: '600px',
    height: '400px',
    anchor: 'center'
})


Panel.register('view-3', 'view-two', {
    title: 'View 3',
    controller: 'inset',
    width: '400px',
    anchor: 'right'
})

window.openModalPanel = ()=>{
    Modal(()=>html`
        <b-embed url="https://www.youtube.com/watch?v=sK1ODp0nDbM"></b-embed>
    `, {closeBtn: true, width: '60vw'})
}


window.openView = e=>{
    e.preventDefault()
    router.goTo(e.currentTarget.getAttribute('view'))
}