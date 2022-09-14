import config, {normalizePath, cleansePath} from './config'

export default class HistoryState {

    constructor(parent, props={}){

        this.parent = parent
        this.params = {}

        if( !props )
            props = {}

        if( !props.path )
            props.path = ''

        let [path, query] = props.path.split('?')

        let queryData = {}
        this.query = new URLSearchParams(query||props.query||'')

        if( query ){
            this.query.forEach((v, k)=>{
                queryData[k] = v
            })
        }
        
        // removing leading slash and #
        props.path = cleansePath(path)

        this.props = Object.assign({
            query: queryData,
            title: config.APP_TITLE
        }, props)
    }

    get num(){ return this.props.num }

    get isCurrent() {
        return !history.state || history.state.num == this.num
    }

    get isBefore(){
        return history.state && history.state.num > this.num
    }

    get isBack(){
        return this.isBefore()
    }

    get isAfter(){
        return !history.state || history.state.num < this.num
    }

    get isForward(){
        return this.isAfter()
    }

    get title(){
        return this.props.title
    }

    set title(title){
        this.update({title:title})
    }

    set path(path){
        path = cleansePath(path)
        this.update({path:path})
    }

    get path(){
        return normalizePath(this.props.path)
    }

    get normalizePath(){
        let path = this.props.path ? this.path : config.PATH_ROOT+config.PATH_PREFIX
        // return path
        let query = this.query.toString()
        return path+(query?'?'+query:'')
    }

    push(props={}){
        this.props = Object.assign(this.props, props)
        history.pushState(this.props, null, this.normalizePath)
        this.parent.save()

        if( this.props.title && this.isCurrent )
            document.title = this.props.title
    }

    update(props={}){

        // do not let num be updated, this is set when newly created
        delete props.num
        
        this.props = Object.assign(this.props, props)
        this.parent.save()

        if( !this.isCurrent ) return

        history.replaceState(this.props, null, this.normalizePath)
            
        if( this.props.title )
            document.title = this.props.title
    }

    toJSON(){
        return JSON.stringify(this.props)
    }
}