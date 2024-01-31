import Dialog from '../../presenters/dialog'
import realtime from './index'

Dialog.realtimeProgress = function(syncPath, opts, notifOpts={}){

    if( (opts.title || opts.body) && !opts.btns )
        opts.btns = false

    let d = new Dialog.alert(opts)
    let resolve

    function progress(resp){
            
        if( opts.onProgress )
            opts.onProgress(resp)

        if( resp && resp.progress ){
            d.body = resp.progress
        }

        if( resp === true || resp.error ){
            resolve()
        }
    }

    realtime.socket.on(syncPath, progress)
 
    let promise = new Promise(_resolve=>{
        resolve = _resolve

        d.notif({anchor: 'top-right', autoClose: false, closeOnClick: false, ...notifOpts})

    }).then(r=>{
        d.close()
        realtime.socket.off(syncPath, progress)
    })

    return {promise, resolve, dialog: d}
}