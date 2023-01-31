import {Model, Collection} from 'backbone'
import sync, {syncBackboneCollection} from '../../realtime/client/sync'
import {colorScheme} from '../../util/device'
import '../../helpers/backbone/relations'

export {colorScheme}

export const themeColors = [
    {label: 'Default', val:''},
    {label: 'Blue', val:'blue'},
    {label: 'Green', val: '27ae60'},
    {label: 'Pink', val:'pink'},
    {label: 'Purple', val:'deep-purple'},
    {label: 'Orange', val:'orange'},
    {label: 'Deep Orange', val:'deep-orange'},
    {label: 'Teal', val:'teal'},
    {label: 'Red', val: 'red-600'},
    {label: 'Cyan', val:'cyan'},
    {label: 'Indigo', val: 'indigo-A200'},
    {label: 'Mint', val: '00b894'}
]

export let settingsKey = 'settings'

let currentUser

export class Users extends Collection {

    get url(){ return '/api/user'}
    get model(){ return User }

    static set currentUser(user){
        currentUser = user
    }

    constructor(_currentUser, realtime){
        super()
        this.realtimeSync = sync(this.url, this)

        if( _currentUser){
            currentUser = _currentUser
            this.add(_currentUser)
        }

        // watch for online status changes
        if( realtime )
        realtime.socket.on('/user', resp=>{
            let user = this.get(resp.id)
            if( user )
                user.set(resp)
        })
    }

    onSync(sync){
        syncBackboneCollection.call(this, sync)
    }

    get online(){
        return this.filter(m=>m.isOnline)
    }

    fetch(opts={}){
        opts.merge = true
        return super.fetch(opts)
    }

    parse(resp){
        // first user will always be the logged in user
        // set singleton user object ID so the attributes will be merged
        if( currentUser ){
            currentUser.id = resp[0].id
            currentUser.set('id', resp[0].id)
        }

        return resp
    }
}

export class User extends Model {

    get url(){ return this.id ? '/api/user/'+this.id : '/api/user' }

    constructor(){
        super(...arguments)

        setTimeout(()=>{
            if( this.isMe ){
                this.applyTheme()
                this.on('change:'+settingsKey, this.applyTheme)
            }
        })
    }

    get models(){ return {
        [settingsKey]: UserSettings
    }}

    get settings(){ return this.get(settingsKey) }

    get hasAvatar(){ return this.get('has_avatar') && this.get('has_avatar').isValid() }

    get name(){ return this.attributes.name ? this.get('name') : '' }
    get email(){ return this.attributes.email ? this.get('email') : '' }
    get type(){ return this.attributes.type ? this.get('type') : '' }

    get isMe(){ return this === currentUser }
    get isOnline(){ return this.get('online') == '1' }

    get initials(){
        return this.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()
    }

    applyTheme(){
        colorScheme.setTheme(this.settings.get('theme'))
        colorScheme.setAccent(this.settings.get('theme_color'))
    }

    logout(){
        window.location = '/logout'
    }

    async login(data){
        
        data.username = data.username || this.get('username')

        // password must be set for login to work
        data.password = data.password || null

        let formData = new FormData();
        for(let key in data ){
            formData.append(key, data[key]);     
        }

        return fetch('/login', {
            method: 'post',
            credentials: 'include',
            body: formData
        }).then(r=>r.json())
    }

}

class UserSettings extends Model {

    save(...args){
        this.set(...args)
        return this.parentModel.saveSync('settings', this.toJSON(), {patch: true})
    }
}
