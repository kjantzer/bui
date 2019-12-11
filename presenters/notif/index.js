import { LitElement, html, css } from 'lit-element'
import Controller from './controller'
import device from '../../util/device'
import style from './style'
import TYPES from './types'
import './snackbar'

// list of open notifs
const NOTIFS = new Map()

window.NOTIFS = NOTIFS

customElements.define('b-notif', class extends LitElement{

    static get styles(){return style}

    static get properties(){ return {
        nid: {type: String, reflect: true},
        msg: {type: String},
        btns: {type: Array},
        icon: {type: String},
        color: {type: String, reflect: true},
        animation: {type: String, reflect: true},
    }}

    constructor(opts={}){
        super()

        this.onWindowFocus = this.onWindowFocus.bind(this)
        this.onWindowBlur = this.onWindowBlur.bind(this)

        this.opts = Object.assign({
            nid: String(Math.round(Math.random() * 10000)),
            msg: '',
            icon: '',
            btns: [],

            animation: device.minScreenSize <= 699 ? 'grow' : 'slide',
            animationForReplace: 'grow',
            
            autoClose: 4000,
            closeOnClick: true,

            controller: 'main',
            anchor: 'bottom-right', //device.minScreenSize <= 699 ? 'bottom' : 'bottom-right',

            onClose(){},
            onClick(){}
        }, (TYPES[opts.type]||{}), opts)

        let props = this.constructor.properties

        for( let key in this.opts ){
            if( props[key] != undefined )
                this[key] = this.opts[key]
        }        

        this.slot = this.opts.anchor
        
        this.addEventListener('click', this.onClick, false)
        this.addEventListener(device.isMobile?'touchdown':'mouseover', this.onMouseOver)
        this.addEventListener(device.isMobile?'touchend':'mouseout', this.onMouseOut)

        if( this.opts.view )
            this.appendChild(this.opts.view)

        let existingNotif = NOTIFS.get(this.nid)

        NOTIFS.set(this.nid, this)

        if( existingNotif ){
            existingNotif.replaceWith(this)
            return
        }

        let controller = Controller.get('main')
        
        if( controller )
            controller.appendChild(this)
            
    }

    close(btn){
        return new Promise(resolve=>{

            this.style.height = (this.getBoundingClientRect().height)+'px';
            this.classList.remove('entered')
            
            setTimeout(()=>{
                this.classList.add('exit')
            },100)

            setTimeout(()=>{
                this.remove()
                NOTIFS.delete(this.nid)
                this.opts.onClose(this)
                resolve(btn)
            },700)

        })
    }

    replaceWith(el){
        let animation = el.animation
        
        // let's reduce visual animation when replacing
        if( animation == 'slide' ){
            this.animation = this.opts.animationForReplace
            el.animation = this.opts.animationForReplace
        }
        
        this.classList.remove('entered')
        
        // setTimeout(()=>{
            super.replaceWith(el)

            setTimeout(()=>{
                el.animation = animation
            },310)

        // },310)
    }

    onClick(btn){
        
        if( btn instanceof MouseEvent || btn instanceof TouchEvent )
            btn = undefined

        if( this.opts.onClick(this, btn) !== false && this.opts.closeOnClick )
            this.close(btn)
    }

    onWindowFocus(){
        this.autoClose(3000)
    }

    onWindowBlur(){
        // this.autoClose(false)
    }

    onMouseOver(e){
        e.stopPropagation()
        this.autoClose(false)
    }

    onMouseOut(e){
        e.stopPropagation()
        this.autoClose(3000)
    }

    connectedCallback(){
        super.connectedCallback()

        window.addEventListener('blur', this.onWindowBlur)
        window.addEventListener('focus', this.onWindowFocus)

        setTimeout(()=>{
            this.classList.add('entered')
        },100)

        this.autoClose()
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('blur', this.onWindowBlur)
        window.removeEventListener('focus', this.onWindowFocus)
    }

    autoClose(start=true){

        clearTimeout(this._autoCloseTimeout)

        if( !document.hasFocus() ) return

        // use the `autoClose` delay if no time given OR we've never started the autoClose
        let delay = start===true||!this._autoCloseTimeout?this.opts.autoClose:start

        // requested to stop, or setting turned off
        if( !start || !this.opts.autoClose ) return
        
        this._autoCloseTimeout = setTimeout(()=>{
            this.close()
        }, delay)
    }

    render(){return html`
        <main>
        <slot>
            <b-snackbar
                .icon=${this.icon}
                .msg=${this.msg}
                .btns=${this.btns}
                @click=${this.onSnackbarClick}></b-snackbar>
        </slot>
        </main>
    `}

    onSnackbarClick(e){
        e.stopPropagation()
        let data = e.constructor.name == 'CustomEvent' ? e.detail : undefined
        this.onClick(data)
    }
    

})

export default customElements.get('b-notif')

let Notif = customElements.get('b-notif')
window.Notif = Notif // TEMP

import Dialog from 'dialog'

setTimeout(()=>{

    return

    // let notifs = document.createElement('b-notifs')
    // document.body.appendChild(notifs)

    new Notif({
        nid: 'notif1',
        msg: 'notif 1',
        type: 'info',
        autoClose: false,
        onClick(notif, btn){

            console.log(btn);
            
            new Notif({
                nid: notif.nid, // replace
                msg: 'Done',
            })
            return false
        },
    })

    new Notif({
        msg: 'Folder deleted',
        autoClose: false,
        btns: [{label: 'Undo'}],
        onClick(notif, btn){

            if( btn )
                return false
        }
    })

     new Notif({
        icon: html`<a-user-avatar class="icon" uid=2></a-user-avatar>`,
        msg: html`<b-sub>Hell Divers</b-sub><br><div>2 new messages</div>`,
        autoClose: false,
        btns: [{label: 'View'}],
    })

    // setTimeout(()=>{

    //     let dialog = Dialog.alert({title: 'Alert'})
    //     console.log(dialog);
        
    //     new Notif({view: dialog.el})

    // },1000)

    setTimeout(()=>{

        new Notif({
            msg: 'Cannot do that, sorry',
            type: 'warning',
        })

        new Notif({
            msg: 'Download finished',
            type: 'success',
        })

    },1000)


},300)