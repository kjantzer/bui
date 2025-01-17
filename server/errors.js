/*
    # Errors (server)

    Creates new Error class globals

    `server/api` knows how to handle them
*/
class APIError extends Error {

    code = 400

    constructor(msg, {name=null, code=null, data=null}={}){
        
        super(msg)

        this.name = name || this.constructor.name

        if( code )
            this.code = code

        if( data )
            this.data = data
    }
}

class APIAccessError extends APIError {

    code = 403

    constructor(msg='forbidden', opts){
        super(msg, opts)
    }
}

global.APIError = APIError
global.APIAccessError = APIAccessError

Error.prototype.messageTrace = function({lines=1, replaceSingleQuotes=true}={}){
    let msg = this.stack
        .split('\n')
        .slice(0,1+lines)
        .map(s=>s.trim())
        .join(' ')

    if( replaceSingleQuotes ) // can mess up db inserts, so replace
        msg = msg.replace(/'/g, '’')

    if( globalThis.ROOT_PATH )
        msg = msg.replaceAll(ROOT_PATH, '')

    return msg
}