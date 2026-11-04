/*
    # Focus

    ```js
    import {activeElement, isTyping} from 'bui/util/focus'

    activeElement() // the focused element, inside shadow roots
    isTyping() // focus is in a text field (so key shortcuts should be ignored)
    ```

    Use `isTyping()` rather than `document.activeElement == document.body` to decide if a key shortcut applies:
    focus is often left on whatever was clicked last (ex: an app sidebar link), which isn't the body
    but shouldn't stop shortcuts either
*/

export function activeElement(root=document){
    let el = root.activeElement
    while( el?.shadowRoot?.activeElement )
        el = el.shadowRoot.activeElement
    return el
}

const EDITABLE = 'input:not([type="checkbox"], [type="radio"], [type="button"], [type="submit"], [type="reset"], [type="range"], [type="color"], [type="file"]), textarea, select'

export function isTyping(){
    let el = activeElement()
    if( !el || el == document.body ) return false
    return el.isContentEditable || el.matches(EDITABLE)
}
