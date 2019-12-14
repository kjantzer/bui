import Emitter from 'component-emitter'

const isTouch = 'ontouchstart' in window

export default class Selection {

    constructor(toolbar, list, itemTagName){

        window.SEL = this // TEMP

        

        this.EVENTS = {
            DOWN: isTouch ? 'touchstart' : 'mousedown',
            UP: isTouch ? 'touchend' : 'mouseup',
            OVER: isTouch ? 'touchmove' : 'mouseover'
        }

        toolbar.selection = this
        
        this.result = new Map()

        this.toolbar = this
        this.list = list
        this.itemTagName = itemTagName.toUpperCase()

        // TODO: allow for changing
        this.SELECTED = '_selected'

        // bind method context
        this.stopPropagation = this.stopPropagation.bind(this)
        // this.onClick = this.onClick.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseOver = this.onMouseOver.bind(this)
    }

    get isOn(){ return this.__on === true }

    begin(e){

        if( this.isOn ) return

        this.__on = true

        // select the item that triggered the selection
        if( e ){
            this._startItem = this.itemInEvent(e)
            this.select(this._startItem)
        }

        this.bindEvents(e)

        this.emit('begin')
    }

    end(){
        this.__on = false
        this.unbindEvents()
        let {items} = this.getItems()
        items.forEach(item=>{
            this._deselect(item)
        })

        this.emit('end')
    }

    bindEvents(e){
        // incase other code is listening for these events
        // disable them while we are in selection mode
        this.list.addEventListener('longpress', this.stopPropagation, true)
        this.list.addEventListener('contextmenu', this.stopPropagation, true)
        this.list.addEventListener('mouseenter', this.stopPropagation, true)
        this.list.addEventListener('mousemove', this.stopPropagation, true)
        this.list.addEventListener('click', this.stopPropagation, true)
        
        this.list.addEventListener('scroll', this.onScroll, true)
        this.list.addEventListener(this.EVENTS.DOWN, this.onMouseDown, true)
        this.list.addEventListener(this.EVENTS.UP, this.onMouseUp, true)

        if( e && e.detail && e.detail.dragging )
            this.list.addEventListener(this.EVENTS.OVER, this.onMouseOver, true)

        // TODO: describe why
        // this.list.addEventListener('click', e=>{
            // this.list.addEventListener('click', this.onClick, true)
        // }, {once: true, capture: true})
    }

    unbindEvents(){
        this.list.removeEventListener('longpress', this.stopPropagation, true)
        this.list.removeEventListener('contextmenu', this.stopPropagation, true)
        this.list.removeEventListener('mouseenter', this.stopPropagation, true)
        this.list.removeEventListener('mousemove', this.stopPropagation, true)
        this.list.removeEventListener('click', this.stopPropagation, true)
        
        // this.list.removeEventListener('click', this.onClick, true)
        this.list.removeEventListener(this.EVENTS.OVER, this.onMouseOver, true)
        this.list.removeEventListener(this.EVENTS.DOWN, this.onMouseDown, true)
        this.list.removeEventListener(this.EVENTS.UP, this.onMouseUp, true)
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

            this.emit('change', this.result)
            
            if( this.result.size == 0 )
                this.end()

            return
        }

        let {items, start, end, oldStart, oldEnd} = this.getItems(startItem, item)

        items.forEach((_item,i)=>{
            if( i >= start && i <= end)
               this._select(_item)
            
            else if( i >= oldStart && i <= oldEnd)
                this._deselect(_item)
        })

        this.emit('change', this.result)
        
        if( this.result.size == 0 )
            this.end()
    }

    _toggleSelect(item){
        if( item.hasAttribute(this.SELECTED))
            this._deselect(item)
        else
            this._select(item)
    }

    _select(item){
        item.setAttribute(this.SELECTED, '')
        this.result.set(item, item)
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

    // onClick(e){
    //     this.stopPropagation(e)
        
    //     let item = this.itemInEvent(e)
    //     this.select(item, e.shiftKey?this._startItem:null)

    //     if( !e.shiftKey )
    //         this._startItem = item
    // }

    onScroll(){
        if( isTouch && !this._autoScroll && !this._dragging ){
            console.log('scrolling');
            
            this._scrolling = new Date().getTime()
        }
    }

    onMouseDown(e){

        e.stopPropagation()

        this.list.addEventListener(this.EVENTS.OVER, this.onMouseOver, true)

        let item = this.itemInEvent(e)

        if( item )
        this._mouseClick = setTimeout(()=>{

            // no longer a mouse click
            delete this._mouseClick

            if( this._scrolling ) return

            this._dragging = true 
            this._startItem = item
            this._select(item)

        }, 200)
    }

    onMouseUp(e){

        this.stopPropagation(e)
        this._dragging = false
        this.autoScroll(false)
        clearTimeout(this._mouseClick)

        let ts = new Date().getTime()

        console.log(ts-this._scrolling);
        

        if( this._mouseClick && (!this._scrolling || ts-this._scrolling>100) ){

            delete this._mouseClick
            let item = this.itemInEvent(e)
            this.select(item, e.shiftKey?this._startItem:null)

            if( !e.shiftKey )
                this._startItem = item

        }else{
            delete this._startItem
            delete this._lastTouchItem
        }

        this._scrolling = false
        this.list.removeEventListener(this.EVENTS.OVER, this.onMouseOver, true)
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
            console.log('speed:', speed);
            
            this._autoScrollSpeed = speed
            
            this.list.scrollTop = this.list.scrollTop+this._autoScrollSpeed
            
            this._autoScroll = setInterval(()=>{
                this.list.scrollTop = this.list.scrollTop+this._autoScrollSpeed
            },10)
        }
    }

    onMouseOver(e){
        // console.log(e, e.changedTouches[0].clientX, e.changedTouches[0].clientY);

        if( this._dragging )
            this.stopPropagation(e)

        if( this._mouseClick || (this._scrolling && !this._autoScroll) ) return

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
    
}

Emitter(Selection.prototype)

