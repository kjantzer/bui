import { LitElement, html, css } from 'lit'

// TODO: separate the animated bgd part to an "animated bgd" element (like: https://motion-primitives.com/docs/animated-background)
customElements.define('b-tab-bar-pill-bar', class extends LitElement{

    static get styles(){return css`
    
        :host(.tab-bar) {
            display: flex;
            border-bottom: none !important;
            width: auto;
            margin: 0 auto;
        }

        ::slotted(b-btn),
        b-btn {
            --padding: .2em 1.5em .4em;
        }

        .bar {
            display: flex;
            flex-wrap: wrap;
            background: var(--theme-bgd-accent);
            border-radius: 1.5em;
            width: 100%;
            padding: .25em;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }

        .bar b-btn{
            --bgdColor: none;
            text-align: center;
            height: 1.8em;
            font-size: 1em;
            font-weight: 350;
            transition-property: all;
            transition-duration: 200ms;
            --borderColor: transparent;
            position: relative;
            z-index: 1;
            background: none;
            --hoverBgdColor: none;
            white-space: nowrap;
            flex-grow: 1;
        }

        .bar b-btn:not([active]) {
            --bgdColor: none;
            color: var(--theme-text);
        }
        
        .bar b-btn[active] {
            color: var(--theme-inverse-text);
            
        }

        .slider {
            position: absolute;
            height: 1.8em;
            background: var(--theme-gradient);
            border-radius: 1em;
            
            z-index: 0;
            box-shadow: 1px 1px 4px var(--theme-shadow);

            transition-duration: 300ms;
            transition-property: all;
            transition-timing-function: cubic-bezier(.4,0,.2,1);
        }
        
    `}

    render(){return html`

        <slot name="menu:before"></slot>

        <div class="bar">
            
            <div class="slider"></div>

            ${this.views.map(v=>html`
                ${v.canDisplay?html`

                    <slot name="before:${v.id}"></slot>
                    
                    <b-btn pill icon="${v.icon}" ?active=${v.active} .tabView=${v} @click=${this.onMenuClick}>
                        <span>${v.title}</span>
                    </b-btn>

                    <slot name="after:${v.id}"></slot>
                `:''}
            `)}
        </div>

        <slot name="menu:after"></slot>
    `}

    updated(){
        this.updateSliderPosition()
    }

    refresh(){
        setTimeout(()=>{
            this.updateSliderPosition()
        }, 100)
    }

    updateSliderPosition(){
        let activeBtn = this.$$('b-btn[active]')
        let slider = this.$$('.slider', true)

        if( !activeBtn )
            return this.refresh()

        if( slider ){
            slider.style.width = activeBtn.clientWidth+'px'
            slider.style.height = activeBtn.clientHeight+'px'
            slider.style.left = activeBtn.offsetLeft+'px'
            slider.style.top = activeBtn.offsetTop+'px'
        }
    }
})