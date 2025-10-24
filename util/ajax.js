/*
    # AJAX

    Simple class for when needing to use `XMLHttpRequest` instead of `Fetch`

    ```js
    let req = new AJAX(method, url)

    req.on('progress', e=>{
        console.log(e.loaded, e.total)
    })

    let resp = await req.send(formData)
    ```
*/
export default class AJAX {

    constructor(method, url){
        
        this.method = method
        this.url = url

        this.xhr = new XMLHttpRequest()
        
        this.on('load', this._onDone, false);
        this.on('abort', this._onAbort, false);
        this.on('error', this._onError, false);
    }

    on(eventName, cb){
        cb = cb.bind(this)
        this.xhr.addEventListener(eventName, cb, false)

        // upload progress must be set on .upload
        if( eventName == 'progress' )
            this.xhr.upload.addEventListener(eventName, cb, false)

        return this
    }

    send(){
        this.xhr.open(this.method, this.url);
        this.xhr.setRequestHeader('x-requested-with', 'xmlhttprequest')
        this.xhr.send(...arguments)

        return new Promise((resolve, reject)=>{
            this.resolve = resolve
            this.reject = reject
        })
    }

    _onDone(e){
        let resp = this.xhr.responseText

        // parse JSON if it looks like it
        if( resp && (resp[0] == '{' || resp[0] == '[') ){
            try{
                resp = JSON.parse(resp)

            }catch(err){

                if( this.xhr.status == 200 ){
                    this.xhr.status = 400
                    this.xhr.statusText = err.message
                }
            }
        }

        if( this.xhr.status != 200 ){

            let err = new Error(this.xhr.statusText||'Unknown error')
            err.errorCode =  this.xhr.status

            if( resp ){
                err.type = resp?.type
                err.trace = resp?.trace
            }
            
            if( resp && resp.error ){
                err.message = resp.error

                if( resp.type )
                    err.name = resp.type

                if( resp.data )
                    err.data = resp.data
            }
            
            return this.reject&&this.reject(err)
        }

        this.resolve&&this.resolve(resp)
    }

    _onAbort(e){
        // should error be thrown instead?
        this.resolve&&this.resolve()
    }

    _onError(e){
        this.reject&&this.reject()
    }
}