/*
	SVG and idea taken from https://ant.design/components/button/
	
	Examples: 
	<circle-spinner/>
	<circle-spinner style="--size:.8em; color: white"/>
*/

class SpinnerElement extends HTMLElement {
	
    constructor() {
        super()
		
        let shadow = this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
        
        temp.innerHTML = `<style>
			:host {
				--size: .8em;
				height: var(--size);
			    width: var(--size);
			    display: inline-block;
			    vertical-align: middle;
			}
			
			:host(.overlay) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 10000;
			}
			
			@keyframes spin {
				100% {
				    transform: rotate(360deg);
				}
			}
			
			svg {
				transform-origin: center center;
			}

			:host([spin]) svg {
				animation: spin 1s infinite linear;
			}
			</style>
			<svg viewBox="0 0 1024 1024" class="spin" data-icon="loading" width="100%" height="100%" fill="currentColor" aria-hidden="true">
				<path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
			</svg>`
			
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }

	spin(spin=true){
		this.toggleAttribute('spin', spin)
	}
}

customElements.define('b-spinner', SpinnerElement)
