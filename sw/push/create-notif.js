import {getClient} from '../util'
import {IF} from './consts'

export const createNotif = async (opts)=>{

    if( !opts ) {
        console.log('no opts for push notif');
        return
    }

    opts.data = opts.data || {}
    opts.data.newMessageCount = 1

    let client = await getClient()

    if( opts.showIf === IF.NO_CLIENT && client )
        return

    if( opts.showIf === IF.NO_FOCUSED_CLIENT && client && client.focused ){

        // tell the client about the message
        if( client.postMessage )
            client.postMessage({name:'push', opts})

        return
    }

    if( opts.requireInteraction === IF.NO_CLIENT )
        opts.requireInteraction = !client

    // check to see if client is already at this path
    // FIXME:
    // if( opts.data.path && client ){
    //     let url = new URL(opts.data.path, self.location.origin).href

    //     if(url.match(client.url) )
    //         return
    // }

    // if notifID given, try to find an active matching notif so we can replace it
    let activeNotif = await getNotif(opts.tag)

    if( activeNotif ){

        const messageCount = activeNotif.data.newMessageCount + 1;

        opts.title = opts.data.groupTitle || 'New Updates'
        opts.body = `You have ${messageCount} new updates`;
        opts.data = Object.assign(activeNotif.data)
        opts.data.newMessageCount++

        // close old notif so only one is visible
        activeNotif.close();
    }

    return registration.showNotification(opts.title, opts );
}

export const getNotif = (id)=>{
    if( !id ) return
    return registration.getNotifications().then(notifs => {
        return notifs.find(notif=>notif.tag==id)
    })
}

export const notifClick = async (event)=>{

    var notif = event.notification;
    var action = event.action;

    if (action === 'close') {
        notif.close();
    } else {

        let client = await getClient()

        if( client ){
            client.focus()

        }else{
            client = await clients.openWindow(location.origin+(notif.data.path||''));
        }

        if( client && client.postMessage ){
            client.postMessage({
                name:'push:clicked',
                action: action,
                opts:{
                    title: notif.title,
                    tag: notif.tag,
                    data:notif.data
                }
            })
        }

        notif.close();
    }
}