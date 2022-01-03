import { LitElement, html, css } from 'lit-element'
import '../../elements/empty-state'

customElements.define('b-infinite-list', class extends LitElement {

    createRenderRoot(){ return this }

    // static get styles(){return css`
    //     :host {
    //         display: block
    //     }
    // `}
    
    constructor(){
        super()
        this.pageAt = 0
        this.threshold = 400
    }

    firstUpdated(){
        // after first updating, reset and get content
        let loadContent = this.getAttribute('fetch-on-load') !== 'false'
        this.reset(loadContent)
    }
    
    connectedCallback(){
        super.connectedCallback()
        this.addEventListener('scroll', this.onScroll, true)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.removeEventListener('scroll', this.onScroll, true)
    }

    async reset(andLoadContent=true){
        this.pageAt = 0
        this.scrollTop = 0
        this.prevModel = null
        
        if( andLoadContent )
            await this.getContent({clear:true})
        else
            this.addContent([], {clear:true})
    }

    onScroll(){

        let delta = this.scrollHeight - this.scrollTop - this.offsetHeight
        let down = !this._scrollDelta || delta < this._scrollDelta

        this._scrollDelta = delta

        if( !down || delta == 0 ) return
        
        if( delta <= this.threshold )
            this.getContent()
    }

    async getContent({clear=false}={}){
        
        if( !this.dataSource ) return

        if( this._fetching ) return;

        let pageAt = this.pageAt

        this._fetching = true
        this._fetchFailed = false
        try{
            let models = await this.dataSource.fetch(pageAt)
            this.addContent(models, {clear:clear})
        }catch(err){
            this._fetchFailed = err
            this.addContent([], {clear:clear})
        }
        this._fetching = null

        if( pageAt == 0 ){
            this.dispatchEvent(new CustomEvent('content-changed',{
                detail: {data: this.dataSource},
                bubbles: true, 
                composed: true
            }))
        }

        if( this._fetchFailed )
            throw this._fetchFailed
    }

    // get emptyElement(){return this.getAttribute('empty') || 'b-empty-state'}

    addContent(models, {clear=false}={}){
        
        this.pageAt += models.length

        if( clear )
            this.innerHTML = ''

        if( this.pageAt == 0 ){
            let emptyView = this.empty && this.empty()
            if( emptyView ){
                emptyView.fetchFailed = this._fetchFailed
                this.appendChild(emptyView)
            }
            return 
        }

        models.forEach(model=>{

            let divider = this.divider && this.divider(this.prevModel, model)
            if( divider ){
                this.appendChild(divider)
            }

            let row = this.row && this.row(model)
            if( row ){
                this.appendChild(row)
            }
            
            this.prevModel = model
        })

        setTimeout(this.checkNotEnoughContent.bind(this))
    }

    checkNotEnoughContent(){
        if( this.offsetHeight > 0 && this.scrollHeight <= this.offsetHeight ){
            this.getContent()
        }
    }

})

export default customElements.get('b-infinite-list')