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
            onBegin: ()=>{},
            onEnd: ()=>{},
            onChange: result=>{}
        }, opts)

        this.EVENTS = {
            DOWN: isTouch ? 'touchstart' : 'mousedown',
            UP: isTouch ? 'touchend' : 'mouseup',
            OVER: isTouch ? 'touchmove' : 'mouseover'
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
        this.onEventDown = this.onEventDown.bind(this)
        this.onEventUp = this.onEventUp.bind(this)
        this.onEventOver = this.onEventOver.bind(this)
    }

    get isOn(){ return this.__on === true }

    begin(e){

        if( this.isOn ) return

        this.__on = true

        this.bindEvents(e)

        // select the item that triggered the selection
        if( e ){
            this._dragging = true
            this._startItem = this.itemInEvent(e)
            this.select(this._startItem)
        }

        this.opts.onBegin()
        this.emit('begin')
    }

    end(){
        this.__on = false
        this.unbindEvents()
        let {items} = this.getItems()
        items.forEach(item=>{
            this._deselect(item)
        })

        this.opts.onEnd()
        this.emit('end')
    }

    bindEvents(e){
        // incase other code is listening for these events
        // disable them while we are in selection mode
        DISABLE_EVENTS.forEach(evt=>{
            this.list.addEventListener(evt, this.stopPropagation, true)    
        })
        
        this.list.addEventListener('scroll', this.onScroll, true)
        this.list.addEventListener(this.EVENTS.DOWN, this.onEventDown, true)
        this.list.addEventListener(this.EVENTS.UP, this.onEventUp, true)

        if( e && e.detail && e.detail.dragging )
            this.list.addEventListener(this.EVENTS.OVER, this.onEventOver, true)
    }

    unbindEvents(){
        DISABLE_EVENTS.forEach(evt=>{
            this.list.removeEventListener(evt, this.stopPropagation, true)    
        })
        
        // this.list.removeEventListener('click', this.onClick, true)
        this.list.removeEventListener(this.EVENTS.OVER, this.onEventOver, true)
        this.list.removeEventListener(this.EVENTS.DOWN, this.onEventDown, true)
        this.list.removeEventListener(this.EVENTS.UP, this.onEventUp, true)
    }

    getItems(start, end){
        let items = Array.from(this.list.querySelectorAll(this.itemTagName))
        
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
            this.emit('change', this.result)
            
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

        this.emit('change', this.result)
        
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
        e.preventDefault()
        e.stopImmediatePropagation()
        e.stopPropagation()
    }

    onScroll(){
        if( isTouch && !this._autoScroll && !this._dragging ){
            this._scrolling = new Date().getTime()
        }
    }

    onEventDown(e){

        e.stopPropagation()

        this.list.addEventListener(this.EVENTS.OVER, this.onEventOver, true)

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
        this.list.removeEventListener(this.EVENTS.OVER, this.onEventOver, true)
    }

    onEventOver(e){

        if( this._dragging )
            this.stopPropagation(e)

        if( this.isClickEvent || (this._scrolling && !this._autoScroll) ) return

        if( !e.path ){
        
            let {clientX, clientY} = e.changedTouches[0]
            let item = this.list.getRootNode().elementFromPoint(clientX, clientY);

            let top = this.list.offsetTop + 160 // FIXME: hardcoded
            let bottom = this.list.offsetTop + this.list.offsetHeight

            if( clientY < top )
                this.autoScroll(-1 - Math.round(Math.pow(top-clientY, 0.4)))
            else if( clientY > bottom )
                this.autoScroll(1 + Math.round(Math.pow(clientY-bottom, 0.4)))
            else
                this.autoScroll(false)
            

            if( item && item.tagName == this.itemTagName 
            && item != this._lastTouchItem ){
                this._lastTouchItem = item
                this.select(item, this._startItem)
            }
            
        }else{
            this.select(e, this._startItem)
        }
    }

    itemInEvent(e){
        let path = e.composedPath()
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
