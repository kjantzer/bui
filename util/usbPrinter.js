/*
    USB Printer (defaults to Zebra label printers)

    https://github.com/mkxml/zpl-webusb
    https://github.com/drffej/webusb.printer

    NOTE: for this to work on windows, the WinUSB driver must be installed
    See: https://stackoverflow.com/a/49244318/484780
    FYI: it appears the WinUSB driver will make the device offline for 
    native windows, but Chrome (and other browsers?) will be able to use it

    For windows driver: https://zadig.akeo.ie/

    Example Use:
    ```js
    import UsbPrinter from 'bui/util/usbPrinter
    UsbPrinter.default.print('zpl string here') // default printer is Zebra

    let specialPrinter = UsbPrinter.shared('specialPrinter', {vendorID: someVendorID})
    // both of these work
    specialPrinter.print('...')
    UsbPrinter.shared('specialPrinter').print('...')
    ```

*/
import Emitter from 'component-emitter'

const Instances = new Map()

class UsbPrinter {

    static get default(){ return this.shared('default') }
    static get zebra(){ return this.shared('zebra', {vendorID:2655})}

    static shared(key, opts){
        if( !Instances.get(key) )
            Instances.set(key, new UsbPrinter(opts))
        return Instances.get(key)
    }

    constructor({
        vendorID=2655 // Zebra
    }={}){
        this.vendorID = vendorID
        this.connectToDevice()
    }

    get isSupported(){ return navigator.usb }

    get name(){ return this.device&&this.device.productName }
    get isConnected(){ return !!this.device && this.device.opened }
    connect(){ return this.requestDevice() } // simplified alias

    // not sure these will ever be needed
    close(){ return this.device&&this.device.close() }
    disconnect(){ return this.close() }

    get device(){ return this.__device }
    set device(device){
        this.__device = device
        this.emit('device', this.device)
    }

    async connectToDevice(){

        if( !this.isSupported ) return

        if( this._connectingToDevice )
            return this._connectingToDevice

        return this._connectingToDevice = new Promise(async resolve=>{
            // a device will be found if already requested and its connected (via usb)
            let devices = await navigator.usb.getDevices()
            delete this._connectingToDevice
            resolve(this.setupDevice(devices[0]))
        })
    }

    get timeSinceRequestedDevice(){
        let ts = new Date().getTime()
        return (ts - (this.tsRequestedDevice||ts)) / 1000
    }
    
    async requestDevice(){

        if( !this.isSupported )
            throw new Error('USB devices not supported')
        
        if( this.isConnected ){
            await this.device.claimInterface(0);
            return this.device
        }

        this.tsRequestedDevice = new Date().getTime()

        try{
            if( !await this.connectToDevice() ){
                let device = await navigator.usb.requestDevice({ filters: [{ vendorId: this.vendorID }]});
                await this.setupDevice(device)
                await this.device.claimInterface(0);
            }
        }catch(err){
            throw err
        }
    }

    async setupDevice(device){
        if (device) {
            await device.open();
            await device.selectConfiguration(1);

            this.device = device
            return device
        } else {
            this.device = false
            return false
        }
    }

    async print(text=''){

        if( !text ) throw new Error('Nothing to print')
        
        // connect to device if not already
        await this.requestDevice()

        if( !this.device ) throw new Error('No device connected')

        let pages = Array.isArray(text) ? text : [text]
        // support printing multiple "pages"
        
        // print each page, then release the printer at the end
        try{
            for( let txt of pages ){

                const encoder = new TextEncoder();
                const data = encoder.encode(txt);

                try {
                    const res = await this.device.transferOut(1, data);
                } catch (err) {

                    if( err.message == 'The device was disconnected.' )
                        this.device = null

                    throw err
                }
            }
        }finally{
            // try to release the printer after done
            await this.device?.releaseInterface?.(0)
        }
    }
}

Emitter(UsbPrinter.prototype)

export default UsbPrinter
