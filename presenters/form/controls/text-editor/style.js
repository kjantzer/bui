import {css} from 'lit-element'

// https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/style.ts
export default css`

.ProseMirror {
	position: relative;
	outline: none;
}
.ProseMirror {
	cursor: text;
	word-wrap: break-word;
	white-space: pre-wrap;
	-webkit-font-variant-ligatures: none;
	font-variant-ligatures: none;
}
.ProseMirror [contenteditable="false"] {
	white-space: normal;
}
.ProseMirror [contenteditable="false"] [contenteditable="true"] {
	white-space: pre-wrap;
}
.ProseMirror pre {
	white-space: pre-wrap;
}
.ProseMirror-gapcursor {
	display: none;
	pointer-events: none;
	position: absolute;
}
.ProseMirror-gapcursor:after {
	content: "";
	display: block;
	position: absolute;
	top: -2px;
	width: 20px;
	border-top: 1px solid black;
	animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}
@keyframes ProseMirror-cursor-blink {
	to {
		visibility: hidden;
	}
}
.ProseMirror-hideselection *::selection {
	background: transparent;
}
.ProseMirror-hideselection *::-moz-selection {
	background: transparent;
}
.ProseMirror-hideselection * {
	caret-color: transparent;
}
.ProseMirror-focused .ProseMirror-gapcursor {
	display: block;
}
.tippy-box[data-animation=fade][data-state=hidden] {
	opacity: 0
}

.ProseMirror :first-child { margin-top: 0;}
.ProseMirror :last-child { margin-bottom: 0;}

.ProseMirror code {
	background-color: rgba(var(--theme-text-rgb),0.1);
	color: var(--theme-color-accent);
	padding: .1rem .3rem;
	border-radius: .4rem;
	font-size: .9rem;
}

.ProseMirror pre {
	background: #0D0D0D;
	color: #FFF;
	font-family: 'JetBrainsMono', monospace;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
}
.ProseMirror pre code {
	color: inherit;
	padding: 0;
	background: none;
	font-size: 0.8rem;
}

.ProseMirror p.is-editor-empty:first-child::before {
	/* content: attr(data-placeholder); */
	content: var(--placeholder);
	float: left;
	color: var(--theme-text-accent);
	pointer-events: none;
	height: 0;
}

.ProseMirror blockquote {
	color: rgba(var(--theme-text-rgb),0.6);
    border-left: 4px solid rgba(var(--theme-text-rgb),0.2);
    padding: 0.25em 0.5em;
    margin: 0.5em 0 .5em 1em;
}

.ProseMirror :is(h1,h2,h3,h4,h5){
	line-height: 1em;
}

`
