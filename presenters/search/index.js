import { LitElement, html, css } from 'lit-element'
import Menu from '../menu'
import '../form/control'
import '../form/controls/text-field'
import '../../elements/btn'
import '../../elements/spinner'
import ResultView from './result'
import device from '../../util/device'

customElements.define('b-search', class extends LitElement{

    resultsView(data){ return new ResultView(data) }

    goTo(selected, metaKey){
        console.log('Go to:', selected);
    }

    static get properties(){ return {
        fetching: {type: Boolean, reflect: true},
        active: {type: Boolean, reflect: true},
        url: {type: String, reflect: true},
        placeholder: {type: String, reflect: true},
        suffix: {type: String},
        minTermLength: {type: Number},
        typeDelay: {type: Number}
    }}

    constructor(){
        super()
        this.fetching = false
        this.active = false
        this.placeholder = 'Search...'
        this.url = '/api/search'
        this.suffix = ''
        this.minTermLength = 3
        this.typeDelay = 200
    }

    get key(){
        let key = 'search'
        if( this.name )
            key += '-'+this.name
        return key
    }

    set active(val){
        let oldVal = this.active
        this.__active = Boolean(val)

        if( this.active )
            document.body.classList.add(this.key+'-active')
        else
            document.body.classList.remove(this.key+'-active')

        window.dispatchEvent(new CustomEvent(this.key+'-active', {
            detail:{active:this.active}
        }))

        this.requestUpdate('active', oldVal)

        this.toggleHistory()
    }

    toggleHistory(){

        if( this.resultsMenu ) return

        if( !this.active && this._historyMenu ){

            setTimeout(()=>{
                this._historyMenu.close()
            })

        }else if( this.active ){

            let history = this.historyMenu

            if( !history ) return

            this._historyMenu = new Menu(history, {
                search: false,
                onSelect: (selected)=>{
                    this.goTo(selected)
                }
            })
            
            this._historyMenu.modal({
                width: '600px',
                height: 'auto',
                anchor: 'top',
                type: this.key+'-history',
                // onBackdropClick: this.clear.bind(this),
                disableOverscrollClose: true
            })

        }
    }

    get active(){
        return this.__active
    }

    static get styles(){return css`
        :host {
            display: block;
            --min-w: 590px;
            min-width: var(--min-w);
            z-index: 10;
        }

        form-control {
            width: 100%;
            --radius: 30px;
            --bgd: var(--theme-bgd);
            --placeholderColor: rgba(var(--theme-text-rgb),.4);
            --padY: .5em;
            margin: 0;
            padding: 0;
        }

        @media (max-width: 599px) {

            :host {
                --min-w: 140px;
            }

            form-control:not([empty]),
            form-control:focus-within {
                position: absolute;
                width: auto;
                bottom: .45em;
                left: .45em;
                right: .45em;
            }
        }

        text-field:not([empty]) ~ [name="back-in-time"] {
            display: none;
        }

        text-field[empty] ~ [name="cancel-circled"] {
            display: none;
        }

        [name="search"] {
            margin-right: .5em;
            transition: 0;
            transition-delay: 300ms;
        }

        /* increase hit size */
        [name="cancel-circled"]{
            padding: .5em;
            margin: -.5em;
        }

        [name="cancel-circled"]:hover {
            color: #fff;
        }

        b-spinner {
            position: absolute;
            visibility: hidden;
            transition: 0;
            transition-delay: 300ms;
        }

        /* tranition delay is added to keep the spinner from 
            quickly hiding and reshowing
        */
        :host([fetching]) b-spinner { visibility: visible; transition-delay: 0ms; }
        :host([fetching]) [name="search"] { visibility: hidden; transition-delay: 0ms; }
    `}

    render(){return html`
        <form-control material="filled" show="prefix">
            <text-field placeholder="${this.placeholder}"
                @keyup=${this.onKeyUp}
                @focus=${this.onFocus}
                @change=${this.onChange}
                @blur=${this.onBlur}></text-field>
            <b-icon name="search" slot="prefix"></b-icon>
            <span slot="suffix">${this.suffix}</span>
            <b-icon name="cancel-circled" slot="suffix" @click=${this.clear}></b-icon>
        </form-control>
    `}

    onChange(e){
        this._search(e.target.value)
    }

    firstUpdated(){
        this.fc = this.shadowRoot.querySelector('form-control')

        window.addEventListener('focus-'+this.key, this.focus.bind(this))
    }

    focus(){
        this.fc.focus()
    }

    blur(){
        this.fc.blur()
        this.clear()
    }

    clear(){
        this.fc.value = ''
        this._term = ''
        this.resultsMenu&&this.resultsMenu.presenter.close()
        this.active = false
    }

    onFocus(){
        document.body.classList.add(this.key+'-focused')
        this.active = true

        /*
            NOTE: recreating the spinner fixes a weird bug on iOS
            where the spin animation would stop/glitch after
            the form-control changed to absolute position
        */
        this._spinner = document.createElement('b-spinner')
        this._spinner.slot = 'prefix'
        this.fc.append(this._spinner)
    }

    onBlur(e){
        document.body.classList.remove(this.key+'-focused')

        // esc key
        if( e.target.value == '' )
            this._term = ''

        if( !this._term )
            this.active = false
        
        this._spinner.remove()
    }

    search(term){
        this.fc.value = term
        this.focus()
        this._search(term)
    }

    onKeyUp(e){
        let val = e.currentTarget.currentValue 
        if( !device.isMobile )
            this._search(val)
    }

    _search(val){

        if( val == this._term ) return
        this._term = val

        this.fetching = false
        clearTimeout(this._fetchDelay)

        if( !this._term ) return this.closeResults()
        if( this._term.length < this.minTermLength) return

        this.fetching = true
        this._fetchDelay = setTimeout(this.fetchResults.bind(this), this.typeDelay)
    }

    closeResults(){
        this.resultsMenu&&this.resultsMenu.presenter&&this.resultsMenu.presenter.close()
        this.resultsMenu = null
    }

    async fetchResults(){

        let term = this._term
        this._fetching = this._term
        
        let url = this.url+this._term

        if( !this._term ){
            this.closeResults()
            return
        }

        this.fetching = true
        let resp = await fetch(url).then(resp=>resp.json())
        this.fetching = false

        let menu = resp.map(data=>{
            return {
                id: data.id,
                type: data.result_type,
                data: data,
                view: this.resultsView(data)
            }
        })

        if( menu.length == 0 )
            menu = [{divider:'No results found'}]
        
        // started fetching something else, dont render these results
        if( this._fetching !== term )
            return

        if( this.resultsMenu ){
            this.resultsMenu.menu = menu
            this.resultsMenu.render()
            return
        }else{
            this.resultsMenu = new Menu(menu, {search: false, autoSelectFirst: true})
        }

        let selected = await this.resultsMenu.modal({
            width: '600px',
            height: 'auto',
            anchor: 'top',
            type: this.key+'-results',
            onBackdropClick: this.clear.bind(this),
            disableOverscrollClose: true
        })

        this.resultsMenu = null

        if( !selected ) return

        let e = window.event || {} // get keyboard event for metakey
        let metaKey = e.metaKey || e.ctrlKey
        this.goTo(selected, metaKey)

        this.clear()
        this.fc.control.blur()
    }

})

export default customElements.get('b-search')