import { LitElement, html, css } from 'lit-element'
import Panel from '../panel'
import Notif from '../notif'
import '../../helpers/lit-element/shared'
import device from '../../util/device'
import mobileAsyncFocus from '../../util/mobileAsyncFocus'
import './result'
import './empty-view'
import Coll from './models'

export default class extends LitElement{

    open(){

        /* 
            We will focus the input "onOpen", but iOS (and maybe android?)
            wont focus and open keyboard async (after the tap is over)
        */
        if( device.isiOS )
            mobileAsyncFocus(this)

        this.panel = this.panel || new Panel(this, {
            title: 'Search',
            anchor: device.isMobile ? 'top': 'center',
            closeOnEsc: true,
            width: device.isMobile ? '100%' :'600px',
            height: device.isMobile ? '50%' : '500px',
            type: 'search-popup'
        })

        this.panel.open()
    }

    static get properties(){ return {
        fetching: {type: Boolean, reflect: true},
        url: {type: String, reflect: true},
        placeholder: {type: String, reflect: true},
        minTermLength: {type: Number},
        typeDelay: {type: Number}
    }}

    constructor(){
        super()
        this.fetching = false
        this.minTermLength = 3
        this.typeDelay = 400

        this.key = 'b-search-popup'
        this.placeholder = 'What are you looking for?'
        this.url = '/api/search'

        this.emptyView = 'b-search-popup-empty-results'
        this.resultView = 'b-search-popup-row'
        this.filters = {
            search: {data: null}
        }
    }

    get coll(){
        return this.__coll = this.__coll || new Coll(this.url)
    }

    static get styles(){return css`
        :host {
            display: grid;
            height: 100%;
            position:relative;
            grid-template-rows: auto 1fr;
        }

        .searchbox {
            font-size: 1.2em;
            padding: 1rem;
            display: block;
            border-bottom: solid 1px var(--theme-bgd-accent);
        }

        @media (min-width: 699px) {
            .searchbox {
                font-size: 1.6em;
            }
        }

        .searchbox [name="search"]{
            margin-right: .5rem;
            transition: 0;
            transition-delay: 300ms;
        }

        text-field[empty] ~ [name="cancel-circled"] {
            display: none;
        }

        /* increase hit size */
        .searchbox [name="cancel-circled"]{
            padding: .5em;
            margin: -.5em;
        }

        .searchbox [name="cancel-circled"]:not(:hover) {
            opacity: .5
        }

        .searchbox b-spinner {
            /* --size: 1em; */
            position: absolute;
            z-index: 100;
            /* background: var(--theme-bgd); */
            visibility: hidden;
            transition: 0;
            transition-delay: 300ms;
        }

        /* tranition delay is added to keep the spinner from 
            quickly hiding and reshowing
        */
        :host([fetching]) .searchbox  b-spinner { visibility: visible; transition-delay: 0ms; }
        :host([fetching]) .searchbox [name="search"] { visibility: hidden; transition-delay: 0ms; }

        b-list {
            grid-template-rows: auto 1fr auto auto;
        }

        b-list::part(toolbar) {
            order: 3;
            box-shadow: none;
            border-top: solid 1px var(--theme-bgd-accent);
        }

        b-list::part(list){
            padding: .5em;
        }
        
        b-list::part(row) {
            padding: .5em;
            box-sizing: border-box;
            border-radius: 5px;
        }

        b-list::part(row).active {
            background-color: red;
        }

    `}

    render(){return html`
        
        <header>

            <form-control show="prefix" class="searchbox">
                <text-field slot="control"
                    placeholder="${this.placeholder}"
                    @keyup=${this.onKeyUp}
                    @change=${this.onChange}
                ></text-field>
                <b-icon name="search" slot="prefix"></b-icon>
                <b-icon name="cancel-circled" slot="suffix" @click=${this.clear}></b-icon>
                <b-spinner slot="prefix"></b-spinner>
            </form-control>

        </header>

        <b-list
            key="${this.key}"
            empty="${this.emptyView}"
            row="${this.resultView}"
            .filters=${this.filters}
            .coll=${this.coll}
            @select-result=${this.selectResult}
            @go-to-result=${this.goToResult}
        >
        
            <span slot="toolbar:refresh"></span>
            <span style="display: none;" slot="spinner"></span>

            ${device.isMobile?html`
                <b-btn slot="toolbar:after" @click=${this.close} lg color="theme">Done</b-btn>
            `:html`
                <b-btn slot="toolbar:after" @click=${this.enlarge} icon="resize-full" text></b-btn>
            `}

        </b-list>
    `}

