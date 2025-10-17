/*
    # Errors (server)

    Creates new Error class globals

    `server/api` knows how to handle them
*/
class APIError extends Error {

    code = 400

    constructor(msg, {name=null, code=null, data=null, req}={}){
        
        super(msg)

        this.name = name || this.constructor.name

        if( code )
            this.code = code

        if( data )
            this.data = data

        // better stack
        this.originalStack = this.stack
        this.stack = this.stackMsg({req})
    }
}

class APIAccessError extends APIError {

    code = 403

    constructor(msg='forbidden', opts){
        super(msg, opts)
    }
}

// NOTE: these wont be logged to console by the API
class ClientError extends APIError {

    constructor(msg, opts){
        super(msg, opts)
    }
}

global.APIError = APIError
global.APIAccessError = APIAccessError
global.ClientError = ClientError

Error.prototype.messageTrace = function({lines=1, replaceSingleQuotes=true}={}){
    let msg = this.stack
        .split('\n')
        .slice(0,1+lines)
        .map(s=>s.trim())
        .join(' ')

    if( replaceSingleQuotes ) // can mess up db inserts, so replace
        msg = msg.replace(/'/g, '’')

    msg = msg.replaceAll(process.cwd(), '')

    return msg
}


Error.prototype.stackMsg = function({req, type=true, err=true, lines=false, indent=true}={}){
    
    let cwd = process.cwd()

    let stack = this.originalStack || this.stack
    let msg = stack.split('\n')
        .filter(s=>!s.match(/\(node:/g)) // ignore node.js core files, only show our code
        .filter(s=>!s.match(/bui\/server\/api/g)) // ignore the "API" class since it's not helpful
        .map(s=>{
            // better formatting for each stack trace line
            return s.replace(/ at /, ' - ').replace(cwd, '')
        })

    if( req )
        msg.push(`    - [${req.method}] ${req.path} (user: ${req.user?.id})`)

    if( !indent )
        msg = msg.map(s=>s.replace(/^\s+/, ''))
    
    // remove the error message from the stack
    if( !err )
        msg.shift()

    // ie: `TypeError: the error message`
    if( !type )
        msg[0] = msg[0].replace(/^[a-z]+: /i, '')
    
    if( !lines )
        msg = msg.join('\n')

    return msg
}