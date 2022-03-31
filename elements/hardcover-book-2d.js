import { LitElement, html, css } from 'lit-element'

customElements.define('b-hardcover-book-2d', class extends LitElement{

    static get properties(){ return {
        src: {type: String, reflect: true}
    }}

    static get styles(){return css`
        :host {
            display: inline-block;
            border-radius: 2px;
            overflow: hidden;
            position:relative;
            background: var(--b-hardcover-book-2d-bgd, #bfbfbf);
            box-shadow: var(--b-hardcover-book-2d-shadow, rgba(0, 0, 0, 0.3) 0px 4px 10px);
            box-sizing: border-box;
            line-height: 0;
        }

        .spine {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 6%;
            height: 100%;
            background: red;

            /* room for improvement, but looks good enough for now */
            /* mimicing iOS Books app */
            background: linear-gradient(to right, 
                rgba(0, 0, 0, 0.3) 10%, 
                rgba(255,255,255, 0.3) 20%,
                transparent 50%,
                rgba(0, 0, 0, 0.25) 55%,
                rgba(0, 0, 0, 0.3),
                transparent 75%,
                rgba(0, 0, 0, 0.1) 80%,
                rgba(255,255,255, 0.2)
            );
        }

        img {
            width: 100%;
            height: auto;
            position: relative;
            z-index: 1;
        }

        img[hidden] {
            opacity: 0;
            visibility: hidden;
        }

        :host([auto-width]) img {
            width: auto;
            height: 100%;
        }

        :host([fit]) img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        slot {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            line-height: 1em;
            padding: var(--b-hardcover-book-2d-pading, .5em);
        }

        slot[name="fallback"] {
            z-index: 0;
        }
    `}

    render(){return html`
        <div class="spine"></div>
        <img src="${this.src}" loading="lazy" @error=${this.onError} @load=${this.onLoad}>
        <slot name="fallback"></slot>
        <slot></slot>
    `}

    onError(e){
        e.currentTarget.hidden = true
    }

    onLoad(e){
        e.currentTarget.hidden = false
    }

})

export default customElements.get('b-hardcover-book-2d')