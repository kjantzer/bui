import { LitElement, html, css } from 'lit'
import {ifDefined} from 'lit/directives/if-defined.js'
import Fuse from 'fuse.js'
import './results'

customElements.define('b-term-search', class extends LitElement{

    static properties = {
        material: {type: String},
        term: {type: String},
        icon: {type: String},
        placeholder: {type: String}
    }

    static styles = css`
        :host {
            display: grid;
            position:relative;
            flex-shrink: 0;
        }

        .clear-btn {
            margin: -1em -.5em -1em 0;
        }

        .clear-btn:not(:hover) {
            color: var(--theme-text-accent);
        }

        [falsy] .clear-btn { visibility: hidden; pointer-events: none;}

        form-control {
            --padX: .5em;
        }

        text-field {
            display: grid;
            align-items: center;
        }

    `

    set coll(val){
        let oldVal = this.coll

        let data = val

        // NOTE: not sure I want to do this? shoud code that gives coll do this?
        if( data instanceof Map ){
            data = Array.from(data).map(([k,v])=>{
                return {
                    key: k, 
                    val: v,
                    label: v?.label,
                    description: v?.description
                }
            })
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
        <form-control material=${ifDefined(this.material)} show="prefix" part="control">
            <text-field part="text-field"
                placeholder=${this.placeholder||'Find filter'} 
                .value=${this.term||''}
                @keyup=${this.onKeypress}
                @esckey=${this.cancel}
            ></text-field>
            
            <slot name="prefix" slot="prefix"></slot>
            
            ${this.icon?html`<b-icon slot="prefix" name=${this.icon}></b-icon>`:''}

            <slot name="suffix" slot="suffix"></slot>

            <b-btn clear icon="cancel" class="clear-btn" part="clear-btn" @click=${this.clear} slot="suffix"></b-btn>

        </form-control>
    `}

    onKeypress(e){
        // console.log(e.key);

        if( ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && !e.ctrlKey && !e.metaKey ){
            e.preventDefault()
            e.stopPropagation()
        }

        if( e.key == 'ArrowUp' ) return this.active = 'prev'
        if( e.key == 'ArrowDown' ) return this.active = 'next'
        if( e.key == 'ArrowLeft' ) return this.active = 'prev'
        if( e.key == 'ArrowRight' ) return this.active = 'next'
        if( e.key == 'Enter' ) return this.submit(e)

        this.term = e.currentTarget.currentValue
    }

    cancel(e){ 
        if( !e.currentTarget.value )
            this.emitEvent('hide')
        else{
            this.clear()
            this.focus()
        }
    }
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


