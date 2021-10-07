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
        return Object.assign((this.detail&&this.detail.notif)||{}, {nid: this.name})
    }

    handle(){
        this.playSound()
        this.logToConsole()
        this.display()
    }

    display(){
        let {presenter} = this
        
        if( this.detail&&this.detail.target ){
            
            presenter.popover(this.detail.target)
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

        console.group(message)
        console.info(stack)
        
        if( detail )
            console.info('Detail:', detail)
        
        console.groupEnd()
    }
}

export class UIPermissionError extends UICustomError {
    
    constructor(msg='You do not have permission', ...args){
        this.sound = 'denied'
        super(msg, ...args)
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
        return Dialog.warn(this.message)
    }
}

export class UIDeniedError extends UICustomError {
    
    constructor(msg='Not allowed', ...args){
        super(msg, ...args)
        this.name = 'UIDeniedError'
    }

    get presenter(){
        return Dialog.error({
            pretitle: '',
            body: this.message,
            btns: false
        })
    }
}

