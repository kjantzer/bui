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
            rootMargin: this.getAttribute('rootmargin') || '-25% 0px -25% 0px', // when within middle 50% of list
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
                this.visible.add(row.target)
            else
                this.visible.delete(row.target)
        })

        let visible = Array.from(this.visible)
        let target = this.list.list.scrollTop < this.lastScrollTop ? visible[visible.length-1] : visible[0]
        let model = target?.model

        this.lastScrollTop = this.list.list.scrollTop
        
        if( target )
            this.emitEvent('intersection-changed', {model, target, visible, entries})
    }

})

export default customElements.get('b-list-intersection-observer')