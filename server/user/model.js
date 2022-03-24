const Model = require('../model')
const bcrypt = require('bcrypt')
var crypto = require("crypto");
const AccessError = require('../errors').AccessError
const CollMap = require(bui`util/collmap`)

const serializedUsers = new Map()
const MIN_PW_LEN = 8

module.exports = class User extends Model {

    static get api(){return {
        sync: true,
        root: '/user',
        routes: [
            ['get', '/:id?', 'find'],
            ['put', '/:id?', 'update'],
            ['post', '', 'add'],
            ['patch', '/:id?', 'update'],
            ['put', '/:id/change-password', 'changePassword']
        ]
    }}

    get syncPath(){ 
        return this.apiPathPattern.stringify() }

    // override these fit own use

    get firstName(){
        return (this.name||'').split(' ')[0]||this.name
    }

    get isAdmin(){ return false }
    get emailHashKey(){ return 'email_hash' }

    get hasTempPassword(){
        return this.attrs.password_is_temp
    }

    async saveNewPassword(pw, isTemp=false){
        return this.update({
            password: pw,
            password_is_temp: isTemp,
            password_last_changed: new Date()
        })
    }

    // only existing admins can update these values
    get adminOnlyUpdates(){
        return ['type', 'is_admin']
    }

    get canUpdateOtherUsers(){
        return this.req.user.isAdmin
    }

    get config(){ return {
        table: 'users',
        tableAlias: 'u',
        jsonFields: ['settings']
    }}


// ==============================================================

    toJSON(){
        let data = Object.assign({}, this.attrs)
        // delete data.password
        return data
    }

    toString(){
        return JSON.stringify(this.toJSON())
    }

    constructor(attrs={}, req){

        if( attrs.id == 'me' )
            attrs.id = req.user.id

        super(attrs, req)
        this.req = req
        this.attrs = attrs
        this.sockets = new CollMap()

        if( this.emailHashKey ){
            this[this.emailHashKey] = this.attrs[this.emailHashKey] = null

            if( attrs.email )
                this[this.emailHashKey] = this.attrs[this.emailHashKey] = crypto.createHash('md5').update(attrs.email).digest("hex");
        }
    }

    async find(where){

        if( this.id 
        && this.id == this.req?.user?.id 
        && this.constructor == this.req.user?.constructor)
            return this.req.user
        
        let resp = await super.find(where)

        if( !this.id )
            resp.unshift(this.req.user)

        return resp
    }

    findParseRow(row){

        this.decodeJsonFields(row)

        let sessionUser = serializedUsers.get(row.id)
        if( sessionUser && sessionUser.sockets.size > 0 )
            row.online = true
        else
            row.online = false
    }

    validateUpdate(attrs){

        this.encodeJsonFields(attrs)

        if( attrs.email && this.emailHashKey )
            attrs[this.emailHashKey] = crypto.createHash('md5').update(attrs.email).digest("hex")

        // only existing admins can update these values
        if( !this.req.user?.isAdmin ){
            this.adminOnlyUpdates.map(k=>{
                delete attrs[k]
            })
        }

        return attrs
    }

    async update(attrs){

        // only internal users can update other users accounts
        if( this.id != this.req.user.id && !this.canUpdateOtherUsers )
            throw new AccessError()
        
        let resp = await super.update(attrs)

        // TODO: improve how attrs are updated?
        // merge updated attrs with the cached request user
        if( this.id == this.req.user.id)
            this.req.user.attrs = Object.assign(this.req.user.attrs, attrs)

        return attrs
    }

    async verifyPassword(pw){
        if( !this.attrs.password )
            return false
            
        return bcrypt.compare(pw, this.attrs.password)
    }

    async changePassword({temp=true}={}){

        // users can change their own passwords and admins can always change
        if( this.id != this.req.user.id && !this.req.user.isAdmin )
            throw new AccessError()

        await this.find()
        let {currentPW, newPW} = this.req.body

        // if NOT the logged in user, then only a temp password can be set
        let doSetTemp = temp == false ? false : this.id != this.req.user.id
        let isResetting = !doSetTemp && !this.req.user.hasTempPassword

        if( currentPW == newPW )
            throw new Error('same password')

        if( !newPW || newPW.length < MIN_PW_LEN )
            throw new Error('too short')

        if( !doSetTemp && isResetting && this.attrs.password && !await this.verifyPassword(currentPW) )
            throw new Error('invalid current password')

        let newPWHash = await this.constructor.encryptPassword(newPW)
        
        return this.saveNewPassword(newPWHash, doSetTemp)
    }

    static async encryptPassword(pw){
        return pw ? bcrypt.hash(pw, 10) : null
    }

    static async findBy(key="id", id){
        // FIXME: what if table is not `users`?
        let resp = await this.db.q(`SELECT * FROM users WHERE ${key} = ?`, id)
        
        if( !resp || resp.length == 0 )
            throw Error(key+' not found')

        return new this(resp[0], this.req)
    }

    static async login(email, password, req){
        
        let user = await this.findBy('email', email)

        if( !await user.verifyPassword(password) ){
            throw Error('password does not match')
        }
        
        return user
    }

    static async deserializeUser(id, idKey='id'){
        let key = id
        
        if( idKey != 'id')
            key = idKey+'_'+id

        if( !serializedUsers.get(key) ){
            let user = await this.findBy(idKey, id)
            if( user )
                serializedUsers.set(key, user)
        }

        return serializedUsers.get(key)
    }

    logout(){
        serializedUsers.delete(this.id)
    }

}