
const APP_TITLE = document.title

export default class HistoryState {

    constructor(parent, props){
        this.parent = parent

        let [hash, query] = location.hash.split('?')

        if( query ){
            query = new URLSearchParams(query)
            let queryData = {}
            query.forEach((v, k)=>{
                queryData[k] = v
            })
            query = queryData
        }

        this.props = Object.assign({
            path: location.pathname,
            hash: hash,
            query: query,
            title: APP_TITLE
        }, props)
    }

    get num(){ return this.props.num }

    get isCurrent() {
        return history.state && history.state.num == this.num
    }

    get isBefore(){
        return history.state && history.state.num > this.num
    }

    get isBack(){
        return this.isBefore()
    }

    get isAfter(){
        return history.state && history.state.num < this.num
    }

    get isForward(){
        return this.isAfter()
    }

    get path(){
        return this.props.path+this.props.hash
    }

    update(props){
        this.props = Object.assign(this.props, props)
        
        // if( this.isCurrent )
        // FIXME: hmmm...this is causing problems (#1930)
        // ...why did I do this in the first place? Do I actually need it?
        // yes, I need it, add hacky path check for now
        if( (!history.state || history.state.num == undefined) && this.path && this.path != '/' )
            history.replaceState(this.props, null, this.path)
            
        this.parent.save()

        if( this.props.title && this.isCurrent )
            document.title = this.props.title
    }

    toJSON(){
        return JSON.stringify(this.props)
    }
}