import { LitElement, html, css } from 'lit'

customElements.define('b-list-intersection-observer', class extends LitElement{

    visible = new Set()
    lastScrollTop = 0

    constructor(){
        super()
        this.onChange = this.onChange.bind(this)
    }

    get intersectionObserver(){
        let opts = {
            // threshold: 1,
            root: this.list,
            rootMargin: '-25% 0px -25% 0px', // when within middle 50% of list
            ...this.opts||{}
        }

        return this.__intersectionObserver ||= new IntersectionObserver(this.onChange, opts);
    }
    
    get list(){
        if( this.parentElement.tagName !== 'B-LIST' )
            throw new UIWarningError('`b-list-export-btn` must be a direct child of `b-list`')

        return this.parentElement
    }

    connectedCallback(){
        super.connectedCallback()
        this.list.intersectionObserver = this
    }

    observe(){
        return this.intersectionObserver.observe(...arguments)
    }

    unobserve(){
        return this.intersectionObserver.unobserve(...arguments)
    }

    onChange(entries){

        let rows = entries.filter(ent=>ent.target.model)

        rows.map(row=>{
            if( row.isIntersecting )
                this.visible.add(row.target.model)
            else
                this.visible.delete(row.target.model)
        })

        let models = Array.from(this.visible)
        let model = this.list.list.scrollTop < this.lastScrollTop ? models[models.length-1] : models[0]

        this.lastScrollTop = this.list.list.scrollTop
        
        this.emitEvent('intersection-changed', {model, models, entries})
    }

})

export default customElements.get('b-list-intersection-observer')