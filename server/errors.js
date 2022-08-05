/*
    Creates new Error class globals

    API.js knows how to handle them
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
