import { LitElement, html, css } from 'lit'
import device from '../../../util/device'

customElements.define('range-slider', class extends LitElement{

    static get properties(){return {
        min: {type: Number},
        max: {type: Number},
        step: {type: Number},
        range: {type: Boolean, reflect: true},
        value: {type: Object},
        label: {type: String, reflect: true}
    }}

    constructor(){
        super()
        this.mouseUp = this.mouseUp.bind(this)
        this.mouseMove = this.mouseMove.bind(this)

        this.label = 'auto'
        this.range = false
        this.min = 0
        this.max = 100
        this.step = 1

        this.valMin = 0
        this.valMax = 0
        this.value = [0,0]
    }

    firstUpdated(){
        this.addEventListener('keydown', this._onKeyDown)
		
        // respond to the "thumbs" gaining focus
		this.shadowRoot.addEventListener('focus', e=>{

            if( e.target.hasAttribute('max') )
                this._active = 'max'
            
            if( e.target.hasAttribute('min') )
                this._active = 'min'

            // this flag keeps the thumb highlighted
            this._mouseDown = true
            this.update()

		}, true)
		
		this.addEventListener('blur', e=>{
            this._mouseDown = false
            this._active = null
            this.update()
		})
    }

    static get styles(){return css`
        :host {
            --size: 8px;
            --thumbSize: 18px;
            --color: var(--fc-theme);
            --thumbColor: var(--color);
            --bgd: rgba(var(--theme-text-rgb, 0,0,0,), .2);
            --padding: 10px;

            display: inline-block;
            vertical-align: middle;
            position:relative;
            width: 140px;
            height: var(--size);
            margin: 0 auto;
            padding: var(--padding) 0;
            cursor: pointer;
            font-size: .9em;
            user-select: none;
            --label-rotation: 45deg;
        }

        rail, track {
            display: block;
            height: var(--size);
            width: 100%;
            background: var(--color);
            border-radius: var(--size);
            position: absolute;
            top: var(--padding);
            left: 0;
        }

        rail {
            background: var(--bgd);
        }

        thumb {
            height: var(--thumbSize);
            width: var(--thumbSize);
            transform: translate(-50%, -50%);
            position: absolute;
            left: 0;
            top: calc(var(--padding) + (var(--size) / 2));
            background: var(--thumbColor);
            border-radius: var(--thumbSize);
            box-shadow: 0 0 0 1px var(--theme-bgd, var(--thumb-shadow, #fff)) inset;
            outline: none;
        }

        thumb:before {
            content: '';
            position: absolute;
            height: 200%;
            width: 200%;
            left: -50%;
            top: -50%;
            background: var(--thumbColor);
            opacity: .2;
            border-radius: 30px;
            z-index: -1;
            transform: scale(.3);
            transform-origin: center center;
            opacity: 0;
            transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        thumb:hover:before {
            transform: scale(.9);
            opacity: .2;
        }

        thumb[active]:before {
            transform: scale(1);
            opacity: .2;
        }

        thumb[active] {
            background: var(--color);
        }

        thumb > div {
            position: absolute;
            font-size: .9em;
            background: var(--color);
            color: #fff;
            height: 2.2em;
            width: 2.2em;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 100%;
            left: 50%;
            position: absolute;
            transform-origin: bottom left;
            transform: translate(0%,-4px) rotate(calc(-1 * var(--label-rotation))) scale(0);
            border-radius: 50% 50% 50% 0;
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            
        }

        :host([label*="bottom"]) thumb > div{
            bottom: auto;
            top: calc(0% - 4px);
            --label-rotation: -135deg;
        }

        thumb > div > span {
            transform: rotate(var(--label-rotation))
        }

        :host([label*="show"]) thumb > div,
        thumb:hover > div,
        thumb[active] > div {
            transform: translate(0%,-4px) rotate(calc(-1 * var(--label-rotation))) scale(1);
        }

        :host([label*="none"]) thumb > div {
            display: none !important;
        }

        :host(:not([range])) thumb[min] {
            display: none;
        }

        .labels {
            display: flex;
            justify-content: space-between;
            margin-top: .75em;
        }
    `}

    _polishVal(val){

        val = parseFloat((Math.round(val / this.step) * this.step).toFixed(2))

        if( val < this.min )
            val = this.min
        
        if( val > this.max )
            val = this.max
        
        return val
    }

    set value(val){

        let oldVal = this.value
        let oldMin = this.valMin
        let oldMax = this.valMax
        
        if( typeof val == 'string' )
            val = val.split(',').map(s=>parseFloat(s))

        // setting both min and max
        if( Array.isArray(val) ){
            if( typeof val[0] !== 'number' || typeof val[1] !== 'number' ) return

            val.sort()

            if( this.range )
                this.valMin = this._polishVal(val[0])

            this.valMax = this._polishVal(val[1])
            
            this.requestUpdate('value', oldVal)
            return
        }

        if( typeof val !== 'number' ) return

        val = this._polishVal(val)
        // console.log(val);

        let dmin = Math.abs(this.valMin - val);
        let dmax = Math.abs(this.valMax - val)

        if( this._active == 'max' && val == this.valMin ){
            this.valMax = val
            if( this.range )
                this._active = 'min'
        
        }else if( this._active == 'min' && val == this.valMax ){
            this.valMin = val
            this._active = 'max'
        }
        else if( !this.range || (dmin == dmax && this.valMax > this.valMin && this._active == 'max') || dmax < dmin || val > this.valMax ){

            if( !this.range )
                this.valMin = this.min

            this.valMax = val
            this._active = 'max'
        }else{
            this.valMin = val
            if( this.range )
                this._active = 'min'
        }

        // this.setAttribute('value', this.value.join(','))
        if( !this._mouseDown )
            this._active = null

        // nothing changed
        if( oldMin == this.valMin && oldMax == this.valMax ) return
    
        this._didChange = true
        
        let setPropOn = this.parentElement && this.parentElement.tagName == 'FORM-CONTROL' 
                        ? this.parentElement : this

        if( this.range ){
            setPropOn.style.setProperty('--range-slider-min-val', `'${this.valMin}'`)
            setPropOn.style.setProperty('--range-slider-max-val', `'${this.valMax}'`)
        }else{
            setPropOn.style.setProperty('--range-slider-val', `'${this.valMax}'`)
        }

        this.requestUpdate('value', oldVal)
    }

    get value(){
        return this.range ? [this.valMin, this.valMax] : this.valMax;
    }

    connectedCallback(){
        super.connectedCallback()
        this.addEventListener(device.isMobile ? 'touchstart' : 'mousedown', this.mouseDown, true)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.removeEventListener(device.isMobile ? 'touchstart' : 'mousedown', this.mouseDown, true)
    }

    get _len(){ return this.max - this.min }
    get _minLeft(){ return (this.valMin - this.min) / this._len * 100 }
    get _maxLeft(){ return (this.valMax - this.min) / this._len * 100 }
    get _trackLength(){ return this._maxLeft - this._minLeft }

    get atMin(){ return (this.range ? this.valMin : this.valMax ) == this.min }
    get atMax(){ return this.valMax == this.max }

    reset(){
        this.valMin = this.min
        this.valMax = this.min
        // this.valMax = this.range ? this.max : this.min
        this.value = [this.valMin, this.valMax]
        this.update()
    }

    render(){return html`
        <rail></rail>
        <track style="left:${this._minLeft}%; width:${this._trackLength}%"></track>
        <thumb min ?active=${this._active=='min'} style="left:${this._minLeft}%" tabindex="0">
            <div><span>${this.valMin}</span></div>
        </thumb>
        <thumb max ?active=${this._active=='max'} style="left:${this._maxLeft}%" tabindex="0">
            <div><span>${this.valMax}</span></div>
        </thumb>
        <div class="labels">
            <b-text sm muted><slot name="label:min"></slot></b-text>
            <b-text sm muted><slot name="label:max"></slot></b-text>
        </div>
    `}

    mouseDown(e){
        if( !device.isMobile && e.which !== 1 ) return // normal click
        window.addEventListener(device.isMobile?'touchend':'mouseup', this.mouseUp, true)
        window.addEventListener(device.isMobile?'touchmove':'mousemove', this.mouseMove, true)
        this._mouseDown = true
        this.mouseMove(e)

        // stop text on page from being selected if user drags past ends of slider
        this._bodyUserSelect = document.body.style.userSelect
        document.body.style.userSelect = 'none'
    }

    mouseUp(){
        this._active = null
        this._mouseDown = false
        window.removeEventListener(device.isMobile?'touchend':'mouseup', this.mouseUp, true)
        window.removeEventListener(device.isMobile?'touchmove':'mousemove', this.mouseMove, true)
        this.update()

        if( this._didChange ){
            this._didChange = false
            
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: {value: this.value}
            }))
        }

        // put back the body "user select" style
        setTimeout(()=>{
            document.body.style.userSelect = this._bodyUserSelect
        })
    }

    mouseMove(e){
        
        // already at the min/max, stop tracking mouse move until within range again
        if( this._active == 'min' && e.pageX < this._lastMousePos && this.atMin ) return
        if( this._active == 'max' && e.pageX > this._lastMousePos && this.atMax ) return
        
        this._lastMousePos = e.pageX

        let rect = this.getBoundingClientRect()
        let offset = {x: rect.x, y: rect.y}

        // let mouseX = offset.x < e.pageX ? (e.offsetX + e.srcElement.offsetLeft) : e.pagex
        let eventScreenX = e.touches ? e.touches[0].screenX : e.screenX
        let mouseX = eventScreenX - window.screenX
        let x = mouseX - offset.x
        let percent = x / this.clientWidth * 100;

        let val = ((percent / 100) * this._len) + this.min

        let oldVal = this.value
        this.value = val

        if( oldVal != this.value )
        this.dispatchEvent(new CustomEvent('changing', {
            bubbles: true,
            composed: true,
            detail: {value: this.value}
        }))
    }

    _onKeyDown(e){
        let move = null

        if( ['ArrowLeft', 'ArrowDown'].includes(e.code) ){
            move = 'down'
        }else if( ['ArrowRight', 'ArrowUp'].includes(e.code) ){
            move = 'up'
        }

        if( !move ) return

        e.preventDefault()
        e.stopPropagation()

        let val = this.value
        let stepVal = this.step

        if( move == 'down' )
            stepVal = stepVal * -1

        if( e.shiftKey )
            stepVal = stepVal * 10

        // TODO: jump to "min" needs work
        // if( e.shiftKey && (e.ctrlKey || e.metaKey) ){
        //     stepVal = stepVal > 0 ? this.max : this.min
        // }
        
        if( this.range ){

            if( val[0] == val[1] ){
                if( stepVal > 0 )
                    this._active = 'max'
                else
                    this._active = 'min'
            }

            if( this._active == 'min' )
                this.value = [val[0]+stepVal, val[1]]
            else
                this.value = [val[0], val[1]+stepVal]
        }
        else
            this.value += stepVal
    }

})

export default customElements.get('range-slider')
