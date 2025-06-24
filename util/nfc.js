/*
	# NFC

	Use a devices NFC hardware to scan things like NFC chips

	```js
	NFC.isSupported // does browser implement (no way to know if device has the hardware)

	NFC.shared.scan({onScan, onAbort})
	NFC.shared.stop()
	
	let str = await NFC.shared.readOne()
	```

    > Note: 
    > - only supported in (Android)[https://caniuse.com/?search=NDEFReader]
    > - also cannot tell if NFC hardware actually exists
*/
let instance
let permission

export default class NFC {

	static get isSupported(){ return !!window.NDEFReader}

	static get permission(){ return permission }
	static get permissionGranted(){ return permission?.state == 'granted' }
	static get requiresUserPermission(){ return permission?.state == 'prompt' }

	static get shared(){
		if( !instance ) instance = new NFC()
		return instance
	}

	constructor(){
		this.ndef = new NDEFReader()
	}

	get isScanning(){ return !!this.ctlr }

	scan({once=false, onScan, onAbort}={}){

		if( this.ctlr ) return console.log('already scanning');

		this.ctlr = new AbortController()

		this.ctlr.onabort = ()=>{
			this.ctlr = null
			onAbort?.()
		}

		this.ndef.addEventListener('reading', event => {
			if( once ){
				this.ctlr?.abort();
				this.ctlr = null
			}

			if( this._onScanOnce ){
				this._onScanOnce(event)
				delete this._onScanOnce
			}else
				onScan?.(event)
		},{once})
		
		return this.ndef.scan({signal: this.ctlr.signal}).catch(err=>{
			this.stop()
			throw err
		});
	}

	stop(){
		this.ctlr?.abort()
		this.ctlr = null
	}

	// https://w3c.github.io/web-nfc/#read-a-single-tag-once
	readOne(){
		
		return new Promise((resolve, reject) => {

			// already scanning, hook into scan for one scan
			if( this.isScanning )
				this._onScanOnce = resolve
			else
				this.scan({
					once: true, 
					onScan: resolve, 
					onAbort: reject
				}).catch(err=>{
					reject(err)
				})
		})
	}
}

// may or may not have the hardware
if( NFC.isSupported ){
	navigator.permissions.query({ name: 'nfc' }).then(perm=>{
		permission = perm
	})
}