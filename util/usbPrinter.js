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

        if( this._connectingToDevice )
            return this._connectingToDevice

        return this._connectingToDevice = new Promise(async resolve=>{
            // a device will be found if already requested and its connected (via usb)
            let devices = await navigator.usb.getDevices()
            delete this._connectingToDevice
            resolve(this.setupDevice(devices[0]))
        })
    }
    
    async requestDevice(){
        
        if( this.isConnected ) return this.device

        try{
            if( !await this.connectToDevice() ){
                let device = await navigator.usb.requestDevice({ filters: [{ vendorId: this.vendorID }]});
                await this.setupDevice(device)
            }
        }catch(err){
            throw err
        }
    }

    async setupDevice(device){
        if (device) {
            await device.open();
            await device.selectConfiguration(1);
            await device.claimInterface(0);

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

        // support printing multiple "pages"
        if( Array.isArray(text) )
            return text.forEach(txt=>this.print(txt))

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        try {
            const res = await this.device.transferOut(1, data);
        } catch (err) {

            if( err.message == 'The device was disconnected.' )
                this.device = null

            throw err
        }
    }
}

Emitter(UsbPrinter.prototype)

export default UsbPrinter
