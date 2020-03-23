module.exports = {
    
    AccessError: class extends Error {
        constructor(msg='forbidden', code=403){
            super(msg)
            this.name = 'AccessError'
            this.code = code
        }
    },

    EmailError: class extends Error {
        constructor(msg='email error', code=400){
            super(msg)
            this.name = 'EmailError'
            this.code = code
        }
    }

}