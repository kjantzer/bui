import Label from './label'

const DEFAULT_HIDE_TIME = 10 // seconds

customElements.define('b-new-badge', class extends Label{

    constructor(){
        super(...arguments)
        this.filled = 'red'
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()

        if( document.hasFocus() )
            this.startTimer()

        window.addEventListener('blur', this.stopTimer)
        window.addEventListener('focus', this.startTimer)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        window.removeEventListener('blur', this.stopTimer)
        window.removeEventListener('focus', this.startTimer)
    }

    startTimer(){
        if( this.hasAttribute('hidden') || this._hideAfterTimer ) return

        let hideAfter = parseInt(this.getAttribute('hide-after')||DEFAULT_HIDE_TIME)
        if( Number.isNaN(hideAfter) ) hideAfter = DEFAULT_HIDE_TIME

        this._hideAfterTimer = setTimeout(()=>{
            this.remove()
        }, hideAfter*1000)
    }

    stopTimer(){
        clearTimeout(this._hideAfterTimer)
        delete this._hideAfterTimer
    }

})

export default customElements.get('b-new-badge')