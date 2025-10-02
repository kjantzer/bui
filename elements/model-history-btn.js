/*
    # Model History Button

    To be used with Model History Controller (bui/helpers/lit/model-history-controller.js)

    ```html
    <b-model-history-btn .model=${modelHistoryController}></b-model-history-btn>
    ```
*/
import { LitElement, html, css } from 'lit'
import Btn from './btn'
import Menu from '../presenters/menu'

customElements.define('b-model-history-btn', class extends Btn{

    static properties = {
        ...Btn.properties,
        mode: {type: String, reflect: true}
    }

    static listeners = {
        model: {'change': 'requestUpdate'}
    }

    static styles = [Btn.styles, css`
        
    `]

    constructor(){
        super(...arguments)
        this.icon = 'arrow_back'
        this.value = 'Back'
    }

    updated(){
        this.setAttribute('size', this.model.size)
    }

    renderLabel(){return html`
        <b-text sm>${this.value}</b-text>
    `}

    _renderLabel(){return html`
        (${this.model.index+1}/${this.model.size})
    `}

    clickMenu(){

        if( this.mode == 'menu' )
            return this.contextMenu()
        
        let prev = this.model.previous()
        if( prev )
            this.model.open(prev)
        else
            this.contextMenu()
    }

    async contextMenu(){

        // TODO: consider moving this (the menu creation) to the controller?
        let menu = this.model.map(m=>{

            let label = this.model.label ? this.model.label(m) : (m.name || m.label || m.title)

            return {
                val: m.id,
                m,
                ...(typeof label == 'object' ? label : {label})
            }
        }).reverse() // newest first

        if( menu.length ){
            menu = [
                {divider: `History (${this.model.size})`},
                ...(this.model.size > 1 ? [{label: 'Clear', icon: 'backspace', val: 'clear'}, '-'] : []),
                ...menu
            ]
            if( this.model.storeLimit ){
                menu.push({text: `Last ${this.model.storeLimit} records viewed`})
            }
        }

        let selected = await new Menu(menu, {selected: this.model.host.model?.id}).popOver(this, {width: '400px'})
        
        if( selected.val == 'clear' ){
            this.model.clear()
            return
        }

        this.model.open(selected.m)
        
    }

})

export default customElements.get('c-model-history-btn')