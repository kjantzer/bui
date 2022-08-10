 /*
	Barcode Scanner

	The Wasp 3900 barcode scanner (an many others) enters barcode values like a person would while typing on a keyboard.
	The script listens for a set of characters to be entered very quickly. It is assumed
	that a human cannot enter the characters this fast and thus must be a barcode scanner.
	
	`textInput` events are also supported but require a barcode button key to be set in: `textInputKeys`

	@since 2017-01-30
	@author Kevin Jantzer
	
	TODO
	- rework to be a singleton that allows for outside code to listen

	Docs:
	https://www.databar-barcode.info/application-identifiers/
*/
import Emmitter from 'component-emitter'
import {median} from '../math'
import Parsers from './parsers'

class BarcodeScanner {

	constructor(opts={}){

        this.opts = Object.assign({
            // the keycodes that should trigger listening for a textInput event
            textInputKeys: ['F9'],
            // how fast must characters be entered to be "saved"
            scanCharSpeed: 50, 
            // how many saved characters needed to = scanned barcode
            scanCharMin: 5,
             // how long to wait for another charcter to be entered before testing for scan
            scanFinishedDelay: 100
        }, opts)
		
		if( this.opts.textInputKeys ){
			// Some scanners trigger an F9 key followed by a textInput event. However, textInput events
			// only happen on on editable elements (https://developer.mozilla.org/en-US/docs/Web/Events/input)
			// this element will be selected (makes it active and in focus) when the F9 key is hit,
			// thus accepting the textInput/input events
            this.textInputEl = document.createElement('div')
			this.textInputEl.id = 'bacode-scanner-text-input-fix'
            this.textInputEl.contentEditable = true
            this.textInputEl.style.zIndex = -1
            this.textInputEl.style.position = 'absolute'
            document.body.appendChild(this.textInputEl)
		}

        this.onTextInput = this.onTextInput.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
		this.onKeyUp = this.onKeyUp.bind(this)
		
		if( !opts || opts.startScanning !== false )
			this.startListening();
	}
	
	onBarcodeScanned(result){
		this.emit('scanned', result)
		emit(result)
	}

	startListening(){
		if( this.opts.textInputKeys ){
			// document.addEventListener('input', this.onInput)
			window.addEventListener('textInput', this.onTextInput)
		}
		window.addEventListener('keydown', this.onKeyDown, true)
		window.addEventListener('keypress', this.onKeyPress, true)
		window.addEventListener('keyup', this.onKeyUp, true)
		this.emit('listening', true);
	}

	stopListening(){
		if( this.opts.textInputKeys ){
			// window.removeEventListener('input', this.onInput)
			window.removeEventListener('textInput', this.onTextInput)
		}
		window.removeEventListener('keydown', this.onKeyDown, true)
		window.removeEventListener('keypress', this.onKeyPress, true)
		window.removeEventListener('keyup', this.onKeyUp, true)
		this.emit('listening', false);
	}

	barcodeScanned(){

		if( this._chars.length >= this.opts.scanCharMin ){

			let str = this._chars.join('')
			let speed = median(this._speed)
			
			let result = Parsers.parse(str, speed)

			this.onBarcodeScanned(result)
		}

		this._lastTimeScanned = (new Date()).getTime()
		this._lastTime = null;
		this._chars = [];
		this._speed = []
	}
	
	timeSinceScan(){
		return this._lastTimeScanned ? ((new Date()).getTime() - this._lastTimeScanned) / 1000 : false
	}
	
	// Yeah, I know, its duplicate code
	getType(str){
		return this.parseCode(str)[1]
	}

	parseTrackingNum(str){

		// USPS
		if( str.length == 30 ) return str.substr(-22)
		// FedEx
		if( str.length == 34 ) return str.substr(-12)

		// USPS to Canada
		if( str.match(/^[A-Z]{2}\d+US$/) ) return str

		// attempt to ignore other barcodes containing non-tracking numbers
		if( str.length > 15 && str.length < 34 ) return str;

		return null;
	}

