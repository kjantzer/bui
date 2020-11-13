
export default class ContentEditableHistory {

    constructor({capture, apply}={}){
        this.captureHistory = capture
        this.applyHistory = apply
        this.at = 0
        this.log = []
    }

    mark(){
        // splices history at current history index (and removes all history after current index)
        this.log.splice(this.at+1, Number.MAX_VALUE, this.captureHistory())
        this.at = this.log.length - 1;
    }

    markAfterDelay(ms){
        this.cancelMark()
        this._markDelay = setTimeout(this.mark.bind(this), ms||0);
    }

    cancelMark(){
        clearTimeout( this._markDelay )
    }

    undo(){
        if( this.at <= 0 ) return;
        this.applyHistory(this.log[ --this.at ])
    }

    redo(){
        if( this.at >= this.log.length - 1 ) return;
        this.applyHistory(this.log[ ++this.at ])
    }
}