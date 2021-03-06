import { LitElement, html, css } from 'lit-element'
import Button from './btn'
import '../../elements/spinner'
import '../../helpers/lit-element/events'

customElements.define('b-dialog', class DialogElement extends LitElement{

    static get properties(){return {
        icon: {type: String},
        pretitle: {type: String},
        title: {type: String},
        body: {type: String},

        closeBtn: {type: Boolean},

        color: {type: String, reflect: true},
        accent: {type: String, reflect: true},
        edge: {type: Boolean, reflect: true},
        toast: {type: Boolean, reflect:true},
        stack: {type: Boolean, reflect:true},
        noContent: {type: Boolean, reflect:true},
    }}

    static get styles(){return css`
        :host {
            display: inline-grid;
            grid-template-columns: auto 1fr;
            vertical-align: text-top;
            min-width: 200px;
            max-width: 100%;
            position:relative;
            background: var(--theme-bgd, #fff);
            border-radius: var(--radius);

            --radius: 5px;
            --pad: 1em;

            border: solid 1px var(--theme-bgd-accent); /* temp */
        }

        :host([in-panel]),
        :host([in-popover]),
        :host([in-notif]) {
            border: none;
        }

        :host([color]) {
            --theme-text: white;
            --theme-text-rgb: 255,255,255;
            --b-btn-bgd: var(--theme-text);
            color: var(--theme-text);
            background-color: var(--color);
        }

        :host([color="red"]) { --color: var(--red); }
        :host([color="blue"]) { --color: var(--blue); }
        :host([color="green"]) { --color: var(--green); }
        :host([color="orange"]) {
            --color: var(--orange);
            --theme-text: var(--light-text);
            --theme-text-rgb: var(--light-text-rgb);
        }

        :host([color="inverse"]) {
            --theme-bgd: var(--theme-inverse-text);
            --color: var(--theme-inverse-bgd);
            --theme-text: var(--theme-inverse-text);
            --theme-text-rgb: var(--theme-inverse-text-rgb);
        }

        :host([accent="red"]) { --accent: var(--red-700); }
        :host([accent="blue"]) { --accent: var(--blue); }
        :host([accent="green"]) { --accent: var(--green); }
        :host([accent="orange"]) { --accent: var(--orange); }

        :host([color="red"][accent]) { --accent: var(--red-800); }
        :host([color="blue"][accent]) { --accent: var(--blue-800); }
        :host([color="green"][accent]) { --accent: var(--green-800); }
        :host([color="orange"][accent]) { --accent: var(--orange-800); }

        :host([edge]) { box-shadow: 6px 0 0 0 var(--accent) inset; }
        :host([stack][edge]) { box-shadow: 0px 6px 0 0 var(--accent) inset; }

        :host([stack]) {
            grid-template-columns: 1fr;
        }

        :host([toast]) {
            grid-template-columns: auto 1fr auto;
            --icon-size: 1.2em;
        }

        :host([nocontent][notext]) {
            min-width: 1em;
        }

        :host([nocontent][notext]) main {
            display: none;
        }

        aside {
            display: flex;
            justify-content: center;
            border-radius: var(--radius) 0 0 var(--radius);
            grid-row: span 2;
            /* color: var(--highlight-color, rgba(var(--theme-text-rgb, 0,0,0), .6)); */
        }

        aside ::slotted(svg) {
            height: 5em;
            width: auto;
        }

        aside ::slotted(*[fill]) {
            border-radius: var(--radius) 0 0 var(--radius);
        }

        aside b-icon,
        aside b-spinner,
        aside ::slotted(*:not([fill])) {
            margin: var(--pad) 0 var(--pad) var(--pad);
        }

        :host([stack]) aside b-icon,
        :host([stack]) aside b-spinner,
        :host([stack]) aside ::slotted(*:not([fill])) {
            margin: var(--pad) var(--pad) 0 var(--pad);
        }

        :host([stack]) aside ::slotted(*[fill]) {
            border-radius: var(--radius) var(--radius) 0 0;
        }

        aside b-icon,
        aside b-spinner {
            --size: var(--icon-size, 2em);
            color: var(--accent);
        }

        :host([toast]) aside {
            grid-row: span 1;
        }

        :host([toast]) aside b-icon,
        :host([toast]) aside b-spinner {
            align-self: center;
        }

        :host([color]:not([color="inverse"])[accent]) aside b-icon,
        :host([color]:not([color="inverse"])[accent]) aside b-spinner {
            background: var(--accent);
            padding: .5em;
            border-radius: 50%;
            color: var(--theme-text);
        }

        main {
            margin: var(--pad);
        }

        main > slot::slotted(*:first-child) {
            margin-top: var(--pad);
        }

        main ::slotted(form-control) {
            display: block;
        }

        .pretitle slot {
            font-size: .8em;
            font-weight: bold;
        }

        .title slot {
            font-size: 1.2em;
            font-weight: bold;
        }

        .body {
            color: rgba(var(--theme-text-rgb, 0,0,0), .6);
        }

        :host([color]) .body {
            color: rgba(var(--theme-text-rgb, 0,0,0), .8);
        }

        footer {
            display: flex;
            justify-content: flex-end;
            padding: calc(var(--pad) - .5em);
            margin-top: auto;
        }

        :host([nocontent][notext][in-popover]) footer {
            padding: .25rem;
        }

        :host([nobtns]) footer {
            padding: 0;
        }

        :host([toast]) footer {
            margin-top: inherit;
        }

        footer b-dialog-btn {
            text-transform: uppercase;
            line-height: 0;
            align-self: center;
        }

        .close-btn {
            position: absolute;
            padding: .35em .1em;
            /* top: 0;
            right: 0; */
            top: calc(var(--pad) / 4);
            right: calc(var(--pad) / 4);
        }

        .close-btn:not(:hover) {
            color: rgba(var(--theme-text-rgb, 0,0,0), .3);
        }
    `}

    constructor(opts={}){
        super()
        
        for( let k in opts ){

            let prop = Object.getOwnPropertyDescriptor(DialogElement.prototype, k)

            if( prop && prop.set ){
                this[k] = opts[k]
            }
        }

        // TEMP: backwards compt
        if( opts.msg )
            this.body = opts.msg

        if( opts.btns === undefined )
            this.btns = ['dismiss']

        this.promise = new Promise(resolve=>{ this._resolve = resolve })
    }

    updated(){
        if( this.btns.length>0 && !this.title && !this.pretitle && !this.body )
            this.setAttribute('notext', '')
        else
            this.removeAttribute('notext')

        this.toggleAttribute('nobtns', this.btns.length==0)
    }

    set btns(btns){
        let doUpdate = !!this.__btns
        if( !btns )
            this.__btns = []
        else if( !Array.isArray(btns) )
            this.__btns = [btns]
        else 
            this.__btns = btns
        
        if( doUpdate ){
            this.update()
            this.updated()
        }
    }

    get btns(){ return this.__btns }

    render(){return html`

        ${this.closeBtn?html`
            <b-icon class="close-btn" name="cancel-circled" @click=${this.cancelClose}></b-icon>
        `:''}

        <aside>
            <slot name="icon">
                ${this.icon=='spinner'?html`
                    <b-spinner></b-spinner>
                `:this.icon?html`
                    <b-icon square name="${this.icon}"></b-icon>
                `:''}
            </slot>
        </aside>
        <main>
            <div class="pretitle">
                <slot name="pretitle">${this.pretitle}</slot>
            </div>
            <div class="title">
                <slot name="title">${this.title}</slot>
            </div>
            <div class="body">
                <slot name="body">${this.body}</slot>
            </div>
            ${this.renderView()}
            <slot></slot>
        </main>
        <footer @click=${this.onClick}>
            ${this.btns.map(b=>new Button(b))}
        </footer>
    `}

    renderView(){ return '' }

    onClick(e){
        e.stopPropagation()
        
        let btn = e.target
        if( btn.tagName != "B-DIALOG-BTN" ) return

        this.emitEvent('chosen', {btn})

        this.resolveBtn(btn)
    }

    onKeydown(e){

        let btn

        if( this.btns.lengt == 0 || !['Escape', 'Enter'].includes(e.key) )
            return

        if( this.shadowRoot.activeElement && this.shadowRoot.activeElement.tagName == 'B-DIALOG-BTN'){
            btn = this.shadowRoot.activeElement
            btn.blur()
        }
        
        if( e.key == 'Escape' ){
            btn = Array.from(this.$$all('b-dialog-btn')).find(btn=>btn.isCancelBtn)
        }else if( !btn && e.key == 'Enter' ){
            btn = Array.from(this.$$all('b-dialog-btn')).reverse().find(btn=>!btn.isCancelBtn)
        }

        if( btn != undefined ){
			// let other views finish with keydown before we process (ex: Dialog.prompt)
			setTimeout(()=>{
                // FIXME: 
				if( document.activeElement == document.body )
					this.resolveBtn(btn)
			}, 0);
		}
	}

    cancelClose(){
        if( this.resolve(false) === true )
			this.close()
    }
	
	resolveBtn(btn){
		if( btn.isCancelBtn )
			btn = false
		
		if( this.resolve(btn) === true )
			this.close()
	}
	
	resolve(resp){
		if( this.onResolve ){
			
			try{
				resp = this.onResolve(resp, this)
			}catch(err){
				console.log('failed to resolve');
				return false
			}
		}
		
		if( this._resolve )
			this._resolve(resp)
			
		return true
	}
	
	close(){
		if( this.presenter )
			this.presenter.close()
        else
            this.remove()
	}

})

export default customElements.get('b-dialog')