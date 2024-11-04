/*
    # Animated Bgd

    Animates a background over the active nested child (can be used for menus, segment controls, etc)

    ```html-preview
    <b-animated-bgd color="theme-gradient" shadow>
        <radio-group segment value=1>
            <radio-btn value=1>Option 1</radio-btn>
            <radio-btn value=2>Option 2</radio-btn>
        </radio-group>
    </b-animated-bgd>
    ```

    Use `::part(bgd)` to add additional styles

    #### Props
    - `color` - bgd, inverse, theme, theme-gradient
    - `shadow` - add shadow to the bgd
    - `block` change to block style element

    #### Styles
    - `--animated-bgd-duration`
    - `--animated-bgd-timing`
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-animated-bgd', class extends LitElement{

    static styles = css`
        :host {
            display: inline-grid;
            position:relative;
            /* set these here so nested children can use them */
            --animated-bgd-text-color: var(--theme-text);
            --animated-bgd-bgd-color: var(--theme-bgd-accent);
            --animated-bgd-duration: 300ms;
            --animated-bgd-timing: cubic-bezier(.4,0,.2,1);
        }

        :host([block]) { display: grid; }

        .bgd {
            position: absolute;
            z-index: 0;

            background: var(--animated-bgd-bgd-color);

            transition-duration: var(--animated-bgd-duration);
            transition-property: all;
            transition-timing-function: var(--animated-bgd-timing);
        }

        :host([shadow]) .bgd {
            box-shadow: 1px 1px 4px var(--theme-shadow);
        }

        :host([color="bgd"]) { 
            --animated-bgd-bgd-color: var(--theme-bgd);
        }

        :host([color="inverse"]) { 
            --animated-bgd-bgd-color: var(--theme-inverse-bgd);
            --animated-bgd-text-color: var(--theme-inverse-text);
        }

        :host([color="theme"]) { 
            --animated-bgd-bgd-color: var(--theme);
            --animated-bgd-text-color: #fff;
        }

        :host([color="theme-gradient"]) { 
            --animated-bgd-bgd-color: var(--theme-gradient);
            --animated-bgd-text-color: #fff;
        }
    `

    constructor(){
        super()
        this.onMutation = this.onMutation.bind(this)
        this.onResize = this.onResize.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()

        this.observer ||= new MutationObserver(this.onMutation)
        this.resizeObserver ||= new ResizeObserver(this.onResize)
        
        // todo: opts to change?
        this.observeElement = this.children.length == 1 ? this.children[0] : this

        this.observer.observe(this.observeElement, {
            attributes: true,
            attributeFilter: ['active'], // todo: opts to change?
            subtree: true,
            childList: true
        })

        this.resizeObserver.observe(this.observeElement)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.observer.disconnect()
        this.resizeObserver.unobserve(this.observeElement)
    }

    firstUpdated(){
        if( !this.active )
            this.active = Array.from(this.children).find(el=>el.hasAttribute?.('active'))
    }

    onMutation(mutations){

        let active = null

        mutations.forEach(d=>{

            if( d.type == 'childList' ){
                let _active = Array.from(d.addedNodes).find(el=>el.hasAttribute?.('active'))
                if( _active ) active = _active
            }
            
            if( d.type == 'attributes' 
            && d.target != this.observeElement
            && d.target.hasAttribute(d.attributeName) // this target is "active"
            ){
                active = d.target
            }
        })

        this.active = active
    }

    set active(val){
        let oldVal = this.active
        this.__active = val

        // prevent a bunch of updates in a row
        clearTimeout(this._updatePos)
        this._updatePos = setTimeout(()=>this.updatePos())
        
        // this.requestUpdate('active', oldVal)
    }
    
    get active(){ return this.__active}

    render(){return html`
        <div class="bgd" part="bgd"></div>
        <slot></slot>
    `}

    updatePos({animate=true}={}){
        
        let activeEl = this.active
        let bgd = this.$$('.bgd', true)

        if( !bgd ) return

        clearTimeout(this._onResize)

        // no active, hide bgd
        if( !activeEl ){
            bgd.style.transitionProperty = 'none'
            bgd.style.width = ''
            bgd.style.height = ''
            bgd.style.transitionProperty = null
            return
        }

        // don't animate when becoming visible
        if( animate === false || !bgd.style.height ) bgd.style.transitionProperty = 'none'
            
        let style = window.getComputedStyle(activeEl)
        
        // todo: improve this? (this makes a lot of assumptions)
        if( style.display == 'contents' ){
            activeEl = activeEl.shadowRoot?.children?.[0] || activeEl.children[0]
            style = window.getComputedStyle(activeEl)
        }

        // todo: make opt-in?
        bgd.style.borderRadius = style.borderRadius

        bgd.style.width = activeEl.clientWidth+'px'
        bgd.style.height = activeEl.clientHeight+'px'
        bgd.style.left = activeEl.offsetLeft+'px'
        bgd.style.top = activeEl.offsetTop+'px'

        bgd.style.transitionProperty = null
    }

    onResize(e){
        clearTimeout(this._onResize)
        this._onResize = setTimeout(()=>{
            
            // only update pos if active is still visible
            if( this.active?.checkVisibility() )
                this.updatePos({animate:false})
        },100)
    }

})

export default customElements.get('b-animated-bgd')