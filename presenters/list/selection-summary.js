/*
    Selection Summary

    Will show in slot when selection is turned on and remove from slot when selection ends
    - Has hooks for when list data changes or selection changes
    - subclass is responsible for summary data and re-render
*/
import { LitElement, html, css } from 'lit'

export default class extends LitElement{

    static properties = {
        location: {type: String} // name of slot
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
        }
    `

    constructor(){
        super()
        this.location = 'footer'
        this.dataSourceChange = this.dataSourceChange.bind(this)
        this.selectionBegin = this.selectionBegin.bind(this)
        this.selectionEnd = this.selectionEnd.bind(this)
        this.selectionChange = this.selectionChange.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        
        if( this.parentElement.tagName !== 'B-LIST' )
            return console.warn('`'+this.tagName+'` must be a direct child of `b-list`')

        this.list = this.parentElement
        this.setup()
    }

    disconnectedCallback(){
        super.disconnectedCallback()

        if( this.list ){
            this.list.selection.off('begin', this.selectionBegin)
            this.list.selection.off('end', this.selectionEnd)
            this.list.selection.off('change', this.selectionChange)
        }

        delete this.list
    }

    firstUpdated(){
        this.setup()
    }

    setup(){
        if( !this.list?.selection ) return

        this.list.selection.on('begin', this.selectionBegin)
        this.list.selection.on('end', this.selectionEnd)
        this.list.selection.on('change', this.selectionChange)
    }

    // subclass and modify
    render(){return html``}

    selectionBegin(){
        this.list?.dataSource?.on('changed', this.dataSourceChange)
        this.slot = this.location
    }

    selectionEnd(){
        this.list?.dataSource?.off('changed', this.dataSourceChange)
        this.slot = ''
    }

    // subclass should override
    selectionChange(){
        console.log(this.list.currentModels);
    }

    dataSourceChange(){}

}
