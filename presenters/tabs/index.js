import { LitElement, html, css } from 'lit-element'
import Menu from '../menu'
import TabViews from './views'
import TabView from './view'
import debounce from 'lodash/debounce'

customElements.define('b-tabs', class extends LitElement {

    static get properties(){return {
        key: {type: String, reflect: true},
        layout: {type: String, reflect: true},
        singlemenu: {type: Boolean, reflect: true}
    }}

    constructor(){
        super()
        this.singlemenu = false
        this.key = ''
        this.layout = 'top'

        this._resizeHandler = debounce(()=>{
            this.singlemenu = this.shouldBeSingleMenu
        }, 250)
    }

    setupMutationObserver(){
        if( this.mutationObserver ) return
        
        let setupTS = new Date().getTime()
        
        // when nodes are added/removed, update the "views" object
        this.mutationObserver = new MutationObserver(mutations=>{

			let needsUpdated = false
            // to support lit-html ${?:}, dont set active unless view has been setup for a second or more
            let makeActive = (new Date().getTime() - setupTS) > 1000

            mutations.forEach(mut=>{

                if( mut.addedNodes ){
                    this.views.add(mut.addedNodes, {makeActive})
                    needsUpdated = true
                }

                if( mut.removedNodes ){
                    this.views.remove(mut.removedNodes)
                    needsUpdated = true
                }

            })

            if( needsUpdated ){
                this.active = this.views.active
                this.update()
            }
            
		});

		this.mutationObserver.observe(this, {attributes: false, childList: true, subtree: false});
    }

    // this breaks down when last item is hidden
    get shouldBeSingleMenu(){
        if( this.offsetWidth == 0 ) return false
        let menuItems = this.shadowRoot.querySelectorAll('.tab-bar-item')
        let last = menuItems[menuItems.length-1]
        if( !last ) return false
        return last.offsetLeft+last.offsetWidth >= this.offsetWidth || last.offsetTop+last.offsetHeight >= this.offsetHeight
    }

    get views(){ 

        if( !this.__views ){
            this.__views = new TabViews(this.key, this.childNodes)

            // return views before setting "active"
            // fixes timing issue with rendering custom tab bar
            setTimeout(()=>{
                this.active = this.getAttribute('active') || this.views.active || this.views.first
            })

            this.setupMutationObserver()
        }    
        
        return this.__views
    }

    static get styles(){return css`
        :host {
            position: relative;
            display: grid;
            flex: 1;
            min-height: 0;

            --menuBgd: none;
            --menuFontSize: 1em;
            --contentPadding: var(--view-gutter, 2em);
            --menuItemPadding: .75em 1em;
            --menuItemRadius: 4px;
            --inactiveColor: var(--b-tabs-inactive-color, rgba(0,0,0,.4));
            --activeColor:  var(--b-tabs-active-color, inherit);
            --border-color: var(--b-tabs-border-color, rgba(0, 0, 0, 0.1));
            --contentBgd: none;
            --contentShadow: none;
            --contentRadius: 0;
        }

        .tab-bar {
            display: flex;
            font-size: var(--menuFontSize);
            min-width: 0;
            overflow: hidden;
            background: var(--menuBgd);
        }

        .tab-bar-item {
            padding: var(--menuItemPadding);
            cursor: pointer;
            box-sizing: border-box;
            color: var(--inactiveColor);
        }

        .tab-bar-item[active] {
            color: var(--activeColor)
        }

        :host(:not([singlemenu])) .single-menu {display: none;}
        :host([singlemenu]) .tab-bar-item:not(.single-menu) {display: none;}

        :host([sticky]) {
            --menuBgd: #fff;
        }
        
        :host([sticky]) header {
            position: sticky;
            top: 0px;
            z-index: 1000;
        }

        :host([layout="top"]) { grid-template-rows: auto 1fr; }
        :host([layout="bottom"]) { grid-template-rows: 1fr auto; }
        :host([layout="left"]) { grid-template-columns: auto 1fr; }
        :host([layout="right"]) { grid-template-columns: 1fr auto; }

        :host([layout="left"]) .tab-bar,
        :host([layout="right"]) .tab-bar {
            flex-direction: column;
        }

        :host([layout="bottom"]) .tab-bar,
        :host([layout="right"]) .tab-bar {
            order: 2;
        }

        :host([layout="top"]) .tab-bar { border-bottom: solid 1px var(--border-color); }
        :host([layout="bottom"]) .tab-bar { border-top: solid 1px var(--border-color); }
        :host([layout="left"]) .tab-bar { border-right: solid 1px var(--border-color); }
        :host([layout="right"]) .tab-bar { border-left: solid 1px var(--border-color); }

        :host([layout="top"]) .tab-bar-item { border-bottom: solid 2px transparent; }
        :host([layout="bottom"]) .tab-bar-item { border-top: solid 2px transparent; }
        :host([layout="left"]) .tab-bar-item { border-right: solid 2px transparent; }
        :host([layout="right"]) .tab-bar-item { border-left: solid 2px transparent; }

        :host([layout="top"]) .tab-bar-item:hover { border-bottom-color: currentColor; }
        :host([layout="bottom"]) .tab-bar-item:hover { border-top-color: currentColor; }
        :host([layout="left"]) .tab-bar-item:hover { border-right-color: currentColor; }
        :host([layout="right"]) .tab-bar-item:hover { border-left-color: currentColor; }

        :host([layout="top"]) .tab-bar-item[active] { border-bottom-color: currentColor; }
        :host([layout="bottom"]) .tab-bar-item[active] { border-top-color: currentColor; }
        :host([layout="left"]) .tab-bar-item[active] { border-right-color: currentColor; }
        :host([layout="right"]) .tab-bar-item[active] { border-left-color: currentColor; }

        @media (max-width: 550px) {

            :host([layout="left"]),
            :host([layout="right"]) {
                grid-template-columns: none;
                grid-template-rows: auto 1fr;
            }

            :host([layout="left"]) .tab-bar,
            :host([layout="right"]) .tab-bar {
                flex-direction: row;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                border-bottom: solid 1px rgba(0,0,0,.1);
            }

            :host([layout="left"]) .tab-bar-item { border-right: none; }
            :host([layout="right"]) .tab-bar-item { border-left: none; }

            :host([layout="left"]) .tab-bar-item, 
            :host([layout="right"]) .tab-bar-item {
                border-bottom: solid 2px transparent;
                flex-shrink: 0;
            }

            :host([layout="left"]) .tab-bar-item:hover, 
            :host([layout="right"]) .tab-bar-item:hover { border-bottom-color: currentColor; }

            :host([layout="left"]) .tab-bar-item[active], 
            :host([layout="right"]) .tab-bar-item[active] { border-bottom-color: currentColor; }
        }

        /*
            Slotted Content
        */
        slot.content {
            display: flex;
            background: var(--contentBgd);
            box-shadow: var(--contentShadow);
            border-radius: var(--contentRadius);
            overflow: var(--overflow, auto);
        }

        .content::slotted(*) {
            flex: 1;
            align-self: flex-start;
            max-height: 100%;
            box-sizing: border-box;
        }
        
        /* dont add padding to custom elements */
        .content::slotted(.padded),
        .content::slotted(div),
        .content::slotted(section) {
            padding: var(--contentPadding);
        }

        .content::slotted([hidden]) {
            display: none !important;
        }
        
        /*
        THEME: root-tabs
        */
        :host(.root-tabs) {
            --activeColor: inherit;
            --contentBgd: #fff;
            --contentShadow: rgba(0,0,0,.2) 0 0 3px;
            --menuFontSize: 1.1em;
            --menuItemPadding: .65em 1em;
        }

        :host(.root-tabs) slot.content {
            border-radius: 4px 0 0 0;
        }

        :host(.root-tabs) .tab-bar {
            border: none !important;
            padding-left: .35em;
            padding-top: .25em;
            z-index: 1;
        }

        :host(.root-tabs[layout="top"]) .tab-bar { padding: .5em 0 0 .5em; }
        :host(.root-tabs[layout="bottom"]) .tab-bar { padding: 0 0 .5em .5em; }
        :host(.root-tabs[layout="left"]) .tab-bar { padding: .5em 0 0 .5em; }
        :host(.root-tabs[layout="right"]) .tab-bar { padding: .5em .5em 0 0; }

        :host(.root-tabs) .tab-bar-item {
            border: solid 1px transparent;
        }

        :host(.root-tabs[layout="top"]) .tab-bar-item {
            border-bottom: none !important;
            border-radius: var(--menuItemRadius) var(--menuItemRadius) 0 0;
        }

        :host(.root-tabs[layout="bottom"]) .tab-bar-item {
            border-top: none !important;
            border-radius: 0 0 var(--menuItemRadius) var(--menuItemRadius);
        }

        :host(.root-tabs[layout="left"]) .tab-bar-item {
            border-right: none !important;
            border-radius: var(--menuItemRadius) 0 0 var(--menuItemRadius);
        }

        :host(.root-tabs[layout="right"]) .tab-bar-item {
            border-left: none !important;
            border-radius: 0 var(--menuItemRadius) var(--menuItemRadius) 0;
        }

        :host(.root-tabs) .tab-bar-item:hover:not([active]) {
            border-color: rgba(0,0,0,.1);
            color: rgba(0,0,0,.5);
        }

        :host(.root-tabs) .tab-bar-item[active] {
            background: var(--contentBgd);
            /* border: solid 1px rgba(0,0,0,.1); */
            box-shadow: rgba(0,0,0,.2) 0 0 3px;
        }
    `}

    renderTabBar(){

        if( ['none', 'false'].includes(this.getAttribute('tab-bar')) )
            return html`<div></div>`

        if( this.getAttribute('tab-bar') ){

            if( !this.__customTabBar ){
                
                let TabBar = customElements.get(this.getAttribute('tab-bar'))
                if( !TabBar ) return console.error(`Tabs: ${this.getAttribute('tab-bar')} does not exist`)

                this.__customTabBar = new TabBar()
                this.__customTabBar.host = this
                this.__customTabBar.model = this.model
                this.__customTabBar.views = this.views
                this.__customTabBar.onMenuClick = this.menuClick.bind(this)
                this.__customTabBar.classList.add('tab-bar')
                this.__customTabBar.part = 'tab-bar'
                this.__customTabBar.innerHTML = /*html*/`
                    <span slot="menu:before"><slot name="menu:before"></slot></span>
                    <span slot="menu:after"><slot name="menu:after"></slot></span>
                `
            }else{
                this.__customTabBar.update()
            }

            return this.__customTabBar

        }else{

            return html`
            <header class="tab-bar" part="tab-bar">
                <slot name="menu:before"></slot>
                <div class="tab-bar-item single-menu" active @click=${this.popoverMenu}>
                    <b-icon name="menu"></b-icon>
                    ${this.views.active?this.views.active.title:''}
                </div>
                ${this.views.map(v=>v.render(this.menuClick))}
                <slot name="menu:after"></slot>
            </header>`
        }
    }

    render(){return html`
        ${this.renderTabBar()}
        <slot class="content"></slot>
        <slot name="empty">
            <b-empty-state ?hidden=${this.views.size>0}>No views</b-empty-state>
        </slot>
    `}

    async popoverMenu(e){

        let selected = await new Menu(this.views.map(v=>{
            return {label: v.title, val: v}
        })).popover(e.target)

        if( selected )
            this.active = selected.val
    }

    menuClick(e){
        let oldVal = this.active

        if( !e.currentTarget.tabView ){
            return console.error(`Tabs: tab menu items must have .tabView set`)
        }

        this.dispatchEvent(new CustomEvent('menu-clicked',{
            detail: {
                tabView: e.currentTarget.tabView,
                oldTabView: this.views.get(oldVal)
            },
            bubbles: false, 
            composed: true
        }))

        this.active = e.currentTarget.tabView

        if( this.active != oldVal )
        this.dispatchEvent(new CustomEvent('active-changed',{
            detail: {tabView: this.views.active},
            bubbles: false, 
            composed: true
        }))
    }

    onModelChange(){

        // once a model has been set on the tabs (even if setting to null)
        // we will then begin propagating the model to the tab views
        this._propagateModel = true

        if( this.__views )
            this.views.active.view.model = this.model
    }

    get active(){
        return this.views && this.views.active && this.views.active.id
    }

    set active(val){
        this.views.active = val
        this.update()
        
        let activeTab = this.views.active

        if( !activeTab ) return

        let view = activeTab.view

        this.setAttribute('active', activeTab.id)

        if( this._propagateModel )
            view.model = this.model

        if( view.parentElement != this)
            this.appendChild( view )
    }

})

export default customElements.get('b-tabs')