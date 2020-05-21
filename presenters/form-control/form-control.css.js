import {css} from 'lit-element'

export default css`
slot#value {
	display: none;
}

slot[name="before"] { grid-area: before }
slot[name="help"] { grid-area: help }
slot[name="after"] { grid-area: after }

slot[name="before"],
slot[name="help"],
slot[name="after"]{
	display: block;
}

:host {
	align-self: flex-start;
	/* contain: content; */
	position: relative;
	display: inline-block;
	vertical-align: top;
	--placeholderColor: var(--fc-placeholder-color, rgba(0,0,0,.3));
	--selectionBgd: #FFECB3;
	--focusBgd: #FFF8E1;
	--focusColor: var(--fc-theme);
	 --bgd:var(--fc-bgd, #fff);
	--borderColor: rgba(0,0,0,.3);
	--invalidColor: #ff1744;
	--unsavedColor: transparent; /*#FFC107;*/
	--disabledColor: var(--fc-disabled-color, rgba(0,0,0,.3));
	--labelFontFamily: inherit;
	--labelFontSize: inherit;
	--padY: 0;
	--padX: 0;
}

:host main {
	grid-area: main;
	width: 100%;
	position: relative;
	z-index: 10;
	display: flex;
	line-height: 1em;
	caret-color: #E91E63;
	box-sizing: border-box;
}

/* :host(:not([disabled]):hover) main, */
/* :host(:not([disabled]):focus-within) main */
/* :host(:not([disabled])[focused]) main { */
	/* background: var(--focusBgd);
} */

:host([disabled]) main {
	color: var(--disabledColor);
}

:host(:not([disabled])) main ::selection {
	background: var(--selectionBgd);
}

/* :host(:not([disabled])) main {
	cursor: text;
} */

.label {
	position: absolute;
	z-index: 0;
	box-sizing: border-box;
	width: 100%;
	white-space: nowrap;
	font-family: var(--labelFontFamily);
	font-size: var(--labelFontSize);
}

:host([nolabel]) .label {
	display: none !important;
}

.prefix {
	order: 10;
}

.suffix {
	order: 30;
}

.prefix, .suffix {
	position: relative;
	z-index: 10;
	flex-shrink: 0;
    color: var(--placeholderColor);
	display: flex;
	align-items: center;
}

slot[name="prefix"]::slotted(form-control),
slot[name="suffix"]::slotted(form-control) {
	color: #333;
}

/* .control {
	order: 20;
	flex-grow: 1;
	outline: none;
	min-width: .25em;
	position: relative;
	z-index: 10;
} */

slot[name="control"]::slotted(*) {
	/* background: red; */
	order: 20;
	flex-grow: 1;
	outline: none;
	min-width: .25em;
	position: relative;
	z-index: 10;
}

:host(:not([disabled])) slot[name="control"]::slotted(*) {
	-webkit-user-select: text;
}

/* .control[empty]:before {
	content: attr(data-placeholder);
	color: var(--placeholderColor);
} */

:host(:not([material])[invalid]) main {
	color: var(--invalidColor)
}

.btns {
	display: none;
}

:host([btns]) .btns {
	order: 40;
	display: grid;
	/* height: 100%; */
	top: 0;
	flex-direction: column;
	min-width: 0;
	flex-grow: 0;
	font-size: 50%;
	position: relative;
	cursor: pointer;
}

.btns > span {
	padding: 0 .25em;
	display: flex;
	justify-content: center;
	align-items: center;
}

.btns > span svg {
	height: 2em;
	width: 2em;
}

.btn-save:hover {
	color: green;
	/* background: blue; */
}

.btn-cancel:hover {
	color: red;
	/* background: orange; */
}

:host([hidden]),
[hidden] {
	display: none !important;
}

slot[name="help"] {
	margin: .5em 0 0;
	font-size: .8em;
	color: var(--fc-help-color, rgba(0,0,0,.6));
	display: block;
}

/* some default styles for native input controls */ 
::slotted(input) {
	font-family: inherit;
	font-size: inherit;
	color: inherit;
	width: 4em; /* flex will make it grow */
	border: none;
	background: none;
	padding: var(--padX) var(--padY);
}

/* doesn't appear to work */
::slotted(input::placeholder) {
	color: var(--placeholderColor);
}

/* remove autofill blue/yellow background */
::slotted(input:-webkit-autofill) {
    -webkit-box-shadow:0 0 0 50px var(--bgd) inset;
	-webkit-text-fill-color: var(--theme-color);
}

::slotted(input:-webkit-autofill:focus) {
    -webkit-box-shadow: 0 0 0 50px var(--bgd) inset;
}

:host([label]:not([material])) {
	margin-top: 1em;
}

:host(:not([material])) .label {
	top: -1em;
}


/*
	Material
*/

:host([material]) {
	--focusBgd: transparent;
	/* padding-top: .25em; */
	--padY: .6em;
	--borderColor: rgba(0,0,0,.2);
}

:host([material]) main {
	border-bottom: solid 1px var(--borderColor);
	padding-top: var(--padY);
	border-radius: var(--fc-border-radius, 0px);
}

:host([material]:not(:focus-within):not([focused]):hover) main {
	background: var(--bgd);
}

:host([material]) main:before {
	content: '';
	border: solid 2px transparent;
	position: absolute;
	width: calc(100% + 2px);
	height: calc(100% + 2px);
	box-sizing: border-box;
	top: -1px;
	left: -1px;
	border-radius: var(--fc-border-radius, 0px);
}

:host([material]) slot[name="control"]::slotted(*) {
	padding: var(--padY) 0;
	/* border-bottom: solid 1px transparent; */
}

:host([material]) slot[name="control"]::slotted(radio-group) {
	--padY: .25em;
	--padX: .25em;
}

:host slot[name="control"]::slotted(check-box) {
	 border-bottom: solid 2px transparent
}

/* :host([unsaved]:not([material])) slot[name="control"]::slotted(check-box) {
	border-bottom-color: var(--unsavedColor);
} */

:host([material]) .label {
	color: var(--placeholderColor);
	display: block;
	transition: 120ms;
	position: absolute;
	padding: var(--padY) 0;
}

:host([material]) .prefix,
:host([material]) .suffix {
	padding: var(--padY) 0;
}

:host([material]:not([empty])),
:host([material]:focus-within),
:host([material][focused]) {
	--labelFontSize: .7em;
}

:host([material]) .control:not([empty]) ~ .label,
:host([material]:not([empty])) .label,
:host([material]:focus-within) .label,
:host([material][focused]) .label {
	color: inherit;
	transform: translateY(calc(-50% - (var(--padY) / 2)));
	z-index: 11;
}

:host([material][empty]:not([nolabel]):not(:focus-within)) [name="control"]::slotted(*),
:host([material][empty]:not([nolabel]):not(:focus-within)) [name="main"]::slotted(*) {
	opacity: 0;
}

:host([material]:not([show*="prefix"])) .prefix,
:host([material]:not([show*="suffix"])) .suffix {
	opacity: 0;
	transition: 120ms;
}

/* :host([material]) .control:not([empty]) ~ .prefix,
:host([material]) .control:not([empty]) ~ .suffix, */
:host([material]:not([empty])) .prefix,
:host([material]:not([empty])) .suffix,
:host([material]:focus-within) .prefix,
:host([material]:focus-within) .suffix,
:host([material][focused]) .prefix,
:host([material][focused]) .suffix {
	opacity: 1;
}

:host([material]:focus-within) main:before,
:host([material][focused]) main:before {
	border-bottom-color: var(--focusColor);
}

:host([material][invalid]) main:before {
	border-bottom-color: var(--invalidColor);
}

/* :host([material][unsaved]) main:before {
	border-bottom-color: var(--unsavedColor);
} */

:host([material]:focus-within) .label,
:host([material][focused]) .label {
	color: var(--focusColor);
}

:host([material][invalid]) .label {
	color: var(--invalidColor);
}


/*
	Material Outline
*/
:host([material="outline"]) {
	/* margin: 0 .5em .5em 0; */
	--padY: .75em;
	--padX: .75em;
}

:host([material="outline"]),
:host([material="outline"]) main,
:host([material="outline"]) main:before {
	border-radius: var(--fc-border-radius, 4px);
}
	
:host([material="outline"]) main {
	border: solid 1px var(--borderColor);
	padding-top: 0;
	background: var(--bgd);
}

/* :host([material="outline"]) .control, */
:host([material="outline"]) slot[name="control"]::slotted(*),
:host([material="outline"]) .label {
	padding: var(--padX) var(--padY);
	border-radius: var(--fc-border-radius, 3px);
}

:host([material="outline"]) slot[name="control"]::slotted(radio-group) {
	--padY: .25em;
	--padX: .5em;
}

:host([material="outline"]) .label {
	width: auto;
}

:host([material="outline"]) .prefix {
	padding: var(--padX) var(--padY);
    padding-right: 0;
    margin-right: calc(var(--padX) * -1);
}

:host([material="outline"]) .suffix {
	padding: var(--padX) var(--padY);
    padding-left: 0;
    margin-left: calc(var(--padX) * -1);
}

:host([material="outline"]) .control:not([empty]) ~ .label,
:host([material="outline"]:not([empty])) .label,
:host([material="outline"]:focus-within) .label,
:host([material="outline"][focused]) .label {
	background: var(--bgd);
	padding: 0 .35em;
	margin-left: var(--padX);
	transform: translateY(-50%);
}

:host([material="outline"]:focus-within) main:before,
:host([material="outline"][focused]) main:before {
	border-color: var(--focusColor);
}	

:host([material="outline"][invalid]) main:before {
	border-color: var(--invalidColor);
}

/* :host([material="outline"][unsaved]) main:before {
	border-color: var(--unsavedColor);
} */

:host([material="outline"]) slot[name="help"] {
	margin: .5em var(--padX) 0
}

/*
	Filled
*/		
:host([material="filled"]) {
	--bgd: var(--fc-bgd, #eee);
	--focusBgd: var(--bgd);
	--padY: .75em;
	--padX: .75em;
	--placeholderColor: var(--fc-placeholder-color, rgba(0,0,0,.3));
	/* margin: 0 0 .5em 0; */
}

:host([material="filled"]) main {
	border: solid 1px var(--bgd);
	padding-top: 1em;
	border-radius: var(--fc-border-radius, 4px);
	background: var(--bgd);
}

:host([material="filled"].nolabel) main, /* deprecated, use attribute */
:host([material="filled"][nolabel]) main {
	padding-top: 0;
}

:host([material="filled"].dense) main, /* deprecated, use attribute */
:host([material="filled"][dense]) main {
	--padY: .5em;
}

:host([material="filled"]) main:before {
	border-radius: var(--fc-border-radius, 4px);
}

:host([material="filled"]) .control,
:host([material="filled"]) slot[name="control"]::slotted(*),
:host([material="filled"]) .label {
	padding: var(--padY) var(--padX);
	border-radius: 3px;
}

:host([material="filled"]) slot[name="control"]::slotted(input) {
	padding: 0;
    margin: var(--padY) var(--padX);
    border-radius: 0;
}

:host([material="filled"]) .label {
	transform: translateY(-20%);
	width: auto;
}

:host([material="filled"]) .prefix {
	padding: var(--padY) var(--padX);
    padding-right: 0;
    margin-right: calc(-1 * var(--padX));
}

:host([material="filled"]) .suffix {
	padding: var(--padY) var(--padX);
    padding-left: 0;
    margin-left: calc(-1 * var(--padX));
}

:host([material="filled"]:not([empty])) .label,
:host([material="filled"]:focus-within) .label,
:host([material="filled"][focused]) .label {
	background: var(--bgd);
	padding: 0 .35em;
	margin-left: var(--padX);
	transform: translateY(-50%);
}

:host([material="filled"]:focus-within) main:before,
:host([material="filled"][focused]) main:before {
	border-color: var(--focusColor);
}	

:host([material="filled"][invalid]) main:before {
	border-color: var(--invalidColor);
}

/* :host([material="filled"][unsaved]) main:before {
	border-color: var(--unsavedColor);
} */

:host([material="filled"]) slot[name="help"] {
	margin: var(--padY) var(--padX) 0;
}
`