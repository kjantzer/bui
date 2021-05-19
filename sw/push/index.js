/*
    Push Messages

    Listen for and handle push events
*/
import {createNotif, notifClick} from './create-notif'

addEventListener('push', event=>{
    const opts = event.data ? event.data.json() : false;
    event.waitUntil(createNotif(opts));
});

addEventListener('notificationclick', event=>{
    event.waitUntil(notifClick(event))
});