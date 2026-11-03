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

    ## Reporting
    An app can let people send an error to a developer: bug notifs get a "Send to Developer" btn (under the message)

    ```js
    import {setErrorReporter} from 'bui/app/error-handler'
    setErrorReporter(({name, msg, stack, url})=>fetch('/api/errors', {method: 'POST', ...}))
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

// (see "Reporting" above)
let reporter = null
export function setErrorReporter(fn){ reporter = fn }

// the error notif stays while sending, then becomes the result (same nid: it morphs in place)
async function report(notif, btn, error, stack){

    if( btn.spin ) return // (already sending)
    btn.spin = true
    notif.hold('sending')

    try{
        await reporter({
            name: error.name,
            msg: error.message || String(error),
            stack: (stack || error.stack?.split('\n') || []).join('\n'),
            url: location.href
        })
        new Notif({nid: notif.nid, msg: 'Sent to the developer. Thanks!', icon: 'check', type: 'success', autoClose: 2500})
    }catch(err){
        new Notif({nid: notif.nid, msg: 'Could not send the error: '+err.message, type: 'error', icon: 'error'})
    }
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
        notif.icon = 'usb'
        notif.autoClose = false
        notif.msg = `<b>Cannot Use USB device</b>
                    <br>Only one tab can use that USB device`
    }

    if( msg == 'forbidden' ){
        notif.icon = 'lock'
        notif.msg = 'You DO NOT have permission for that'
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
    else if( error.name == 'DBError' || error.type == 'DBError' ){
        notif.pretitle = 'Database Error'
        // notif.edge = true
        // notif.accent = true
        notif.icon = 'error'
        notif.width = 'auto'
        notif.trace = false
    }
    // server error (ajax)
    else if( error.stack?.match(/xhrError|AJAX/i) || error.ajax ){

        notif.trace = false

        // if NOT a default/core error, then treat it as a "good" client error (present less as a "bug" and more of a alert to user)
        if( !['TypeError', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'URIError', 'InternalError', 'Error'].includes(error.type) ){

            // notif.pretitle = error.type
            notif.type = 'failed'
            notif.icon = 'error'
            

        }else{
            notif.pretitle = 'Server Error'
            notif.icon = 'database'

            // did server respond with a trace? display it
            if( error.trace ){
                console.warn('Server Error:', notif.msg+'\n'+error.trace.join("\n"))
                notif.msg += `<b-text block xs><b-code block style="margin-top: 0.5em; line-height: 1.2em;">${error.trace.join("\n")}</b-code></b-text>`
            }
        }
    }
    
    // (mapped stack, once ready; see below)
    let fullStack = null

    // bugs (not alerts/server errors) can be sent to a developer
    if( reporter && notif.trace && notif.type == 'error' ){
        notif.btns = [{label: 'Send to Developer', icon: 'send', color: 'theme', title: 'Send this error to the developer'}]
        notif.btnsBelow = true
        notif.autoClose = 12000 // (time to read it and click)
        notif.onClick = (n, btn)=>{
            if( !btn ) return
            report(n, btn, error, fullStack)
            return false // (stays open; see report)
        }
    }

    let n = new Notif(notif)
    
    // optional feature
    // provides a readable stack trace
    if( window.mapStackTrace && error.stack && notif.trace )
        // anonymous fn frames (`at url:line:col`, ex: an arrow fn callback) aren't parsed by mapStackTrace (it needs
        // `at name (url:line:col)`), so they'd stay unmapped; name them so they map like the rest
        window.mapStackTrace(error.stack.replace(/^(\s+at (?:async )?)([^\s()]+:\d+:\d+)\s*$/gm, '$1anonymous ($2)'), stack=>{

            let clean = s=>s
                .replace(/^\s+ at /, '')
                .replace(/__WEBPACK_DEFAULT_EXPORT__/, '')
                .replace(/webpack:\/\/catalog-v6\//, '')

            fullStack = stack.map(clean)

            // the app's own frames
            let appStack = stack
            .filter(s=>!s.match(/node_modules/))
            .filter(s=>!s.match(/bui/))
            .filter(s=>!s.includes(location.host))
            .map(clean)

            // (none, ex: thrown in a library called from a library event): the top of the source mapped stack
            // (unmapped frames are bundle urls/lines, not worth showing)
            if( !appStack.length )
                appStack = stack
                .filter(s=>!s.includes(location.host))
                .map(clean)
                .map(s=>s.replace(/node_modules\//, ''))
                .slice(0, 6)

            if( appStack.length )
                n.msg += `<b-text block xs><b-code block style="margin-top: 0.5em; line-height: 1.2em;">${appStack.join("\n")}</b-code></b-text>`

        })
}

window.addEventListener('error', GlobalErrorHandler)
window.addEventListener('unhandledrejection', GlobalErrorHandler)