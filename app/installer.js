/*
    # AppInstaller

    Makes it easy to prompt user to install the PWA app. It's a singleton class so you can import and use in many places.

    ```js
    // import this early in your code to capture the installer event
    import 'bui/app/installer'

    //... somewhere else (say your app header)
    import AppInstaller from 'bui/app/installer'

    html`
        ${AppInstaller.canInstall?html`
            <b-btn @click=${AppInstaller.install}>Install</b-btn>
        `:''}
    `

    // if you need to react to when the installer becomes available...
    AppInstaller.canInstallPromise.then(canInstall=>this.update())
    ```
*/
import Dialog from '../presenters/dialog'
import device from '../util/device'

class AppInstaller {

    constructor(){

        this.install = this.install.bind(this)
        
        this._promise = new Promise(resolve=>{
            window.addEventListener('beforeinstallprompt', e=>{
                e.preventDefault() // stop android from showing "install banner"
                this._installer = e
                resolve(true)
            })
        })
    }

    get canInstallPromise(){ return this._promise }

    get canInstall(){ return !!this._installer }

    async install(){

        if( this._installer ){
            this._installer.prompt()
            let choice = await this._installer.userChoice
            
            if( choice.outcome == 'accepted'){
                this._installer = null
                return true
            }

            return choice.outcome
        }

        return false
    }

    async promptInstall(opts){
        this.promptIOS(opts)

        // iOS can't "install" so we can just test for this
        if( await this.canInstallPromise )
            this._promptInstall(opts)
    }

    async promptMobileInstall(opts){
        this.promptIOS(opts)
        this.promptAndroid(opts)

        this._promptInstall(opts) // TEMP
    }

    async promptIOS(opts={}){

        if( !device.isiOS ) return
        
        return this._promptInstall({
            ...opts,
            msg: !device.isIosSafari?
                /*html*/`<b-text block>Open this app in the default Safari browser to install.</b-text>`
                :/*html*/`Tap <b-text color="blue"><b-icon name="ios_share"></b-icon></b-text> and then <b>Add to Homescreen</b>`
        })
    }

    async promptAndroid(opts={}){
        if( !device.isAndroid ) return
        return this._promptInstall(opts)
    }

    async _promptInstall({msg=null, once=false, delay=0}={}){

        if( device.isInstalled ) return

        if( once && localStorage.getItem('has-prompted-install') )
            return

        await new Promise(resolve=>setTimeout(_=>resolve(), delay))

        new Dialog({
            icon: device.isTouch ? 'install_mobile' : 'install',
            title: 'Install this App',
            body: msg||/*html*/`
                Tap here to install for the best experience
            `,
            color: 'inverse',
            btns: false
        }).notif({
            anchor: device.isSmall ? 'bottom' : 'top-right',
            autoClose: false,
            onClick: (notif, btn)=>{
                this.install()
            }
        })

        localStorage.setItem('has-prompted-install', new Date().getTime())
    }

}

// singleton
export default new AppInstaller()