import { LitElement, html, css } from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import {live} from 'lit/directives/live.js'
import {isDivider} from './util'
import isLitHTML from '../../helpers/lit/isLitHTML'

customElements.define('b-menu-item', class extends LitElement{

    static properties = {
        index: {type: Number, reflect: true},
        active: {type: Boolean, reflect: true},
        disabled: {type: Boolean, reflect: true}
    }

    static styles = css`

        :host{
        padding: var(--b-menu-item-padding, .5em .75em);
		margin: .25em;
    	border-radius: calc(var(--b-popover-radius, 8px) - .25em);
		transition: 120ms;
		display: flex;
		align-items: flex-start;
		position: relative;
        }

		:host > b-icon:first-child,
		:host > check-box + b-icon,
		:host > select-field + b-icon,
		:host > .icon {
			margin: .1em .5em 0 -.15em;
		}

		:host > .icon {
			display: inline-block;
		}

		:host > .icon * {
			vertical-align: text-top;
		}

		:host([icon-only]) > b-icon:first-child {
			margin: 0 -.25em;
		}

		.mi-content {
			flex-grow: 1;
			min-width: 1em;
		}

		.mi-label {
			line-height: 1.2em;
		}

		.mi-label p:first-child { margin-top: 0; }
		.mi-label p:last-child { margin-bottom: 0; }

		.mi-description p:first-child { margin-top: 0; }
		.mi-description p:last-child { margin-bottom: 0; }

		.mi-description:empty {
			display: none;
		}

		.mi-description {
			font-size: .8em;
			line-height: 1.2em;
			color: var(--b-menu-description-color, rgba(var(--theme-text-rgb), .6));
		}
		
		[selected] {
			background: var(--hoverBgd);
			color: var(--hoverTextColor);
		}

		b-icon.has-menu {
			/* better alignment */
			margin-left: .25em;
    		margin-top: 1px;
		}
		
		@media (hover) {
			:host(:hover)  {
				background: var(--hoverBgd);
				color: var(--hoverTextColor);
				cursor: pointer;
            }
			
            :host(:hover) b-icon.has-menu {
                opacity: 1;
            }

            :host(:hover) > check-box {
                --color: var(--checkboxColorHover) !important;
            }
		}

		:host([disabled]) {
			color: var(--theme-text-accent);
			background: var(--theme-bgd);
			cursor: not-allowed;
		}
		
		:host([active]),
		:host(.popover-open) {
			background: var(--hoverBgd);
			color: var(--hoverTextColor);
			cursor: pointer;
		}

		:host([active]) b-icon.has-menu,
		:host(.popover-open) b-icon.has-menu {
			opacity: 1;
		}

		:host([active]) > check-box,
		:host(.popover-open) > check-box {
			--color: var(--checkboxColorHover) !important;
		}

		@media (hover){
		    :host(.hover-red:hover){ background: var(--red-700, red); color: #fff; }
		    :host(.hover-orange:hover){ background: var(--orange-700, orange); color: #fff; }
		}
		
		check-box {
			--color: var(--checkboxColor) !important;
			margin: -.25em 0em -.25em .15em;
			align-self: center;
			order: 2;
		}

		select-field {
			order: 2;
			margin-left: .5em;
			margin-right: -.5em;
			color: var(--checkboxColor);
			// box-shadow: 0 0 0 1px var(--theme) inset;
			border-radius: 3px;
			// padding: 0 .1em;
			text-align: center;
			font-size: .8em;
			padding: 0.2rem 0.25rem;
			font-weight: bold;
		}

		select-field[value=""] {
			box-shadow: 0 0 0 2px var(--theme-text) inset;
			color: var(--b-menu-description-color, var(--theme-text));
		}

		select-field:not([value=""]) {
			background: var(--checkboxColor, var(--theme));
			color: white;
		}

		.mi-content ~ * {
			margin-left: 1em;
		}

		check-box:not([checked]) ~ .menu-item-extra.when-active {
			visibility: hidden;
		}
    `

	onClick(e){
		// add some data to event for the menu handler
		e.item = {target: e.target}
	}

    onModelChange(model){

        // capture menu item index for use in resolve (if so desired)
        if( model && typeof model != 'string' )
            model.index = this.index

		this.disabled = model.disabled ?? false

        /*
        class="menu-item ${m.className}" 
                val=${m.val} index=${this.index}
				data-title=${dataTitle}
				?icon-only=${!m.label && !m.description}
                ?selected=${m.selected}
        */
    }

    render(){

        let m = this.model

		let icon = ''
		
		if( m.icon && typeof m.icon == 'string' )
			icon = html`<b-icon square name="${m.icon}"></b-icon>`
		else if( m.icon ) 
			icon = html`<span class="icon">${m.icon}</span>`

		let checkbox = (this.opts.multiple && !m.clearsAll) || m.selected 
			? html`<check-box placement="left" ?checked=${live(m.selected)} 
				?disabled=${m.disabled ?? false }
				icon=${this.opts.iconSelected} 
				@click=${this.onClick}
				iconEmpty=${this.opts.iconDeselected}></check-box>` 
			: ''

		let menuIcon = m.menu && this.opts.hasMenuIcon ? html`<b-icon class="has-menu" name="${this.opts.hasMenuIcon}"></b-icon>` :''

		if( m.selections ){
			let selections = m.selections

			// if only two selections,
			// let's add a description telling the user they can ctrl+click to select section option
			if( selections.length == 2 ){

				// could be a string, so convert to standard label/val (needed so we can add description)
				if( !selections[1].val )
					selections[1] = {
						label: selections[1],
						val: selections[1]
					}
				
				selections[1].description = 'ctrl/cmd click'
			}
				
			
			if( this.opts.multiple)
				selections = [{label: 'Unset', val:'', clearsAll: true}, 'divider'].concat(selections)

			checkbox = html`<select-field 
							.options=${selections}
							placeholder="–"
							no-arrow
							?disabled=${m.disabled ?? false }
                            @click=${this.stopProp}
							@change=${this.selectOptionsChanged.bind(this)}
							.selected=${m.selection}
							adjust-for-mobile=false
							></select-field>`
		}


		let extras = ''
		if( m.extras ){
			extras = m.extras.map(elName=>{

				if( typeof elName == 'string' && customElements.get(elName) ){
					let el = document.createElement(elName)
					el.item = m
					el.classList.add('menu-item-extra')
					return el
				}

				return elName
			})
		}

		// was being used to set `data-title` on `.menu-item` element (still needed?)
		let dataTitle = (m.dataTitle || m.label+' '+m.description).trim().toLowerCase()

		let label = isLitHTML(m.label) ? m.label : unsafeHTML(String(m.label||''))
		let description = isLitHTML(m.description) ? m.description : unsafeHTML(String(m.description||''))

		return html`
            ${checkbox}
            ${icon}
            ${m.view&&(m.view instanceof HTMLElement||m.view.type=='html') ?m.view:html`
                <span class="mi-content">
                    <div class="mi-label">${label}</div>
                    <div class="mi-description">${description}</div>
                </span>
            `}
            ${extras}
            ${menuIcon}
		`

    }

	// NOTE: not sure I like this very much
	setValue(val){
		if( !this.model.selections )
			this.shadowRoot.querySelector('check-box').checked = val
		else
			this.shadowRoot.querySelector('select-field').value = val
	}

    stopProp(e){
        e.stopPropagation()
    }

    selectOptionsChanged(e){
        let val = e.currentTarget.value
        this.emitEvent('selection-changed', {val, index: this.index}, {bubbles: false})
    }

})

export default customElements.get('b-menu-item')