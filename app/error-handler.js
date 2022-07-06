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

    let notif = {
        nid: 'js-error', // lets only show one at a time
        msg: msg,
        type: 'error',
        icon: 'bug',
        width: '400px'
    }

    if( msg.name && msg.name.name == 'API not found')
        notif.icon = 'terminal'

    // UsbPrinter
    if( msg == 'No device selected.' ){
        notif.type = 'alert',
        notif.icon = 'block'
        notif.width = 'auto'
    }

    if( msg == 'forbidden' ){
        notif.icon = 'lock'
        notif.msg = 'You DO NOT have permission for that'
    }
    
    new Notif(notif)
}

window.addEventListener('error', GlobalErrorHandler)
window.addEventListener('unhandledrejection', GlobalErrorHandler)