import {css} from 'lit-element'

export default css`

rich-text-field {
	z-index: 1000;
    --font-size: 1em;
    --line-height: 1.2em;
    --font-family: initial;
    --paragraphSpacing: .75em
}

rich-text-field textarea.view-source {
    display: none;
    width: 100%;
    height: auto;
    min-height: 1em;
    background: #f6f8fa;
    border: none;
    box-shadow: none;
    font-family: monospace;
    font-size: var(--font-size);
}

rich-text-field[view-source] textarea.view-source {
    display: block;
}

rich-text-field[view-source] main {
    display: none;
}

rich-text-field[serif] main {
    font-family: Garamond;
    font-size: 1.1em;
}

rich-text-field main {
    min-width: 1em;
    line-height: 1.3em;
    margin: -.15em 0; /* make up for the line height */
}

rich-text-field main ul {
    list-style: disc;
}

rich-text-field main ul,
rich-text-field main ol {
    margin: .5em 0 .5em 1.5em;
    padding: 0;
}

rich-text-field .ql-container {
    outline: none;
    font-size: var(--font-size);
    line-height: var(--line-height);
    font-family: var(--font-family);
}

rich-text-field .ql-container:not(.ql-disabled) {
    cursor: text;
}

rich-text-field .ql-editor {
    outline: none;
}

/* rich-text-field .ql-editor.ql-blank > *  {
    display: none;
} */

rich-text-field .ql-editor.ql-blank:before {
    content: attr(data-placeholder);
    color: rgba(0,0,0,.3);
    position: absolute;
}

rich-text-field .ql-editor > p {
    margin: 0;
}

rich-text-field .ql-editor > p:not(:last-child) {
    margin-bottom: var(--paragraphSpacing);
}

rich-text-field toolbar {
    font-size: .8em;
    position: absolute;
    display: flex;
    background: var(--theme-bgd-accent2, #f5f5f5);
    color: var(--theme-color, #000);
    /* box-shadow: rgba(0,0,0,.1) 0 1px 3px; */
    border-radius: 3px;
    top: -1em;
    right: 0;
    transform: translate(.5em, -50%);
    user-select: none;
    visibility: hidden;
    opacity: 0;
}

rich-text-field toolbar * {
    outline: none;
}

rich-text-field toolbar b-btn.active {
    --color: var(--theme, var(--blue, #2196F3));
}

rich-text-field .ql-clipboard {
    display: none;
}

form-control.nolabel rich-text-field toolbar {
	top: 0;
}

rich-text-field:focus-within toolbar {
	opacity: 1;
	visibility: visible;
}
`