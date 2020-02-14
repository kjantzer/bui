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
*/
import Emmitter from 'component-emitter'

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
	
	onBarcodeScanned(str, type){
		this.emit('scanned', str, type)
        window.dispatchEvent(new CustomEvent('barcode-scanned', {
            bubbles: true,
            composed: true,
            detail: {str, type}
        }))
	}

	startListening(){
		if( this.opts.textInputKeys ){
			// document.addEventListener('input', this.onInput)
			document.addEventListener('textInput', this.onTextInput)
		}
		document.addEventListener('keydown', this.onKeyDown)
		document.addEventListener('keypress', this.onKeyPress)
		document.addEventListener('keyup', this.onKeyUp)
		this.emit('listening', true);
	}

	stopListening(){
		if( this.opts.textInputKeys ){
			// document.removeEventListener('input', this.onInput)
			document.removeEventListener('textInput', this.onTextInput)
		}
		document.removeEventListener('keydown', this.onKeyDown)
		document.removeEventListener('keypress', this.onKeyPress)
		document.removeEventListener('keyup', this.onKeyOp)
		this.emit('listening', false);
	}

	barcodeScanned(){

		if( this._chars.length >= this.opts.scanCharMin ){

			var str = this._chars.join(''), type;
			
			[str, type] = this.parseCode(str, type);

			this.onBarcodeScanned(str, type)
		}

		this._lastTimeScanned = (new Date()).getTime()
		this._lastTime = null;
		this._chars = [];
	}
	
	parseCode(str, type="unknown"){
		
		var trackingNum = null
		var match;
		
		str = str.replace(/[\n\r]/g, '');
		
		// TEMP - some orders got malformed IDs assigned and we left them in place.
		let malformedOrderIDs = ['Le1345139-2', 'Le1345139-4', 'Le1345148-0', 'Le1345148-5', 'Le1345148-6', 'Le1345148-7', 'Le1345148-8', 'Le1345148-9', 'We1345148-2', 'We1345148-3', 'We1345148-4', 'Ce1345139-3']

		// make boombox show as an isbn...(maybe change to partner_ref?)
		if( str.match(/^978[\d]{10}$/) || str == '027242896406' ) type = 'isbn'
		else if( match = str.match(/^BX(\d{9})/) ){
			type = 'box_id'
			str = parseInt(match[1])
		}
		else if( match = str.match(/^BXIT(\d{6})/) ){
			type = 'boxit_box'
			str = parseInt(match[1])
		}else if( match = str.match(/^BXITP(\d{6})/) ){
			type = 'boxit_pallet'
			str = parseInt(match[1])
		}
		else if( str.match(/^\d{2}-[a-iA-I]([\d][a-iA-I]?)?$/)) type = 'shelf_location'
		else if( match = str.match(/^rma-item-([0-9]+)/) ){
			type = 'rma_item'
			str = match[1]
		}
		else if( match = str.match(/^pick:(.+)/) ){
			type = 'pick_list'
			str = match[1].split(',')
		}
		else if( match = str.match(/^reshelf:(.+)/) ){
			type = 'reshelf_list'
			str = match[1].split(',')
		}
		else if( str.length == 6 && str.match(/^[1-7][0-2]|^[zphb][a-z]/i) ) type = 'product_id'
		else if( malformedOrderIDs.includes(str) || str.match(/^[\d]{6,9}(-\d)?$|^ae\d+|^[CLWEAI][\d]{8}/) ) type = 'order_id'
		else if( match = str.match(/^RPLC([0-9]+)/i) ){
			type = 'replacement'
			str = match[1]
		}
		else if( trackingNum = this.parseTrackingNum(str) ){
			str = trackingNum
			type = 'tracking_num'
		}
		else if( str.length < 20 ) type = 'invoice_id'
		
		return [str, type]
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
		if( now - this._lastTime < this.opts.scanCharSpeed ){
			
			var keycode = e.keyCode;

			// https://stackoverflow.com/a/12467610/484780
			var valid = 
				(keycode > 47 && keycode < 58)   || // number keys
				keycode == 32 /*|| keycode == 13*/   || // spacebar & return key(s) (if you want to allow carriage returns)
				(keycode > 64 && keycode < 91)   || // letter keys
				(keycode > 95 && keycode < 112)  || // numpad keys
				(keycode > 185 && keycode < 193) || // ;=,-./` (in order)
				(keycode > 218 && keycode < 223);   // [\]' (in order)

			
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
		}

		var charStr = String.fromCharCode(e.which);

		if( now - this._lastTime < this.opts.scanCharSpeed ){

			this._chars.push(charStr);

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
		
		var str, type
		[str, type] = this.parseCode(e.data);
		
		this.stopWaitingForTextInput()
		this.onBarcodeScanned(str, type)
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

let scannerInstance

export default function(opts){
    if( !scannerInstance ){
        scannerInstance = new BarcodeScanner(opts)
    }
    return scannerInstance
}

Emmitter(BarcodeScanner.prototype)