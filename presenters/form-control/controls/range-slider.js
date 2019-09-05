import { LitElement, html, css } from 'lit-element'

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

    static get styles(){return css`
        :host {
            --size: 2px;
            --thumbSize: 14px;
            --color: var(--blue);
            --thumbColor: var(--color);
            --bgd: rgba(0,0,0,.4);
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
        }

        rail, track {
            display: block;
            height: var(--size);
            width: 100%;
            background: var(--color);
            border-radius: 6px;
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
        }

        thumb:before {
            content: '';
            position: absolute;
            height: 250%;
            width: 250%;
            left: -75%;
            top: -75%;
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
            transform: translate(0%,-9px) rotate(-45deg) scale(0);
            border-radius: 50% 50% 50% 0;
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            
        }

        thumb > div > span {
            transform: rotate(45deg)
        }

        :host([label="show"]) thumb > div,
        thumb:hover > div,
        thumb[active] > div {
            transform: translate(0%,-9px) rotate(-45deg) scale(1);
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
        this.requestUpdate('value', oldVal)
    }

    get value(){
        return this.range ? [this.valMin, this.valMax] : this.valMax;
    }

    connectedCallback(){
        super.connectedCallback()
        this.addEventListener('mousedown', this.mouseDown, true)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.removeEventListener('mousedown', this.mouseDown, true)
    }

    get _len(){ return this.max - this.min }
    get _minLeft(){ return this.valMin / this._len * 100 }
    get _maxLeft(){ return this.valMax / this._len * 100 }
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
        <thumb min ?active=${this._active=='min'} style="left:${this._minLeft}%">
            <div><span>${this.valMin}</span></div>
        </thumb>
        <thumb max ?active=${this._active=='max'} style="left:${this._maxLeft}%">
            <div><span>${this.valMax}</span></div>
        </thumb>
        <div class="labels">
            <!-- <b-label xs>0 hrs</b-label>
            <b-label xs>30 hrs</b-label> -->
        </div>
    `}

    mouseDown(e){
        if( e.which !== 1) return // normal click
        window.addEventListener('mouseup', this.mouseUp, true)
        window.addEventListener('mousemove', this.mouseMove, true)
        this._mouseDown = true
        this.mouseMove(e)
    }

    mouseUp(){
        this._active = null
        this._mouseDown = false
        window.removeEventListener('mouseup', this.mouseUp, true)
        window.removeEventListener('mousemove', this.mouseMove, true)
        this.update()

        if( this._didChange ){
            this._didChange = false
            
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: {value: this.value}
            }))
        }
    }

    mouseMove(e){
        
        // already at the min/max, stop tracking mouse move until within range again
        if( this._active == 'min' && e.pageX < this._lastMousePos && this.atMin ) return
        if( this._active == 'max' && e.pageX > this._lastMousePos && this.atMax ) return
        
        this._lastMousePos = e.pageX

        let offset = {x: this.offsetLeft, y: this.offsetTop}
        let parent = this.offsetParent
        while(parent){
            offset.x += parent.offsetLeft
            offset.y += parent.offsetTop
            parent = parent.offsetParent
        }

        // let mouseX = offset.x < e.pageX ? (e.offsetX + e.srcElement.offsetLeft) : e.pagex
        let mouseX = e.screenX - window.screenX
        let x = mouseX - offset.x
        let percent = x / this.clientWidth * 100;

        let val = (percent / 100) * this._len

        this.value = val
    }

})

export default customElements.get('range-slider')