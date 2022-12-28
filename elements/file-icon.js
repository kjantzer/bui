
import { LitElement, html, css } from 'lit'
import './text'

export const fileIconColors = {

    pdf: css`:host([ext="pdf"]){ --bgd: #b40808; }`,
    js: css` :host([ext="js"]){ --bgd: #f8dc3d; --color: #333;}`,
    json: css`:host([ext="json"]){ --bgd: #f8dc3d; --color: #333;}`,
    video: css`:host([ext="mp4"]){ --bgd: var(--red);}`,
    html: css`:host([ext="html"]){ --bgd: #e54c21}`,
    xml: css`:host([ext="xml"]){ --bgd: #f26524}`,
    onix: css`:host([ext="onix"]){ --bgd: #626a7f;}`,
    zip: css`:host([ext="zip"]){ --bgd: var(--gray-600);}`,

    jpg: css`:host([ext="jpg"]){ --bgd: var(--blue); }`,
    jpeg: css`:host([ext="jpeg"]){ --bgd: var(--blue); }`,
    png: css`:host([ext="png"]){ --bgd: var(--blue); }`,
    gif: css`:host([ext="gif"]){ --bgd: var(--blue); }`,
    svg: css`:host([ext="svg"]){ --bgd: var(--cyan); }`,

    wav: css`:host([ext="wav"]){ --bgd: var(--deep-purple); }`,
    mp3: css`:host([ext="mp3"]){ --bgd: var(--deep-orange); }`,
    flac: css`:host([ext="flac"]){ --bgd: var(--deep-purple); }`,
    m4a: css`:host([ext="m4a"]){ --bgd: var(--deep-purple); }`,

    // Microsoft
    word: css`
        :host([ext="doc"]),
        :host([ext="docx"]) {
            --bgd: #0f52b7;
        }
    `,
    excel: css`
        :host([ext="xls"]),
        :host([ext="xlsx"]),
        :host([ext="xlsm"]) {
            --bgd: #0a8144;
        }
    `,

    // Adobe
    psd: css`
        :host([ext="psd"]) {
            --bgd: #011c24;
            --color: #00c8ff;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
    indd: css`
        :host([ext="indd"]),
        :host([ext="idml"]) {
            --bgd: #2a020b;
            --color: #ff3c95;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
    icml: css`
        :host([ext="icml"]) {
            --bgd: #2a0c2a;
            --color: #eb72eb;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
    ai: css`
        :host([ext="ai"]),
        :host([ext="ait"]) {
            --bgd: #251300;
            --color: #fe7c00;
            --dog-ear-bgd: var(--color);
            --border-color: var(--color);
        }
    `,
    pdf: css`
        :host([ext="pdf"]) {
            --bgd: #2f1208;
            --color: #fff;
            --dog-ear-bgd: #fd3406;
            --border-color: #fd3406;
        }
    `


}

export const fileIconLabels = {
    'json': html`<span>{ }</span>`,
    'mp4': html`<b-icon name="videocam"></b-icon>`,
    
    'mp3': ext=>html`<b-icon name="music"></b-icon><b-text sm bold ucase>${ext}</b-text>`,
    'wav': ext=>html`<b-icon name="music"></b-icon><b-text sm bold ucase>${ext}</b-text>`,
    'flac': ext=>html`<b-icon name="music"></b-icon><b-text sm bold ucase>${ext}</b-text>`,

    'html': ext=>html`<b-icon name="code"></b-icon><b-text sm bold ucase>${ext}</b-text>`,
    'xml': ext=>html`<b-icon name="code"></b-icon><b-text sm bold ucase>${ext}</b-text>`,
    'onix': ext=>html`<b-icon name="code"></b-icon><b-text sm bold ucase>${ext}</b-text>`,
    
    'dpl': html`<b-icon name="cd"></b-icon>`,
    'iso': html`<b-icon name="cd"></b-icon>`,

    'zip': html`<b-icon name="archive"></b-icon>`,
    'epub': ext=>html`<b-icon name="book-open"></b-icon><b-text sm bold ucase>${ext}</b-text>`,
}


export default function(customColors={}, customLabels={}){

if( customElements.get('b-file-icon') )
    return

Object.assign(fileIconColors, customColors)
Object.assign(fileIconLabels, customLabels)

customElements.define('b-file-icon', class extends LitElement{

    static get properties(){ return {
        ext: {type: String, reflect: true}
    }}

    static get styles(){
        return [css`
        :host {
            display: inline-block;
            position:relative;
            --color: var(--b-file-icon-color-default, #fff);
            --bgd: var(--b-file-icon-bgd-default, #aaa);
            --size: var(--b-file-icon-size, 2em);
            --radius: var(--b-file-icon-radius, 0px);
            --border-color: transparent;

            width: calc(.8 * var(--size));
            height: var(--size);
            text-transform: uppercase;
            vertical-align: top;
        }

        main {
            padding: 20%;
            padding-top: 30%; /* appears more center */
            box-sizing: border-box;
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--bgd);
            border-radius: var(--radius);
            border-bottom: calc(var(--size) * .02) solid rgba(0, 0, 0, 0.4);
            -webkit-clip-path: polygon(0 0, 66% 0, 100% 26.4%, 100% 100%, 0 100%);
            clip-path: polygon(0 0, 66% 0, 100% 26.4%, 100% 100%, 0 100%);

            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--color);
            box-shadow: 0 0 0 calc(.05 * var(--size)) var(--border-color) inset;
        }

        .dogear {
            position: absolute;
            top: 0;
            right: 0;
            background: var(--dog-ear-bgd, rgba(0,0,0,.4));
            border-radius: 0 0 0 var(--radius);

            height: calc(.8 * var(--size) * .34);
            width: calc(.8 * var(--size) * .34);
            -webkit-clip-path: polygon(0 0, 0% 100%, 100% 100%);
            clip-path: polygon(0 0, 0% 100%, 100% 100%);
        }

        label,
        ::slotted(*) {
            font-size: calc(var(--size) * .25);
            line-height: .5em;
        }

        label > span,
        label > b-icon {
            font-size: 1em;
            --size: 1em;
        }


        ::slotted(b-icon) {
            /* font-size: 1em; */
        }
    `].concat(Object.values(fileIconColors)) }

    render(){return html`
        <main>
            <div class="dogear"></div>
            <slot name="label">
                <label>${this.label}</label>
            </slot>
        </main>
        <slot></slot>
    `}

    get label(){
        let label = fileIconLabels[this.ext]

        if( label )
            return typeof label == 'function' ? label(this.ext) : label

        return this.ext
    }

})

}