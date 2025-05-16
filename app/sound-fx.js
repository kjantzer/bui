/*
	# SoundFX

	Preload sounds effects and play them immediately with the ability to play multiple at once and at different volumes

	```js
	import SoundFX from './sound-fx'

	// global for b-btn
	window.soundFX = new SoundFX({
		tap: './tap.mp3',
		success: './success.mp3',
		error: {path: './error.mp3', gain: 0.3}
	}, {
		defaultGain: 0.6,
		shouldPlay: () => true // override if should check user settings
	})

	soundFX.play('tap')
	soundFX.play('tap', {vibrate: 100})
	soundFX.play('success', {gain: .7})
	```
*/
import device from '../util/device'
import Vibrate from '../util/vibrate'

export default class SoundFX {

	get isMobile(){ return this._isMobile ?? device.isMobile }
	set isMobile(value){ this._isMobile = value }

	// override if should check user settings
	shouldPlay(){ return this.opts?.shouldPlay ? this.opts.shouldPlay() : true }

	// key:value where value is string `path` or object {path, gain}
	constructor(sounds={}, {defaultGain=0.6, shouldPlay}={}) {
		
		if( !('AudioContext' in window) )
			return

		this.opts = arguments[1] || {}
		this.context = new AudioContext()
		this.sounds = {}

		// fetch all sounds now and store - so they can play immediately when invoked
		for(let key in sounds){

			let data = sounds[key]

			if( typeof data == 'string' )
				data = {path: data}

			if( !data.path)
				throw Error(`No path provided for sound: ${key}`)

			fetchAudioBuffer(data.path, this.context).then(buffer=> {
				this.sounds[key] = {...data, buffer}
			}).catch((error) => {
				console.error(`Failed to load sound: ${key}`, error);
			})

		}
	}

	play(key, {gain, vibrate, ifMobile}={}) {
		
		if( !this.context ) return

		let sound = this.sounds[key]

		if( !sound )
			return Error(`The requested sound is not available: ${key}`);

		if( !this.shouldPlay() )
			return

		if( ifMobile !== undefined && ifMobile !== this.isMobile )
			return

		let audioNode = new AudioBufferSourceNode(this.context, {buffer: sound.buffer})
		let gainNode = new GainNode(this.context, {gain: gain||sound.gain||this.opts.defaultGain||0.6})
		
		audioNode.connect(gainNode).connect(this.context.destination)
		audioNode.start()

		if( vibrate )
			Vibrate(vibrate)
	}

}


async function fetchAudioBuffer(path, context){

	let resp = await fetch(new Request(path))
	let buffer = await resp.arrayBuffer()
	return await context.decodeAudioData(buffer)
}
