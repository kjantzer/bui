import Dialog from '../presenters/dialog'

export class UICustomError extends Error {
    
    constructor(msg='Error', detail){
        super(msg)
        this.name = 'UICustomError'
        this.detail = detail
        
        if( detail && detail.sound )
            this.sound = detail.sound
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
            this.playSound()
            this.display()
        }
    }

    display(){
        let {presenter} = this
        
        if( this.detail&&this.detail.target ){

            if( this.detail.target.scrollIntoViewIfNeeded )
                this.detail.target.scrollIntoViewIfNeeded()
            else if( this.detail.target.scrollIntoView )
                this.detail.target.scrollIntoView()

            presenter.popover(this.detail.target)

            if( this.detail.target.focus )
                this.detail.target.focus()
        
        }else{
            presenter.notif(this.notifOpts)
        }
    }

    playSound(){
        if( this.sound && window.soundFX )
            soundFX.play(this.sound)
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

export class UIPermissionError extends UICustomError {
    
    constructor(msg='You do not have permission', ...args){
        super(msg, ...args)
        this.sound = 'denied'
        this.name = 'UIPermissionError'
    }

    get presenter(){
        return Dialog.stopped(this.message)
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

