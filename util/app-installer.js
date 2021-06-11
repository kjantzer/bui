
class AppInstaller {

    constructor(){
        window.addEventListener('beforeinstallprompt', e=>{
            e.preventDefault() // stop android from showing "install banner"
            this._installer = e
        })
    }

    get canInstall(){ return this._installer }

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
}

// singleton
export default new AppInstaller()