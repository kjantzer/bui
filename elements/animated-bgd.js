/*
    # Animated Bgd

    Animates a background over the active nestec child (can be used for menus, segment controls, etc)

    ```html-preview
    <b-animated-bgd>
        <radio-group segment value=1>
            <radio-btn value=1>Option 1</radio-btn>
            <radio-btn value=2>Option 2</radio-btn>
        </radio-group>
    </b-animated-bgd>
    ```
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-animated-bgd', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            /* set these here so nested children can use them */
            --animated-bgd-text-color: #fff;
            --animated-bgd-duration: 300ms;
            --animated-bgd-timing: cubic-bezier(.4,0,.2,1);
        }

        .bgd {
            position: absolute;
            z-index: 0;

            background: var(--theme-gradient);
            box-shadow: 1px 1px 4px var(--theme-shadow);

            transition-duration: var(--animated-bgd-duration);
            transition-property: all;
            transition-timing-function: var(--animated-bgd-timing);
        }
    `

    constructor(){
        super()
        this.onMutation = this.onMutation.bind(this)
	}

    connectedCallback(){
        super.connectedCallback()

        this.observer ||= new MutationObserver(this.onMutation);
        
        // todo: opts to change?
        this.observeElement = this.children.length == 1 ? this.children[0] : this

        this.observer.observe(this.observeElement, {
            attributes: true,
            attributeFilter: ['active'], // todo: opts to change?
            subtree: true,
            childList: false
        });
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.observer.disconnect()
    }

	onMutation(mutations){

        let active = null

        mutations.forEach(d=>{

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

    updatePos(){
        
        let activeEl = this.active
        let bgd = this.$$('.bgd', true)

        if( !bgd ) return

        // no active, hide bgd
        if( !activeEl ){
            bgd.style.transitionDuration = '0ms'
            bgd.style.width = ''
            bgd.style.height = ''
            bgd.style.transitionDuration = null
            return
        }

        // don't animate when becoming visible
        if( !bgd.style.height ) bgd.style.transitionDuration = '0ms'
            
        // todo: make opt-in?
        let style = window.getComputedStyle(activeEl)
        bgd.style.borderRadius = style.borderRadius

        bgd.style.width = activeEl.clientWidth+'px'
        bgd.style.height = activeEl.clientHeight+'px'
        bgd.style.left = activeEl.offsetLeft+'px'
        bgd.style.top = activeEl.offsetTop+'px'

        bgd.style.transitionDuration = null
    }

})

export default customElements.get('b-animated-bgd')