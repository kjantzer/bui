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
import {median} from './math'

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
	
	onBarcodeScanned(result){

		let {str, type, val} = result
		this.emit('scanned', result)

        window.dispatchEvent(new CustomEvent('barcode-scanned', {
            bubbles: true,
            composed: true,
            detail: {str:val||str, type}
        }))

		window.dispatchEvent(new CustomEvent('barcode-scanned:'+type, {
            bubbles: true,
            composed: true,
            detail: result
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

		var charStr = String.fromCharCode(e.which);
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
		
		var str, type
		let result = Parsers.parse(str)
		
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


class BarcodeParsers extends Map {

	set(key, val){

		// got a bunch of parsers, set each one
		if( val == undefined && typeof key == 'object' ){
			for( let [k,v] of Object.entries(key) ){
				this.set(k, v)
			}
			return
		}

		if( this.get(key) )
			return console.warn('Barcode Scanner - parser already exists:', key, this.get(key))

		// defaults
		let parse = {
			speed: 0,
			type: 'string'
		}

		if( typeof val == 'function'){
			parse.patt = val

		}else if( val instanceof RegExp ){
			parse.patt = val
		
		}else if( typeof val == 'object' ){
			parse = Object.assign(parse, val)
		}

		return super.set(key, parse)
	}

	parse(str, speed){

		str = str.replace(/[\n\r]/g, '');

		let result = {
			str,
			val: null,
			type: null
		}

		// test each parser for a match
		for( let [type, parse] of this ){

			if( parse.speed && speed != parse.speed )
				continue

			// custom function
			if( typeof parse.patt == 'function' ){
				
				let val = parse.patt(str, speed)

				// if parse function returned something, it's considereed a match
				if( val !== undefined && val !== false ){
					result.type = type
					result.val = val
				}

			// regular expression
			}else if( parse.patt instanceof RegExp ){

				let matches = str.match(parse.patt)

				if( matches ){
					result.type = type
					if( matches.length > 2 )
						result.val = matches.slice(1)
					else if( matches.length > 1 )
						result.val = matches[1]
					else
						result.val = str
				}
			}

			// did this parser match?
			if( result.val != null ){

				// optionally parse the result further
				if( typeof parse.parse == 'function' )
					parse.parse(result)

				// format the result value based on "type"
				if( parse.type ){
					if( Array.isArray(result.val) )
						result.val = result.val.map(val=>{
							return resultValParser(parse.type, val)
						})
					else
						result.val = resultValParser(parse.type, result.val)
				}

				// stop testing the remaining parsers
				// NOTE: should this be turned off to allow multiple matches?
				break;
			}
		}

		return result
	}
}

function resultValParser(type, val){

	if( type == 'int' )
		return parseInt(val)
	else if( type == 'float' )
		return parseFloat(val)
	else if( type == 'boolean' )
		return Boolean(val)
	
	return val
}

const Parsers = new BarcodeParsers()

