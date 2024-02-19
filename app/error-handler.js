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
        width: '400px'
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
        notif.edge = true
        notif.icon = 'error'
    }

    if( error.name == 'APIAccessError' || error.type == 'APIAccessError' ){
        notif.edge = true
        notif.type = 'failed'
        // notif.accent = true
        notif.icon = 'warning'
        notif.width = 'auto'
        notif.animation = 'bounce'
    }

    if( error.name == 'DBError' || error.type == 'DBError' ){
        notif.pretitle = 'Database Error'
        notif.edge = true
        notif.accent = true
        notif.icon = 'alert'
        notif.width = 'auto'
    }
    
    new Notif(notif)
}

window.addEventListener('error', GlobalErrorHandler)
window.addEventListener('unhandledrejection', GlobalErrorHandler)