    close(){
        this.panel&&this.panel.close()
    }

    firstUpdated(){
        this.fc = this.shadowRoot.querySelector('form-control')
        // window.addEventListener('focus-'+this.key, this.focus.bind(this))
    }

    focus(){
        this.fc.focus()
        this.fc.control.select()
    }

    blur(){
        this.fc.blur()
    }

    clear(){
        this.fc.value = ''
        this._term = ''
        this.coll.term = ''
        this.coll.reset()
        this.list.reload()
        this.focus()
    }

    onOpen(){
        this.focus()
    }

    // TODO: use panel `onKeyUp` option so we dont have to be focused in the search box
    onKeyUp(e){
        let val = e.currentTarget.currentValue 
        let metaKey = e.metaKey || e.ctrlKey || e.altKey

        if( e.key == 'Enter' && device.isMobile )
            return this._search(val)

        if( e.key == 'Enter' )
            return this.goToSelected(e)
        
        if( metaKey && ['ArrowUp', 'ArrowDown'].includes(e.key) )
            return this.enlarge()

        if( e.key == 'ArrowDown' )
            return this.selectNext()
        
        if( e.key == 'ArrowUp' )
            return this.selectPrev()

        this._search(val)
    }

    _selectResult(result, {scrollTo=true}={}){
        let active = this.list.$$('[part="row"][active]')
        
        if( result == 'first' )
            result = this.list.$$('[part="row"]')
        else if( result == 'next' )
            result = active&&active.nextElementSibling
        else if( result == 'prev' )
            result = active&&active.previousElementSibling

        if( result ){
            active && active.removeAttribute('active')
            result.setAttribute('active', '')
            
            if( scrollTo )
                result.scrollIntoViewIfNeeded(false)
        }
    }

    selectResult(e){ this._selectResult(e.detail, {scrollTo:false}) }
    selectNext(){ this._selectResult('next') }
    selectPrev(){ this._selectResult('prev') }

    goToSelected(e){
        let active = this.list.$$('[part="row"][active]')
        
        if( !active ) return
        let metaKey = e && (e.metaKey || e.ctrlKey)
        this.goTo(active.model, metaKey)
    }

    goToResult(e){
        this._selectResult(e.detail)
        this.goToSelected(e)
    }

    goTo(selected, metaKey){
        Notif.alert('Cannot open yet')
    }

    enlarge(){
        if( !this.panel ) return

        // remember what the initial panel height was
        if( !this.__initialPanelHeight )
            this.__initialPanelHeight = this.panel.height
        
        this.panel.height = this.panel.height == '100%' ? this.__initialPanelHeight : '100%'
    }

    _search(val){

        // term didnt' change, no reason to fetch results again
        if( val == this._term ) return

        this._term = val

        this.fetching = false
        clearTimeout(this._fetchDelay)

        if( !this._term ) return this.clear()

        if( this._term.length < this.minTermLength) return

        // delay fetching in case user types another character
        this.fetching = true
        this._fetchDelay = setTimeout(this.fetchResults.bind(this), this.typeDelay)
    }

    async fetchResults(){
        
        this.coll.term = this._term
        await this.list.refresh()
        this.fetching = false
        
        this._selectResult('first')

        if( this.coll.length == 1 && this.shouldAutoOpen ){
            this.goToSelected()
        }
    }
       
    
    get shouldAutoOpen(){ return true }

    static bindShortcut(key='k'){

        if( typeof key == 'string' )
            key = [key]

        let shouldOpen = function(e){
            return key.includes(e.key) && (e.metaKey || e.ctrlKey)
        }

        if( typeof key == 'function' )
            shouldOpen = key

        window.addEventListener('keydown', e=>{
            if( shouldOpen(e) ){
                e.preventDefault()
                this.shared.open()
            }
        })

    }

}