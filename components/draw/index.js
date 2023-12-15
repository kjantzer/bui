/*
    Draw

    Initial code from: https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/

    TODO:
    - smooth out drawn lines
    - custom colors?
    - resize when window changes?
*/
import { LitElement, html, css } from 'lit'

customElements.define('b-draw', class extends LitElement{

    static properties = {
        drawing: {type: Boolean, reflect: true}
    }

    static styles = css`
        :host {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 99999
        }

        canvas {
            width: 100%;
            height: 100%;
        }
    `

    constructor(){
        super()

        this.coord = {x:0 , y:0}

        this.drawStart = this.drawStart.bind(this)
        this.drawStop = this.drawStop.bind(this)
        this.draw = this.draw.bind(this)
        this.drawStopAfterLeave = this.drawStopAfterLeave.bind(this)

        // let us draw with right+click
        this.addEventListener('contextmenu', e=>{
            e.preventDefault()
        })
    }

    get canvas(){ return this.$$('canvas', true)}
    get ctx(){ return this.canvas.getContext('2d') }

    render(){return html`
        <canvas></canvas>
    `}

    firstUpdated(){
        this.resize()
    }

    resize(){
        if( !this.canvas ) return
        this.canvas.width = this.clientWidth; 
        this.canvas.height = this.clientHeight;
    }

    clear(){
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    connectedCallback(){
        super.connectedCallback()
        this.enable()
        this.resize()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.clear()
        this.disable()
    }

    enable(){
        this.addEventListener('mousedown', this.drawStart, false)
        this.addEventListener('mouseup', this.drawStop, false)
        this.addEventListener('mousemove', this.draw, false)
        this.addEventListener('mouseleave', this.drawStopAfterLeave, false)
    }

    disable(){
        this.drawStop()
        this.removeEventListener('mousedown', this.start, false)
        this.removeEventListener('mouseup', this.drawStop, false)
        this.removeEventListener('mousemove', this.draw, false)
        this.removeEventListener('mouseleave', this.drawStopAfterLeave, false)
    }

    drawStopAfterLeave(){
        clearTimeout(this._drawStopAfterLeave)
        this._drawStopAfterLeave = setTimeout(this.drawStart, 500)
    }

    drawStart(e){
        e?.stopPropagation?.()
        e?.preventDefault?.()

        this.button = e?.button || 0
        this.drawing = true
        this.getPosition(e)
    }

    drawStop(){
        this.drawing = false
        this.button = 0
    }

    getPosition(event){ 
        this.coord.x = event.clientX - this.canvas.offsetLeft; 
        this.coord.y = event.clientY - this.canvas.offsetTop; 
    }

    draw(e){
        if( !this.drawing ) return

        clearTimeout(this._drawStopAfterLeave)

        e.stopPropagation()
        e.preventDefault()

        let ctx = this.ctx

        ctx.beginPath(); 
            
        ctx.lineWidth = 3; 
        
        // Sets the end of the lines drawn 
        // to a round shape. 
        ctx.lineCap = 'round'; 
        
        let color = {
            0: '#FF1744', // pink
            2: '#00E676' // green
        }
        ctx.strokeStyle = color[this.button] || '#FF1744'; 
            
        // The cursor to start drawing 
        // moves to this coordinate 
        ctx.moveTo(this.coord.x, this.coord.y); 
        
        // The position of the cursor 
        // gets updated as we move the 
        // mouse around. 
        this.getPosition(e)
        
        // A line is traced from start 
        // coordinate to this coordinate 
        ctx.lineTo(this.coord.x , this.coord.y); 
            
        // Draws the line. 
        ctx.stroke(); 
    }

})

export default customElements.get('b-draw')
