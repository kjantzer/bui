/*
    Push Messages

    TODO
    - enable disabling of db tracking?
*/
const Model = require('../../server/model')
const webPush = require('web-push')
const {IF} = require('../push/consts')
const Subscriptions = require('./push-subscriptions') // TODO: support using subclass?

// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
    process.env.PUSH_MSG_CONTACT,
    process.env.PUSH_MSG_VAPID_PUBLIC_KEY,
    process.env.PUSH_MSG_VAPID_PRIVATE_KEY
);

module.exports = class PushMsg extends Model {

    static get IF(){ return IF }

    static api = {
        root: '/push-msg',
        routes: [
            ['get', '/public-key', 'publicKey']
        ]
    }

    config = {
        table: 'push_msgs',
        jsonFields: ['payload']
    }

    publicKey(){ return process.env.PUSH_MSG_VAPID_PUBLIC_KEY }
    generateVAPIDKeys(){
        // VAPID keys should be generated only once.
        return webpush.generateVAPIDKeys()
    }

    constructor(msg={}){
        super()
        this.msg = this.createMsg(msg)
    }

    createMsg(msg={}){
        
        // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
        msg = {
            // title: '',
            // body: '',
            icon: '/icons/big-sur-192.png', // FIXME:
            // tag: 'system',
            data: {},
            requireInteraction: IF.NO_CLIENT,

            showIf: IF.ALWAYS,
            debug: false,
            
            ...msg
        }

        msg.data = {
            path: '',
            groupTitle: 'New Updates',
            ...msg.data
        }

        return msg
    }

    async sendTo(users){

        let msg = this.msg

        if( !msg.title )
            throw new Error('`title` is required')

        // track push msg in the DB, then include the ID in the message
        await this.add({payload: this.msg})
        msg.data.id = this.id
        msg = JSON.stringify(msg)

        // make sure we have an array of users if only given one
        if( !Array.isArray(users) )
            users = [users]

        // could be user models, make sure we have list of user IDs
        let userIDs = users.map(u=>{return u.id || u}).filter(id=>id)

        // get all subscriptions for the user IDs
        // TODO: enable filtering by additional? (device, screen size, etc)
        let subs = await new Subscriptions().find({uid: userIDs})
        let receipients = []

        // a user may have multiple subscriptions
        await Promise.all(subs.map(async sub=>{
            try{
                await webPush.sendNotification(sub.sub, msg, {})
                receipients.push(sub.attrs.uid)

            }catch(err){

                console.log(err); // FIXME: may not be expired

                // an error *likely* means the sub is expired, so delete it now
                // NOTE: make should mark as deleted/expired instead?
                await sub.destroy().catch(err=>{
                    console.log('problem deleting expired subscription', err);
                })                
            }
        }))

        // track which recipients got message
        if( receipients.length ){
            
            receipients = Array.from(new Set(receipients)).map(uid=>{
                return {msg_id: this.id, uid}
            })

            await this.db.bulkInsert('push_msg_recipients', receipients).catch(err=>{})
        }
    }
}
