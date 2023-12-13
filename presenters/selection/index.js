import Emitter from 'component-emitter'

const isTouch = 'ontouchstart' in window

class ResultMap extends Map {
    
    get models(){
        return Array.from(this.values())
    }

    get elements(){
        return Array.from(this.keys())
    }

    get length(){ return this.size }
}

const DISABLE_EVENTS =[
    'longpress', 
    'contextmenu', 
    'dragstart', 
    'mouseenter', 
    'mousemove', 
    'click'
]

export default class Selection {

    constructor(list, itemTagName, opts={}){

        this.opts = Object.assign({
            toolbar: null,
            selectedAttr: 'isSelected',
            endWhenNoResults: true,
            endOnEsc: true,
            autoScrollThreshold: 48,
            autoScrollAcceleration: 5,
            onBegin: ()=>{},
            onEnd: ()=>{},
            onChange: result=>{}
        }, opts)

        this.EVENTS = {
            DOWN: isTouch ? 'touchstart' : 'mousedown',
            UP: isTouch ? 'touchend' : 'mouseup',
            DRAG: isTouch ? 'touchmove' : 'mouseover'
        }

        if( this.opts.toolbar )
            this.opts.toolbar.selection = this
        
        this.result = new ResultMap()

        this.list = list
        this.itemTagName = itemTagName.toUpperCase()

        this.SELECTED = this.opts.selectedAttr

        // bind method context
        this.stopPropagation = this.stopPropagation.bind(this)
        // this.onClick = this.onClick.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.onKeydown = this.onKeydown.bind(this)
        this.onEventDown = this.onEventDown.bind(this)
        this.onEventUp = this.onEventUp.bind(this)
        this.onEventDrag = this.onEventDrag.bind(this)
    }

    get isOn(){ return this.__on === true }

    _emit(action, data){
        this.emit(action, data)
        this.list.emitEvent?.('selection', {action, data})
    }

    begin(e){

        if( this.isOn ) return

        this.__on = true
        this.list.setAttribute('selection-on', '')

        this.bindEvents(e)

        // select the item that triggered the selection
        if( e ){
            this._dragging = true
            this._startItem = this.itemInEvent(e)
            this.select(this._startItem)
        }

        this.opts.onBegin()
        this._emit('begin')
    }

    end(){
        this.__on = false
        this.list.removeAttribute('selection-on')
        this.unbindEvents()
        this.clear()

        this.opts.onEnd()
        this._emit('end')
    }

    clear(){
        let {items} = this.getItems()
        items.forEach(item=>{
            this._deselect(item)
        })
    }

    bindEvents(e){
        // incase other code is listening for these events
        // disable them while we are in selection mode
        DISABLE_EVENTS.forEach(evt=>{
            this.list.addEventListener(evt, this.stopPropagation, true)    
        })
        
        window.addEventListener('keydown', this.onKeydown)
        this.list.addEventListener('scroll', this.onScroll, true)
        this.list.addEventListener(this.EVENTS.DOWN, this.onEventDown, true)
        this.list.addEventListener(this.EVENTS.UP, this.onEventUp, true)

        if( e && e.detail && e.detail.dragging )
            this.list.addEventListener(this.EVENTS.DRAG, this.onEventDrag, true)
    }

    unbindEvents(){
        DISABLE_EVENTS.forEach(evt=>{
            this.list.removeEventListener(evt, this.stopPropagation, true)    
        })
        
        window.removeEventListener('keydown', this.onKeydown)
        this.list.removeEventListener('scroll', this.onScroll, true)
        this.list.removeEventListener(this.EVENTS.DRAG, this.onEventDrag, true)
        this.list.removeEventListener(this.EVENTS.DOWN, this.onEventDown, true)
        this.list.removeEventListener(this.EVENTS.UP, this.onEventUp, true)
    }

    getItems(start, end){
        let items = Array.from(this.list.querySelectorAll(this.itemTagName))

        if( typeof start === 'number' )
            start = items[start]
        
        if( typeof end === 'number' )
            end = items[end]
        
        let oldStart = this._dragging&&this._dragging.start
        let oldEnd = this._dragging&&this._dragging.end

        if( start && end ){
            let startIndex = items.indexOf(start)
            let endIndex = items.indexOf(end)

            if( startIndex == -1 || endIndex == -1 ){
                start = null
                end = null
            }else{
                start = startIndex < endIndex ? startIndex : endIndex
                end = startIndex < endIndex ? endIndex : startIndex
            }

            this._dragging = {items, start, end}
        }

        return {items, start, end, oldStart, oldEnd}
    }

    select(item, startItem){
        
        if( item instanceof Event )
            item = this.itemInEvent(item)

        if( !item ) return

        if( !startItem ){
            this._toggleSelect(item)

            this.opts.onChange(this.result)
            this._emit('change', this.result)
            
            if( this.opts.endWhenNoResults && this.result.size == 0 )
                setTimeout(()=>this.end()) // let mouseup finish

            return
        }

        let {items, start, end, oldStart, oldEnd} = this.getItems(startItem, item)
        let shouldSelect = startItem.hasAttribute(this.SELECTED)

        items.forEach((_item,i)=>{
            if( i >= start && i <= end)
               shouldSelect ? this._select(_item) : this._deselect(_item)
            
            else if( oldStart !== false && oldEnd !== false && i >= oldStart && i <= oldEnd)
                this._deselect(_item)
        })

        this._emit('change', this.result)
        
        if( this.opts.endWhenNoResults && this.result.size == 0 )
            setTimeout(()=>this.end()) // let mouseup finish
    }

