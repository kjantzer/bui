import Emitter from 'component-emitter'
import {throttle as throttleFn} from './throttle'

const Instances = new Map()

class HidDevice {

    static get default(){ return this.shared('default') }

    // https://www.hogentogler.com/fairbanks/29824c-shipping-scale.asp
    static get scale(){ return this.fairbanksScale }
    static get fairbanksScale(){ 
        return this.shared('fairbanksScale', {
            vendorID: 0x0b67,
            productID: 0x555e,
            defaultValue: {weight: 0, unit: 'lb', isNegative:false},
            parse(event){
                const { data, device, reportId } = event;
                let d = new Uint8Array(data.buffer)
                
                let isNegative = d[0] == 5
                var weight = isNegative ? 0 : ((d[4]*256) + d[3]) / 100;
                
                let unit = {
                    12: 'lb',
                    3: 'kg'
                }[d[1]]

                let value = `${isNegative?'-':''}${weight}${unit}`
                
                return {value, weight, unit, isNegative}
            }
        })
    }

    static shared(key, opts){
        if( !Instances.get(key) )
            Instances.set(key, new HidDevice(opts))
        return Instances.get(key)
    }

    constructor({
        vendorID=0x0b67,
        productID=0x555e,
        defaultValue={},
        parse=(event)=>{ return event },
        throttle=100, // ms
        stable=1000 // ms
    }={}){

        this.vendorId = vendorID
        this.productId = productID
        this.defaultValue = defaultValue
        this.parse = parse
        this.stable = stable

        this._inputReport = throttleFn(this._inputReport.bind(this), throttle)
        this._connect = this._connect.bind(this)
        this._disconnect = this._disconnect.bind(this)

        if( this.isSupported ){
            navigator.hid.addEventListener('connect', this._connect);
            navigator.hid.addEventListener('disconnect', this._disconnect);
        }
    }

    get isSupported(){ return 'hid' in navigator  }
    get name(){ return this.device&&this.device.productName }
    get isConnected(){ return !!this.device && this.device.opened }
    
    connect(){ return this.connectToDevice() } // simplified alias
    disconnect(){ return this.device&&this.device.close() }

    // alias
    open(){ return this.connect() }
    close(){ return this.disconnect() }

    get device(){ return this.__device }
    set device(device){

        if( this.device ){
            this.device.removeEventListener('inputreport', this._inputReport)
        }

        this._currentVal = null
        this.__device = device

        if( this.device ){
            this.device.addEventListener('inputreport', this._inputReport)
        }
    }

    connectToDevice(){

        if( !this.isSupported ) return false
        if( this.isConnected ) return this.device

        if( this._connectingToDevice )
            return this._connectingToDevice

        return this._connectingToDevice = new Promise(async resolve=>{
            // a device will be found if already requested and its connected (via usb)
            let devices = await navigator.hid.getDevices()
            delete this._connectingToDevice
            resolve(this.setupDevice(devices[0]))
        })
    }

    async requestDevice(){

        if( !this.isSupported ) return false
        if( this.isConnected ) return this.device

        try{
            if( !await this.connectToDevice() ){

                let filter = {}
                if( this.vendorId )
                    filter.vendorId = this.vendorId

                if( this.productId )
                    filter.productId = this.productId

                const [device] = await navigator.hid.requestDevice({filters:[filter]})||[];
                this.setupDevice(device)

            }
        }catch(err){
            throw err
        }
    }

    async setupDevice(device){
        if( device ){
            await device.open()
            this.device = device
            this.emit('connected', true)
            this._change(this.defaultValue)
            return device
        }else{
            this.device = false
            return false
        }
    }

    _change(val){

        let prevVal = this.value
        this.value = val
        this.emit('change', val)

        if( this.stable > 0 ){

            if( this._stableValPrev === undefined )
                this._stableValPrev = prevVal
                
            clearTimeout(this._stableTimeout)
            this._stableTimeout = setTimeout(()=>{
                this.emit('stable', val, this._stableValPrev)
                this._stableValPrev = undefined
            }, this.stable)
        }
    }

    _inputReport(event){
        let result = this.parse(event)

        if( result && result != event && result.value != undefined ){
            
            if( result.value != this._currentVal ){
                this._currentVal = result.value
                this._change(result)
            }

            return
        }

        this._change(result)
    }

    _connect(event){
        if( this.device.vendorId == event.device.vendorId 
        && this.device.productId == event.device.productId ){
            this.setupDevice(event.device)
        }
    }

    _disconnect(event){
        if( this.device.vendorId == event.device.vendorId 
        && this.device.productId == event.device.productId ){
            this.disconnect()
            this.emit('connected', false)
            this._change(this.defaultValue)
        }
    }
    
}

Emitter(HidDevice.prototype)

export default HidDevice