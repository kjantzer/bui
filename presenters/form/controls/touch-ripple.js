import {css} from 'lit-element'

const styles = css`

:host {
	opacity: 0;
	position: absolute;
	/* left: -7px;
	top: -7px;
	width: 48px;
	height: 48px; */
	width: 120%;
	height: 120%;
	left: -10%;
	top: -10%;
	display: block;
	z-index: 100;
	background: currentColor;
	border-radius: 50px;
}

:host(.enter) {
	opacity: 0.3;
	/* transform: scale(.5); */
	animation: ripple-enter 550ms cubic-bezier(0.4, 0, 0.2, 1);
	animation-name: ripple-enter;
}

:host(.exit) {
	opacity: 0;
	/* transform: scale(1); */
	animation: ripple-exit 550ms cubic-bezier(0.4, 0, 0.2, 1);
	animation-name: ripple-exit;
}


@-webkit-keyframes ripple-enter {
  0% {
    opacity: 0.1;
    transform: scale(0);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
@-webkit-keyframes ripple-exit {
  0% {
    opacity: .3;
	transform: scale(.7);
  }
  100% {
    opacity: 0;
	transform: scale(1.2);
  }
}
@-webkit-keyframes ripple-pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.92);
  }
  100% {
    transform: scale(1);
  }
}
`

class TouchRippleElement extends HTMLElement {
	
	constructor() {
		super()
		
		let shadow = this.attachShadow({mode: 'open'})
		let temp = document.createElement('template')
		
		temp.innerHTML = `
			<style>${styles.cssText}</style>
		`
			
		this.shadowRoot.appendChild(temp.content.cloneNode(true));
	}

	ripple(){
		this.animate('exit')
	}
	
	enter(){
		this.classList.add('enter')
	}
	
	hide(){
		this.classList.remove('exit')
		this.classList.remove('enter')
	}
	
	animate(str){
		this.hide()
		this.classList.add(str)
		setTimeout(()=>this.classList.remove(str), 550)
	}
	
}

customElements.define('touch-ripple', TouchRippleElement)

export default customElements.get('touch-ripple')
