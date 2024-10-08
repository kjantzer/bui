/*
    # Contextmenu

    Hooks up click events that will call `clickMenu` and `contextMenu` if those methods exist

    ```js
    customElements.define('element-name', class extends LitElement{

        clickMenu(){ console.log('element was clicked') }

        contextMenu(){ console.log('element was right+clicked') }
    })
    ```
*/
// TODO: rename to `click-events`
import {LitElement} from 'lit'

const LitElement_firstUpdated = LitElement.prototype.firstUpdated

LitElement.prototype.firstUpdated = function(){
    LitElement_firstUpdated.apply(this, ...arguments)

    if( this.clickMenu )
        this.addEventListener('click', e=>{
            e.preventDefault()
            e.stopPropagation()
            this.clickMenu(e)
        })

    // conflicts with existing code
    // I want this, but need to alert of larger refactor
    // if( this.onClick && !this.clickMenu )
    //     this.addEventListener('click', e=>{
    //         e.preventDefault()
    //         e.stopPropagation()
    //         this.onClick(e)
    //     })

    if( this.contextMenu )
        this.addEventListener('contextmenu', e=>{
            if( !e.metaKey )
                e.preventDefault() // stop normal context menu
            e.stopPropagation()
            this.contextMenu(e)
        })
}
