/*
    # Custom Errors

    `UIAlertError`  
    Generic alert. Defaults to `Dialog.alert`

    `UIPermissionError`  
    For when a user is not allowed to do something. Defaults to `Dialog.stopped`

    `UIWarningError`  
    Defaults to `Dialog.warning`

    `UIDeniedError`  
    Defaults to `Dialog.error`
*/
import Dialog from '../presenters/dialog'
import vibrate from '../util/vibrate'

// formats an error from the API response
Error.fromAPI = function(resp){
    let err = new Error(resp.error)
    err.name = resp.type
    err.data = resp.data
    err.errorCode = resp.code
    return err
}

export class UICustomError extends Error {
    
    constructor(msg='Error', detail){
        super(msg)
        this.name = 'UICustomError'
        this.detail = detail
        
        if( detail && detail.sound )
            this.sound = detail.sound
        
        if( detail?.vibrate )
            this.vibrate = detail.vibrate
    }

    get presenter(){
        return Dialog.alert(this.message)
    }

    get notifOpts(){
        return Object.assign({
            nid: this.name,
            animation: this.animation || 'bounce'
        },(this.detail&&this.detail.notif)||{})
    }

    handle(){
        this.logToConsole()
        if( this.detail?.silent !== true ){
            this.playFeedback()
            this.display()
        }
    }

    display(){
        let {presenter} = this
        
        if( this.detail&&this.detail.target ){

            this.detail.target.popOver?.close() // existing error

            if( this.detail.target.scrollIntoViewIfNeeded )
                this.detail.target.scrollIntoViewIfNeeded()
            else if( this.detail.target.scrollIntoView )
                this.detail.target.scrollIntoView()

            presenter.popOver(this.detail.target, {
                overflowBoundry: 'window',
                ...(this.detail?.popover||{})
            })

            if( this.detail.target.focus )
                this.detail.target.focus()
        
        }else{
            presenter.notif(this.notifOpts)
        }
    }

    playFeedback(){
        if( this.sound && window.soundFX )
            soundFX.play(this.sound, 2) // boost the volume (NOTE: ok in most cases?)
        
        if( this.vibrate )
            vibrate(this.vibrate)
    }

    logToConsole(){
        let {stack, detail, message} = this

        console.groupCollapsed(message)
        console.info(stack)
        
        if( detail )
            console.info('Detail:', detail)
        
        console.groupEnd()
    }
}

export class UIAlertError extends UICustomError {

    constructor(msg='Oops', ...args){
        super(msg, ...args)
        this.name = 'UIAlertError'
    }

    get presenter(){
        return Dialog.alert(this.message)
    }
}

export class UIAlertMsg extends UICustomError {

    constructor(msg='', ...args){
        super(msg, ...args)
        this.name = 'UIAlertMsg'
        this.animation = 'slide'
    }

    get presenter(){
        return Dialog.alert(this.message)
    }
}

export class UIPermissionError extends UICustomError {
    
    constructor(msg='You do not have permission', ...args){
        super(msg, ...args)
        this.sound = 'denied'
        this.name = 'UIPermissionError'
    }

    get presenter(){
        return Dialog.stopped({
            pretitle: this.detail?.pretitle||'',
            body: this.detail?.body||this.message,
            btns: false
        })
    }
}

export class UIWarningError extends UICustomError {
    
    constructor(msg='Sorry', ...args){
        super(msg, ...args)
        this.name = 'UIWarningError'
    }

    get presenter(){
        return Dialog.warn({
            pretitle: this.detail?.pretitle||'',
            body: this.detail?.body||this.message,
            btns: false
        })
    }
}

export class UIDeniedError extends UICustomError {
    
    constructor(msg='Not allowed', ...args){
        super(msg, ...args)
        this.name = 'UIDeniedError'
    }

    get presenter(){
        return Dialog.error({
            pretitle: this.detail?.pretitle||'',
            body: this.detail?.body||this.message,
            btns: false
        })
    }
}

export class UIError extends UICustomError {
    
    constructor(msg='Something went wrong', ...args){
        super(msg, ...args)
        this.name = 'UIDeniedError'
    }

    get presenter(){
        return Dialog.error({
            pretitle: this.detail?.pretitle||'',
            body: this.detail?.body||this.message,
            btns: false
        })
    }
}

export class UISilentError extends UICustomError {
    
    constructor(msg='', detail={}){
        detail.silent = true
        super(msg, detail)
        this.name = 'UISilentError'
    }

    get presenter(){
        return true
    }
}

