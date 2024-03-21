/*
    Pi Pico with Kaluma over WebSerial

    Based on: https://www.mathsuniverse.com/pico
*/
import Emitter from 'component-emitter'

class PiPico {

    #usbVendorId = 0x2E8A
    #port = null
    #reader = null
    #writer = null
    #currentRead = []
    #readValue = ''

    constructor(){
        this.onDisconnect = this.onDisconnect.bind(this)
        
        // attempt to reconnect automatically (assuming user already connected to port)
        this.connect()
    }

    get isConnected(){
        return this.#reader && this.#port ? true : false
    }

    async connect(){
        // get connected ports - only works if user already requested port
        const ports = await navigator.serial.getPorts()

        // get the port that we want (ideally based on ID, but that is not yet supported)
        // see https://github.com/WICG/serial/issues/128
        this.#port = ports?.find(port=>port.getInfo().usbVendorId)
        this.#setupDevice()
    }

    async requestPort(){
        try{
            this.#port = await navigator.serial.requestPort({ filters: [{ usbVendorId: this.#usbVendorId }] })
            this.#setupDevice({elseError: true}) // show error since user requested device
        }catch(err){
            if( err.message.match('No port selected by the user') ) return
            throw err
        }
    }

    async #setupDevice({elseError=false}={}){

        if( !this.#port ) return // nothing to setup

        try{
            await this.#port.open({ baudRate: 115200 })
        }catch(err){
            // may not want to show error
            // only one tab can connect to serial port; so auto connect shouldn't show error
            if( elseError ){
                // this port already connected, no need to error
                if( err.message.match('port is already open') ) return

                // show friendly message; as this is usually the reason
                if( err.message.match('Failed to open serial port.') )
                    throw new (globalThis.UIWarningError||Error)('Failed to connect to Pico. May be in use by another tab or program.')

                throw err
            }
            else
                return // don't continue with setup
        }

        this.#reader = this.#port.readable.getReader()
        this.#writer = this.#port.writable.getWriter()

        // keep the messages we write from being printed (echoed)
        this.write('.echo off')
        this._writeResponse = null // as if from a "push"
        this.read()

        this.emit('connected')

        this.#port.addEventListener('disconnect', this.onDisconnect)
    }

    // serial port was disconnected
    onDisconnect(){
        this.#port = null
        this.#reader?.releaseLock()
        this.#reader = null
        this.#writer = null
        this.emit('disconnected')
    }

    async write(data, type='text'){

        return new Promise(async resolve=>{
            this._writeResponse = resolve

            if (type === 'text') 
                await this.#writer.write((new TextEncoder()).encode(data + '\r'))
            else 
                await this.#writer.write(data) // Uint8Array
        })
    }

    async read(){
        try {
            while( true ){

                const { value } = await this.#reader.read()
                let arr = Array.from(value)

                // TODO: clean this up? mostly unchanged from src code
                for (let i = 0; i < arr.length; i++) {
                    // deal with escape sequences (or at least, ignore them for now)
                    if (arr[i] === 27) this.#outputLine() // 27=ESC
                    if (arr[i] === 67 && !this.#currentRead.length) {
                        this.#currentRead.push(arr[i])
                        this.#outputLine()
                    }
                    else if (this.#currentRead[0] === 27 && arr[i] === 109) { // eg ESC[0m to reset style
                        this.#outputLine()
                    }
                    else if (arr[i] === 67 && this.#currentRead[0] === 27) {
                        this.#outputLine() // 67 = C used to escape an escape sequence(?)
                    } else {
                        if (arr[i] !== 6) this.#currentRead.push(arr[i]) // 6=ACK
                        
                        let len = this.#currentRead.length
                        if (this.#currentRead[len - 2] === 13 && this.#currentRead[len - 1] === 10) {
                            this.#outputLine()
                        }
                    }
                }
            }
        } catch (e) {
            // console.log('Read from Pico error', e)
        } finally {
            this.#reader?.releaseLock()
        }
    }

    #outputLine(){

        // capture multi line read as one "value"
        clearTimeout(this._readFinished)

        // ignore ESC sequence
        if( this.#currentRead[0] !== 27 ){
            let text = asciify(this.#currentRead)

            // add line text to current "read value"
            if( text !== 'undefined' && text ){
                this.#readValue += text
            }
        }

        this.#currentRead = []

        // short delay before reporting the "read value" in case we get another line
        this._readFinished = setTimeout(()=>{
            
            let val = this.#readValue.trim()

            // looks like may be json
            if( val?.[0] == '{' && val.at(-1) == '}' ){
                try{ val = JSON.parse(val) }catch(err){}
            }

            this.#readValue = ''
            let from = this._writeResponse ? 'write' : 'push'

            // was the read response triggered from a "write" request?
            if( this._writeResponse ){
                this._writeResponse(val)
                this._writeResponse = null
            }else{
                // console.log(val); // debug
            }

            if( from == 'push' && !val )
                return

            this.emit('read', {value: val, from})

        },10)

    }
}

Emitter(PiPico.prototype)

export default PiPico

// pulled from https://www.mathsuniverse.com/pico
function asciify (val) {
    return val.map(v => ascii[v]).join('')
}

let ascii = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', '' /*ACK*/, 'BEL', 'BS', '\t', '\n', 'VT', 'FF', '', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', '' /*CAN*/, 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US']

let asciiChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

for (let i = 0; i < asciiChars.length; i++) ascii.push(asciiChars[i])

ascii.push('DEL')

for (let i = 0; i < 128; i++) ascii.push('.')
