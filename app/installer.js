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

    async promptIOS({once=false, delay=0}={}){

        if( !device.isiOS || device.isInstalled ) return

        if( once && localStorage.getItem('has-prompted-ios-install') )
            return

        await new Promise(resolve=>setTimeout(_=>resolve(), delay))

        new Dialog({
            icon: 'install_mobile',
            title: 'Install this webapp',
            body: `Tap <b-text color="blue"><b-icon name="ios_share"></b-icon></b-text> and then <b>Add to Homescreen</b>`,
            color: 'inverse',
            btns: false
        }).notif({
            anchor: device.isTablet ? 'top-right' : 'bottom',
            autoClose: false
        })

        localStorage.setItem('has-prompted-ios-install', new Date().getTime())
    }
}

// singleton
export default new AppInstaller()