/*
    # Virtualizer

    Imports `<lit-virtualizer>` with a fix: a layout update can finish after the virtualizer
    was disconnected (ex: a datepicker in a popover that just closed), which throws
    "Cannot read properties of null (reading 'observe')" (@lit-labs/virtualizer 2.0.12).
    The update is skipped once it's disconnected

    ```js
    import 'bui/helpers/lit/virtualizer'
    ```
*/
import {LitVirtualizer} from '@lit-labs/virtualizer'
import {virtualizerRef} from '@lit-labs/virtualizer/virtualize.js'

// (the Virtualizer class isn't exported, so its prototype is patched from the first instance)
function patch(virtualizer){
    let proto = virtualizer && Object.getPrototypeOf(virtualizer)
    if( !proto || proto.__finishPatched || !proto._finishDOMUpdate ) return

    let finish = proto._finishDOMUpdate
    proto._finishDOMUpdate = function(...args){
        if( !this._childrenRO ) return // (disconnected)
        return finish.apply(this, args)
    }
    proto.__finishPatched = true
}

const updated = LitVirtualizer.prototype.updated
LitVirtualizer.prototype.updated = function(...args){
    updated?.apply(this, args)
    patch(this[virtualizerRef])
}