	_scanFinished(){
		clearTimeout(this._scanFinishedTimeout);
		this._scanFinishedTimeout = setTimeout(this.barcodeScanned.bind(this), this.opts.scanFinishedDelay);
	}

	/*
		Had to add this logic to keep invisible special characters from stopping
		the scan from fully capturing. Noticed on an label printed by stamps.com for AE
	*/
	onKeyDown(e){
		
		if( this.opts.textInputKeys && (this.opts.textInputKeys == e.key || this.opts.textInputKeys.includes(e.key)) ){
			this.waitingForTextInput = true
			// we put the cursor (window.selection) in the editable div instead of calling `.focus` so that mobile keyboards do not open
			this.selectText(this.textInputEl)
			e.preventDefault();
			return;
		}
		
		var now = (new Date()).getTime();
		var speed = now - this._lastTime
		
		if( speed < this.opts.scanCharSpeed ){
			
			var keycode = e.keyCode;

			// https://stackoverflow.com/a/12467610/484780
			var valid = 
				(keycode > 47 && keycode < 58)   || // number keys
				keycode == 32 /*|| keycode == 13*/   || // spacebar & return key(s) (if you want to allow carriage returns)
				(keycode > 64 && keycode < 91)   || // letter keys
				(keycode > 95 && keycode < 112)  || // numpad keys
				(keycode > 185 && keycode < 193) || // ;=,-./` (in order)
				(keycode > 218 && keycode < 223);   // [\]' (in order)

			// when barcode scanning, dont let other keyboard listeners pick up these events
			e.stopPropagation()

			// ignore keystroke for invalid characters
			if( !valid ){
				e.preventDefault();
			}
		}
	}

	onKeyPress(e){

		var now = (new Date()).getTime();

		// dont track keypress when using an input/textarea
		if( document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA' )
			return;

		if( !this._lastTime ){
			this._lastTime = now;
			this._chars = [];
			this._speed = []
		}

		var charStr = String.fromCharCode(e.which); // could use `e.key`?
		var speed = now - this._lastTime

		if( speed < this.opts.scanCharSpeed ){

			this._chars.push(charStr);
			this._speed.push(speed)

			this._scanFinished();
		}

		this._lastTime = now;
	}
	
	stopWaitingForTextInput(){
		if( this.waitingForTextInput ){
			this.waitingForTextInput = false
			window.getSelection().empty()
		}    
	}
	
	onKeyUp(){
		this.stopWaitingForTextInput()
	}
	
	onInput(e){
		e.preventDefault()
		e.stopPropagation()    
	}
	
	onTextInput(e){
		
		if( !this.waitingForTextInput ) return;
		
		e.preventDefault()
		e.stopPropagation()
		
		let result = Parsers.parse(e.data)
		
		this.stopWaitingForTextInput()
		this.onBarcodeScanned(result)
		return false;
	}
	
	selectText(el){
        if (document.selection) {
            var range = document.body.createTextRange();
            if( el )
                range.moveToElementText(el);
            range.select();
        } else if (window.getSelection) {
            let selection = window.getSelection();    // Save the selection.
            let range = document.createRange();
            if( el )
                range.selectNodeContents(el);
            selection.removeAllRanges();          // Remove all ranges from the selection.
            selection.addRange(range);            // Add the new range.
        }
    }

}

Emmitter(BarcodeScanner.prototype)

let scannerInstance
function singleton(opts){
    if( !scannerInstance ){
        scannerInstance = new BarcodeScanner(opts)
    }
    return scannerInstance
}

singleton.addParser = function(key, val){
	Parsers.set(key, val)
}

export default singleton

export {Parsers}

export function emit(result){
	let {str, type, val} = result

	let event = new CustomEvent('barcode-scanned', {
		bubbles: true,
		composed: true,
		detail: Object.assign({}, result, {str:val||str}) // backwards compat
	})

	window.dispatchEvent(event)

	setTimeout(()=>{
		if( !event.cancelBubble ){
			window.dispatchEvent(new CustomEvent('barcode-scanned:'+type, {
				bubbles: true,
				composed: true,
				detail: result
			}))
		}
	})
}