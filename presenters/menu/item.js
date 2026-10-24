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
        padding: var(--b-menu-item-padding, .6em .75em);
		margin: 2px .4em;
    	border-radius: calc(var(--b-popover-radius, 8px) - .4em);
		transition: 120ms;
		display: flex;
		align-items: flex-start;
		gap: .75em;
		position: relative;
        }

		/* icon column: fixed width so labels line up; centered on the first line of the label */
		:host > b-icon:first-child,
		:host > check-box + b-icon,
		:host > select-field + b-icon,
		:host > .icon {
			flex-shrink: 0;
			font-size: var(--b-menu-icon-size, .9em);
			width: 1.4em; /* ~1.25em of the label; keeps labels lined up */
			height: 1.4em;
			margin: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--b-menu-icon-color, inherit);
		}

		:host > .icon * {
			vertical-align: text-top;
		}

		:host([icon-only]) > b-icon:first-child {
			width: auto;
			margin: 0 -.25em;
		}

		.mi-content {
			flex-grow: 1;
			min-width: 1em;
		}

		.mi-label {
			line-height: 1.25em;
		}

		.mi-label p:first-child { margin-top: 0; }
		.mi-label p:last-child { margin-bottom: 0; }

		.mi-description p:first-child { margin-top: 0; }
		.mi-description p:last-child { margin-bottom: 0; }

		.mi-description:empty {
			display: none;
		}

		.mi-description {
			margin-top: .15em;
			font-size: .8em;
			line-height: 1.3em;
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

			:host([destructive]:not([disabled]):hover){
				color: var(--red);
				background: color-mix(in srgb, var(--red) 20%, var(--theme-bgd));
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

		/* Is / Not (etc) picker: matches check-box (empty box when unset; filled badge when set) */
		select-field {
			order: 2;
			align-self: center;
			margin: -.25em -.25em -.25em .5em;
			box-sizing: border-box;
			min-width: 1.15rem;
			height: 1.15rem;
			border-radius: 5px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 0 .4rem;
			font-size: .75rem;
			font-weight: 600;
			line-height: 1;
			text-align: center;
			transition: background-color 120ms, border-color 120ms;
		}

		select-field[value=""] {
			padding: 0;
			width: 1.15rem;
			border: solid 1.5px rgba(var(--theme-text-rgb), .3);
			color: transparent; /* no "–" */
		}

		@media (hover) {
			:host(:hover) select-field[value=""] {
				border-color: var(--checkboxColor, var(--theme));
			}
		}

		select-field:not([value=""]) {
			background: var(--checkboxColor, var(--theme));
			color: white;
		}

		.mi-content ~ * {
			margin-left: .35em;
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

		let isDestructive = model?.destructive ?? model?.icon == 'trash'

		this.toggleAttribute('destructive', isDestructive)

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
				
				selections[1].description = 'right-click or ctrl/cmd click'
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