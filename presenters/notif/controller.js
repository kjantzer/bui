import { LitElement, html, css } from 'lit'

const NotifControllers = {}

customElements.define('b-notifs', class extends LitElement{

    // createRenderRoot(){ return this }

    static get(name='main'){

        if( name == 'main' && !NotifControllers[name] ){
            let controller = document.createElement('b-notifs')
            controller.setAttribute('name', 'main')
            document.body.appendChild(controller)
            NotifControllers[name] = controller
        }

        return NotifControllers[name]
    }

    get name(){
        return this.hasAttribute('name') ? this.getAttribute('name') : undefined
    }

    constructor(){
        super()

        if( this.name ){
            if( NotifControllers[this.name] )
                console.warn('A `b-notifs` controller already exists with the name: ', this.name)
            else
                NotifControllers[this.name] = this
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        if( this.name )
            delete NotifControllers[this.name]
    }

    connectedCallback(){
        super.connectedCallback()
        if( this.name && !NotifControllers[this.name] )
            NotifControllers[this.name] = this
    }

    static get styles(){return css`
        :host {
            display: block;
            pointer-events: none;
            
            overflow: hidden;
            position:absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1200;
            --padding: var(--b-notif-padding, 1em);
        }

        :host([name="main"]) {
            position: fixed;
            top: env(safe-area-inset-top);
            left: env(safe-area-inset-left);
            bottom: env(safe-area-inset-bottom);
            right: env(safe-area-inset-right);
        }

        @media (max-width:699px), (max-height: 699px) {
            :host([name="main"]) {
                position: fixed;
                top: env(safe-area-inset-top);
                left: env(safe-area-inset-left);
                bottom: env(safe-area-inset-bottom);
                right: env(safe-area-inset-right);
            }
        }

        slot {
            position: absolute;
            display: flex;
        }

        slot[name="top"],
        slot[name="bottom"] {
            width: 100%;
            align-items: center;
        }

        slot[name*="top"] {
            top: 0;
            flex-direction: column;
            padding-top: var(--padding);
        }

        slot[name*="bottom"] {
            bottom: 0;
            flex-direction: column-reverse;
            padding-bottom: var(--padding);
        }

        slot[name*="left"] {
            left: 0;
            padding-left: var(--padding);
            align-items: flex-start;
        }

        slot[name*="right"] {
            right: 0;
            padding-right: var(--padding);
            align-items: flex-end;
        }

        @media (max-width:699px) {
            slot {
                padding: 0 !important;
                position: static !important;
                --b-notif-width: 100%;
            }

            .top {
                position: absolute;
                top: 0;
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: var(--padding);
                box-sizing: border-box;
            }

            .bottom {
                position: absolute;
                bottom: 0;
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: var(--padding);
                box-sizing: border-box;
            }
        }
    `}

    render(){return html`
        <div class="bottom">
            <slot name="bottom-left"></slot>
            <slot name="bottom"></slot>
            <slot name="bottom-right"></slot>
        </div>

        <div class="top">
            <slot name="top-left"></slot>
            <slot name="top"></slot>
            <slot name="top-right"></slot>
        </div>
        
    `}

})

export default customElements.get('b-notifs')