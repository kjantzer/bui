import { LitElement, html, css } from 'lit'
import {repeat} from 'lit/directives/repeat.js'

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
            let children = this.childrenResults()
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

    childrenResults(){
        return Array.from(this.children).filter(child=>!child.hasAttribute('ignore'))
    }

    createRenderRoot(){ return this }

    get value(){ return this.termSearch?.value }

    render(){return html`
        ${repeat(this.value, item=>item.key, item=>this.item?.(item))}
        <slot></slot>
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
        let children = this.childrenResults()
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

export default customElements.get('b-term-search-results')