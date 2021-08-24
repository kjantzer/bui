
const InvalidImages = []
export const BgdColors = ['#2196F3', '#f44336', '#673AB7', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722', '#795548', '#607D8B']
export const DefaultBgd = '#aaa';

class AvatarElement extends HTMLElement {
	
	static get observedAttributes(){
		return ['initials', 'bgd', 'color', 'size', 'url', 'gravatar']	
	}
	
    constructor() {
        super()
		
        let shadow = this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')

		let aspectRatio = this.hasAttribute('cover') ? 'xMinYMin slice' : 'xMinYMin slice meet'
        
        temp.innerHTML = /*html*/`<style>
			:host {
				--bgd: ${this.bgd};
				--bgdDefault: transparent;
				--color: ${this.color};
				height: var(--size, 1em);
			    width: var(--size, 1em);
			    display: inline-block;
			    vertical-align: middle;
				position: relative;
				border-radius: var(--b-avatar-radius, 50%);

				-webkit-touch-callout: none; /* iOS Safari */
				-webkit-user-select: none; /* Safari */
				-khtml-user-select: none; /* Konqueror HTML */
				-moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
				user-select: none; 
			}

			:host([shadow]) svg {
				box-shadow: rgba(0,0,0,.1) 0 1px 3px;
			}

			svg {
				border-radius: var(--b-avatar-radius, 50%);
			}
			
			svg rect {
				fill: var(--bgd);
			}
			
			svg text {
				fill: var(--color);
				font-size: var(--b-avatar-font-size, 60px);
			}
			
			:host([nobgd]) svg.imgloaded rect {
				fill: transparent;
			}
			
			svg.imgloaded text {
				visibility: hidden;
			}
			
			:host([imgicon]) svg image {
				width: 70%;
				height: 70%;
				x: 15%;
				y: 15%;
			}
			
			svg.imgloading rect {
				fill: #eee;
			}

			svg.imgloaded rect {
				fill: var(--bgdDefault);
			}
			</style>
			
		<svg class="imgloading" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="100%" height="100%" rx="0" ry="0"></rect>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${this.initials}</text>
			<image xlink:href="" x="0" y="0" width="100%" height="100%"
				preserveAspectRatio="${aspectRatio}"
				onload="this.parentElement.classList.add('imgloaded')">
        </svg>
		<slot></slot>`
		
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
		
		this.img = this.shadowRoot.querySelector('image')
		this.img.addEventListener('error', e=>{
			this.img.style.display='none'
			this.img.parentElement.classList.remove('imgloading')
			let src = this.img.getAttribute('xlink:href')
			if( src )
				InvalidImages.push(src)
		})
    }
	
	connectedCallback(){
		// NOTE: https://stackoverflow.com/a/43837330/484780
		// this.style.display = 'inline-block'
		// this.style.verticalAlign = 'middle'
		// this.style.lineHeight = '0'
		
		if( this.hasAttribute('gravatar') )
			this.gravatar = this.getAttr('gravatar')
	}
	
	attributeChangedCallback(name, oldVal, newVal){
		this[name] = newVal
	}
	
	getAttr(name, defaultVal){
		return this.hasAttribute(name) ? (this.getAttribute(name)||defaultVal) : defaultVal
	}
	
	get initials(){
		return this.getAttr('initials', '-')
	}
	
	set initials(str){
		this.shadowRoot.querySelector('text').innerHTML = str || '-'
		this.bgd = this.bgd // update bgd to match initial change (wont change if user specified the bgd attr)
	}
	
	get bgd(){
		let color = this.getAttr('bgd')
		if( !color ){
			
			let initials = this.getAttr('initials', '').toLowerCase()
			
			if( !initials ){
				color = DefaultBgd
			}else{
				let num = 0

				for( let char of initials ){
					num += char.charCodeAt(0) - 97
				}

				color = BgdColors[ num % BgdColors.length ]
			}
		}
		return color || `var(--theme-text)`
	}
	
	set bgd(color){
		// if( this.style.getPropertyValue('--bgd') ) return
		this.style.setProperty('--bgd', color)
		// this.shadowRoot.querySelector('rect').setAttribute('fill', color||this.bgd)
	}
	
	get color(){
		return this.getAttr('color' ,'var(--theme-bgd, #fff)')
	}
	
	set color(color){
		this.style.setProperty('--color', color)
		// this.shadowRoot.querySelector('text').setAttribute('fill', color||this.color)
	}
	
	get size(){
		return this.getAttr('size', 24)
	}
	
	set size(size){
		this.style.width = size+'px'
		this.style.height = size+'px'
		// reload the gravatar to get the correct size
		this.gravatar = this.getAttr('gravatar')
	}
	
	set url(url){
		
		this.img.parentElement.classList.remove('imgloaded')
		this.img.style.display = ''

		// dont try to load an image we already know fails
		if( !url || InvalidImages.includes(url) ){
			this.img.style.display = 'none'
			this.img.setAttribute('xlink:href', '')
			return
		}

		if( url ){
			this.img.parentElement.classList.add('imgloading')
			this.img.setAttribute('xlink:href', url)
		}
			
	}
	
	set gravatar(guid){
		// wait until el is connected so we can determine the height of the avatar
		if( !this.isConnected || !guid ) return
		// FIXME: accessing offsetHeight is a perf hit...as it requires a reflow
		// https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/
		// let size = this.offsetHeight * 2
		let size = this.size * 2
		if( size < 80 ) size = 80
		console.log(this.size);
		this.url = guid ? `//gravatar.com/avatar/${guid}?d=404&s=${size}` : ''
	}
}

customElements.define('b-avatar', AvatarElement)
export default customElements.get('b-avatar')
