import { LitElement, html, css } from 'lit'

customElements.define('b-tab-bar-pill-bar', class extends LitElement{

    static get styles(){return css`
    
        :host(.tab-bar) {
            display: flex;
            border-bottom: none !important;
            padding: .35em 2em;
        }

        ::slotted(b-btn),
        b-btn {
            --padding: .2em 1.5em .4em;
        }

        .bar {
            display: flex;
            background: var(--theme-bgd-accent);
            border-radius: 1em;
            width: 100%;
            height: 2em;
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
        }

        .bar b-btn:not([active]) {
            --bgdColor: none;
            color: var(--theme-text);
        }
        
        .bar b-btn[active] {
            color: var(--theme-inverse-text);
            font-weight: 500;
        }

        .slider {
            position: absolute;
            height: 1.8em;
            background: var(--theme-gradient);
            border-radius: 1em;
            transition: transform 200ms ease;
            z-index: 0;
            box-shadow: 1px 1px 4px var(--theme-shadow);
        }

        
    `}

    render(){return html`

        <slot name="menu:before"></slot>

        <div class="bar">
            <div class="slider" id="slider"></div>
            ${this.views.map(v=>html`
                ${v.canDisplay?html`

                    <slot name="before:${v.id}"></slot>
                    
                    <b-btn pill icon="${v.icon}" ?active=${v.active} .tabView=${v} @click=${this.onClick}>
                        <span>${v.title}</span>
                    </b-btn>

                    <slot name="after:${v.id}"></slot>
                `:''}
            `)}
        </div>

        <slot name="menu:after"></slot>
    `}

    firstUpdated(){
        this.firstUpdate = true
        this.updateSliderPosition()
    }

    onClick(e){
        this.onMenuClick(e)
        this.updateSliderPosition()
    }

    refresh(){
        setTimeout(()=>{
            this.updateSliderPosition()
        }, 100)
    }

    updateSliderPosition(){
        let activeBtn = this.$$('b-btn[active]')

        if (!activeBtn) 
            this.refresh()

        let slider = this.shadowRoot.getElementById('slider')

        if(activeBtn && slider){

            let rect = activeBtn.getBoundingClientRect()

            let barRect = this.shadowRoot.querySelector('.bar').getBoundingClientRect()

            slider.style.width = `${rect.width}px`

            if(this.firstUpdate){
                slider.style.transition = 'none'
                slider.style.transform = `translateX(${rect.left - barRect.left}px)`
                this.firstUpdate = false
            } else {
                slider.style.transition = 'transform 200ms ease'
                slider.style.transform = `translateX(${rect.left - barRect.left}px)`
            }
        }
    }
})