    _toggleSelect(item){
        if( item.hasAttribute(this.SELECTED))
            this._deselect(item)
        else
            this._select(item)
    }

    _select(item){
        item.setAttribute(this.SELECTED, '')
        this.result.set(item, item.model||item)
    }

    _deselect(item){
        item.removeAttribute(this.SELECTED)
        this.result.delete(item)
    }

    stopPropagation(e){
        
        if( e.type == 'contextmenu' )
            this.emit('contextmenu', {evt: e})

        e.preventDefault()
        e.stopImmediatePropagation()
        e.stopPropagation()
    }

    onScroll(){
        if( isTouch && !this._autoScroll && !this._dragging ){
            this._scrolling = new Date().getTime()
        }
    }

    onKeydown(e){
        if( this.opts.endOnEsc && e.key == 'Escape' )
            this.end()
    }

    onEventDown(e){

        // only work on "main" buttons
        if( e.button !== undefined && e.button !== 0 ) return

        e.stopPropagation()

        // while mouse/touch is down...watch dragging
        this.list.addEventListener(this.EVENTS.DRAG, this.onEventDrag, true)

        let item = this.itemInEvent(e)

        if( item )
        this.isClickEvent = setTimeout(()=>{
            
            let ts = new Date().getTime()

            // no longer a mouse click
            delete this.isClickEvent

            if( this._scrolling && ts-this._scrolling<=50 ) return

            delete this._scrolling

            this._dragging = true
            this._startItem = item
            this._select(item)

        }, 200)
    }

    onEventUp(e){

        this.stopPropagation(e)
        this._dragging = false
        this.autoScroll(false)
        clearTimeout(this.isClickEvent)

        let ts = new Date().getTime()

        if( this.isClickEvent && (!this._scrolling || ts-this._scrolling>50) ){

            delete this.isClickEvent
            let item = this.itemInEvent(e)
            this.select(item, e.shiftKey?this._startItem:null)

            if( !e.shiftKey )
                this._startItem = item

        }else{
            delete this._startItem
            delete this._lastTouchItem
        }

        delete this._scrolling
        this.list.removeEventListener(this.EVENTS.DRAG, this.onEventDrag, true)
    }

    onEventDrag(e){

        if( this._dragging )
            this.stopPropagation(e)

        if( this.isClickEvent || (this._scrolling && !this._autoScroll) ) return

        // touch devices
        if( e.changedTouches ){

            let {clientX, clientY} = e.changedTouches[0]
        
            if( this.opts.autoScrollThreshold !== false){

                let listRect = this.list.getBoundingClientRect()
                
                let top = listRect.y + this.opts.autoScrollThreshold
                let bottom = listRect.y + listRect.height - this.opts.autoScrollThreshold

                let acceleration = (this.opts.autoScrollAcceleration||1) / 10

                // scroll up
                if( clientY < top )
                    this.autoScroll(-1 - Math.round(Math.pow(top-clientY, acceleration)))
                
                // scroll down
                else if( clientY > bottom )
                    this.autoScroll(1 + Math.round(Math.pow(clientY-bottom, acceleration)))
                
                // not within threshold, stop scrolling
                else
                    this.autoScroll(false)

            }

            let item = this.list.getRootNode().elementFromPoint(clientX, clientY);

            if( item && item.tagName == this.itemTagName 
            && item != this._lastTouchItem ){
                this._lastTouchItem = item
                this.select(item, this._startItem)
            }
            
        // mouse event
        }else{
            // hmm....why relatedTarget? it doesn't work right
            // let item = e.relatedTarget && e.relatedTarget.tagName == this.itemTagName ? e.relatedTarget : e
            let item = e
            this.select(item, this._startItem)
        }
    }

    itemInEvent(e){

        if( e?.select ){
            return e.select.tagName == this.itemTagName ? e.select : null
        }

        let path = e.composedPath?.() || []
        return path.find(_el=>_el.tagName==this.itemTagName)
    }

    autoScroll(speed=2){
        
        if( speed == false || this._autoScrollSpeed != speed ){
            clearInterval(this._autoScroll)

            if( speed == false ){
                delete this._autoScroll
                delete this._autoScrollSpeed
            }
        }
        
        if( speed !== false && this._autoScrollSpeed != speed ){
            this._autoScrollSpeed = speed
            
            this.list.scrollTop = this.list.scrollTop+this._autoScrollSpeed
            
            this._autoScroll = setInterval(()=>{
                this.list.scrollTop = this.list.scrollTop+this._autoScrollSpeed
            },10)
        }
    }
    
}

Emitter(Selection.prototype)
