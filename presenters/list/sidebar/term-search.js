import { LitElement, html, css } from 'lit'
import Fuse from 'fuse.js'

// TODO: move this
customElements.define('b-term-search', class extends LitElement{

    static properties = {
        term: {type: String}
    }

    static styles = css`
        :host {
            display: grid;
            position:relative;
        }

        .clear-btn {
            margin: -1em -.5em -1em 0;
        }

        .clear-btn:not(:hover) {
            color: var(--theme-text-accent);
        }

        [falsy] .clear-btn { display: none;}

        form-control {
            --fc-border-radius: 0;
            margin: 0 -.75em -1em;
            --fc-border-color: none;
        }
    `

    set coll(val){
        let oldVal = this.coll

        let data = val

        // NOTE: not sure I want to do this
        if( data instanceof Map ){
            data = Array.from(data).map(([k,v])=>{return {key: k, val: v}})
        }else if( data.models )
            data = data.models

        this.data = data

        this.__coll = val

        this.#setupFuse()
        this.#search()
        this.requestUpdate('coll', oldVal)
    }
    
    get coll(){ return this.__coll}
    // get data(){ return this.coll?.models || this.coll || [] }

    set data(val){ this.__data = val }
    get data(){ return this.__data || [] }

    #setupFuse(){
        this._fuse = new Fuse(this.data, {
			keys: [{
				name: 'label',
				weight: 0.5
			}, {
				name: 'description',
				weight: 0.2
			}],
			minMatchCharLength: 1,
			threshold: 0.4,
			location: 0,
			distance: 100,
		})
    }

    set term(val){
        let oldVal = this.term
        this.__term = val

        // term changed, search again
        if( (val || oldVal) && val != oldVal )
            this.#search()

        this.requestUpdate('term', oldVal)
    }
    
    get term(){ return this.__term }

    #search(){
        this.value = this.term && this._fuse ? this._fuse.search(this.term) : this.data
        this.active = this.active // set again in case values changed
        this.emitChange()
    }

    set value(val){ this.__value = val }
    get value(){ return this.__value || this.data }

    get control(){ return this.$$('form-control', true)}

    render(){return html`
        <form-control material="outline" dense>
            <text-field 
                placeholder="Find filter" 
                .value=${this.term||''}
                @keyup=${this.onKeypress}
                @esckey=${this.cancel}
            ></text-field>

            <b-btn clear icon="cancel" class="clear-btn" @click=${this.clear} slot="suffix"></b-btn>
        </form-control>
    `}

    onKeypress(e){
        // console.log(e.key);

        if( e.key == 'ArrowUp' ) return this.active = 'prev'
        if( e.key == 'ArrowDown' ) return this.active = 'next'
        if( e.key == 'Enter' ) return this.submit(e)

        this.term = e.currentTarget.currentValue
    }

    cancel(){ this.clear() && this.blur() }
    clear(){ this.term = '' }
    focus(opts){ this.control?.focus(opts) }
    blur(){ this.control?.blur() }
    get isFocused(){ return this.control?.control?.isFocused }

    set active(val){

        let oldVal = this.active
        let index = val

        if( typeof index == 'string' )
            index = oldVal ?? -1

        if( val == 'next' ) index +=1
        if( val == 'prev' ) index -= 1

        if( index < 0 ) index = this.value.length-1
        if( index > this.value.length-1 ) index = 0

        if( val != undefined )
            val = index

        this.__active = val

        this.value.map((value,i)=>{
            if( i == val ) value.active = true
            else delete value.active
        })
    
        // console.log('active?', val);
        this.emitChange()
    }
    
    get active(){ return this.__active}

    submit(e){
        this.emitEvent('term-search:submit', {value: this.value, active: this.active, evt: e})
    }

    emitChange(){
        clearTimeout(this._emitChange)
        this._emitChange = setTimeout(()=>{
            this.emitEvent('term-search:changed', {value: this.value, active: this.active})
        })
    }

})

export default customElements.get('b-term-search')


// import { LitElement, html, css } from 'lit'

customElements.define('b-term-search-results', class extends LitElement{

    static styles = css`
        :host {
            display: contents;
        }
    `

    constructor(){
        super()
        this.onChanged = this.onChanged.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
        this.addEventListener('mouseleave', e=>{
            if( this.termSearch )
                this.termSearch.active = undefined
        })

        this.addEventListener('mouseover', e=>{
            let children = Array.from(this.children)
            let index = children.indexOf(e.target)
            if( this.termSearch )
                this.termSearch.active = index
        })

        this.addEventListener('popover:closed', e=>{
            let popOverExists = this.$$('.popoover-open')
            console.log('closed?', this._wasFocused);

            if( this._wasFocused && !popOverExists )
                setTimeout(()=>{
                    this.termSearch?.focus({select: 'all'})
                },100)

            this._wasFocused = false
        })
    }

    createRenderRoot(){ return this }

    render(){return html`
        ${this.termSearch?.value?.map(m=>this.item?.(m))}
    `}

    connectedCallback(){
        super.connectedCallback()
        this.termSearch = this.getRootNode()?.host?.$$('b-term-search')
        if( this.termSearch ){
            this.termSearch.addEventListener('term-search:changed', this.onChanged)
            this.termSearch.addEventListener('term-search:submit', this.onSubmit)
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        if( this.termSearch ){
            this.termSearch.removeEventListener('term-search:changed', this.onChanged)
            this.termSearch.addEventListener('term-search:submit', this.onSubmit)
        }
    }

    onSubmit(e){
        this._wasFocused = this.termSearch.isFocused
        let {active, evt} = e.detail
        let children = Array.from(this.children)
        let el = children[active]
        if( el ){
            el.click(evt)
            this.termSearch?.blur()
        }
    }

    onChanged(){
        this.requestUpdate()
    }

})

// export default customElements.get('b-term-search-results')