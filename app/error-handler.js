/*
    # Error Handler
    A catch-all error handler with support for custom UI errors. 

    ```js
    // import near the top of your app entry
    import 'bui/app/error-handler`
    ```

    After importing the error handler any uncaught error or promises will be caught and
    displayed to the use via `notif`.

    If a custom error was thrown (see `helpers/errors`) the handler will let the 
    custom error determine how to handle.

    Any subclassed `Error` with a `.handle` function will be handled this way

    ```js
    // Default example (displays as `notif`)
    if( !label )
        throw new UIWarningError('A label is required')

    // Example error with a target (will display with popover)
    if( !label )
        throw new UIDeniedError('A label is required', {target: inputEl})
    ```
*/
import Notif from '../presenters/notif'
import * as CustomErrors from './errors'

// make all custom errors globals
for( let CustomErrorName in CustomErrors ){
    if( window[CustomErrorName] )
        console.warn(`CustomError: global ${CustomErrorName} already exists`)
    else
        window[CustomErrorName] = CustomErrors[CustomErrorName]
}

const GlobalErrorHandler = (evt)=>{

    // error was handled somewhere else
    if( evt.cancelBubble ) return

    // error || unhandledrejection
    let error = evt.error || evt.reason

    // check for a custom error that has it's own `handle` logic
    if( error && error.handle ){
        evt.preventDefault();
        error.handle()
        return
    }

    let msg = error && (error.message || error.name)
    if( !msg ) return

    // NOTE: as of Jan 2024, seems to be a chrome bug
    if( msg == 'setPhotoOptions failed' ) return 

    let notif = {
        nid: 'js-error', // lets only show one at a time
        msg: msg,
        type: 'error',
        icon: 'bug',
        width: '400px',
        trace: true
    }

    if( msg.name && msg.name.name == 'API not found')
        notif.icon = 'terminal'

    // UsbPrinter
    if( msg == 'No device selected.' ){
        notif.type = 'alert'
        notif.icon = 'block'
        notif.width = 'auto'
    }

    if( msg == `Failed to execute 'claimInterface' on 'USBDevice': Unable to claim interface.` ){
        notif.type = 'alert'
        notif.icon = 'print' // NOTE: change to usb icon?
        notif.autoClose = false
        notif.msg = `<b>Cannot Use USB Printer</b>
                    <br>Only one tab can use the USB printer`
    }

    if( msg == 'forbidden' ){
        notif.icon = 'lock'
        notif.msg = 'You DO NOT have permission for that'
    }

    if( error.name == 'APIError' || error.type == 'APIError' ){
        notif.type = 'failed'
        // notif.edge = true
        notif.icon = 'error'
    }

    if( error.name == 'APIAccessError' || error.type == 'APIAccessError' ){
        notif.trace = false
        notif.edge = true
        notif.type = 'failed'
        // notif.accent = true
        notif.icon = 'warning'
        notif.width = 'auto'
        notif.animation = 'bounce'
    }

    if( error.name == 'DBError' || error.type == 'DBError' ){
        notif.pretitle = 'Database Error'
        // notif.edge = true
        // notif.accent = true
        notif.icon = 'error'
        notif.width = 'auto'
        notif.trace = false
    }

    if( error.stack?.match('xhrError') ){
        notif.pretitle = 'Server Error'
        notif.icon = 'database'
        notif.trace = false

        console.warn('Server Error:', notif.msg+'\n'+error.trace.join("\n"))
        
        if( error.trace )
            notif.msg += `<b-text block xs><b-code block style="margin-top: 0.5em; line-height: 1.2em;">${error.trace.join("\n")}</b-code></b-text>`
    }
    
    let n = new Notif(notif)
    
    // optional feature
    // provides a readable stack trace
    if( window.mapStackTrace && error.stack && notif.trace )
        window.mapStackTrace(error.stack, stack=>{

            stack = stack
            .filter(s=>!s.match(/node_modules/))
            .filter(s=>!s.match(/bui/))
            .filter(s=>!s.includes(location.host))
            .map(s=>{
                return s
                .replace(/^\s+ at /, '')
                .replace(/__WEBPACK_DEFAULT_EXPORT__/, '')
                .replace(/webpack:\/\/catalog-v6\//, '')
            })
            
            n.msg += `<b-text block xs><b-code block style="margin-top: 0.5em; line-height: 1.2em;">${stack.join("\n")}</b-code></b-text>`

        })
}

window.addEventListener('error', GlobalErrorHandler)
window.addEventListener('unhandledrejection', GlobalErrorHandler)