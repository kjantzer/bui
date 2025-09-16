/*
    # Snap Scroller

    ```html-preview
    <b-snap-scroller dir="x" style="--gap: 1em; --size: 66%;">
        <div style="background: gray; height: 200px;">Item 1</div>
        <div style="background: gray; height: 200px;">Item 2</div>
        <div style="background: gray; height: 200px;">Item 3</div>
    </b-snap-scroller>
    ```

    ## Properties
    - `dir` - `x` or `y`
    - `align` - `start`, `center`, or `end`
    - `scale` - scale the items on hover
    - `buttons` - show buttons (="always" to show always, otherwise only show on hover)

    ## CSS Variables
    - `--gap` - gap between items
    - `--size` - size of the items (width for `x`, height for `y`)
    - `--spacer` - size of the spacer (width for `x`, height for `y`)
    - `--padding` - padding around the scroller

    > todo: add dot indicators for number of items?
*/
import { LitElement, html, css } from 'lit'
import scrollbars from '../helpers/scrollbars'

customElements.define('b-snap-scroller', class extends LitElement{

    static properties = {
        dir: {type: String, reflect: true},
        align: {type: String, reflect: true}
    }

    static styles = css`
        :host {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            position: relative;
            box-sizing: border-box;
            position: relative;
        }

        .scroller {
            display: flex;
            gap: var(--gap);
            padding: var(--padding);
        }

        :host([dir="x"]) .scroller {
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
        }

        :host([dir="y"]) .scroller {
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            flex-direction: column;
        }

        .spacer {
            flex-shrink: 0;
            min-width: 0;
            scroll-snap-align: var(--align);
        }

        :host([dir="x"]) .spacer { width: var(--spacer); }
        :host([dir="y"]) .spacer { height: var(--spacer); }

        :host([dir="x"]) [part="spacer start"] {
            margin-left: calc(-1 * var(--gap));
        }

        :host([dir="y"]) [part="spacer start"] {
            margin-top: calc(-1 * var(--gap));
        }

        :host([dir="x"]) [part="spacer end"] {
            margin-left: calc(-1 * var(--gap));
        }

        :host([dir="y"]) [part="spacer end"] {
            margin-top: calc(-1 * var(--gap));
        }

        ${scrollbars.hide('.scroller')}

        .main::slotted(*) {
            scroll-snap-align: var(--align);
        }

        :host([dir="x"]) .main::slotted(*) {
            width: var(--size);
            min-width: var(--size);
        }

        :host([dir="y"]) .main::slotted(*) {
            height: var(--size);
            min-height: var(--size);
        }

        [name="buttons"] {
            pointer-events: none;
            position: absolute;
            z-index: 100;
            margin: 0;
            display: flex;
            justify-content: space-between;
        }

        :host(:not([buttons])) [name="buttons"] {
            display: none;
        }

        :host([dir="x"]) [name="buttons"] {
            align-self: anchor-center;
            left: 0;
            right: 0;
        }

        :host([dir="y"]) [name="buttons"] {
            flex-direction: column;
            justify-self: anchor-center;
            top: 0;
            bottom: 0;
        }

        [name="buttons"]::slotted(*) {
            pointer-events: auto;
        }

        :host(:not(:hover):not([buttons="always"])) [name="buttons"] {
            visibility: hidden;
        }

        @media (hover: none) and (pointer: coarse) {
            [name="buttons"] {
                display: none;
            }
        }

        :host([scale]) .main::slotted(*) {
            transition: transform 140ms ease-in-out;
        }

        @media (hover: hover) and (pointer: fine) {
            :host([scale]) .main::slotted(*:hover) {
                transform: scale(1.03);
            }
        }

        [name="buttons"] {
            font-size: 1em;
        }

        [name="buttons"] > slot {
            display: block;
            pointer-events: auto;
        }

        [name="buttons"] > slot::slotted(*),
        [name="buttons"] > slot > * {
            pointer-events: none;
        }

        .btn svg {
            height: 1em;
        }

        :host([dir="x"]) .btn.prev { rotate: 90deg; }
        :host([dir="x"]) .btn.next { rotate: -90deg; }
        :host([dir="y"]) .btn.prev { rotate: 180deg; }
    `

    constructor(){
        super()
        this.align = 'start'
        this.dir = 'x'
    }

    updated(){
        this.style.setProperty('--align', this.align)
    }

    render(){return html`
        <slot name="buttons" @click=${this.buttonClick}>
            <slot name="button-prev" part="button prev">
                <div class="btn prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
            </slot>
            
            <slot name="button-next" part="button next">
                <div class="btn next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
            </slot>
        </slot>

        <div class="scroller" part="scroller">
            <div class="spacer" part="spacer start"></div>
            <slot class="main"></slot>
            <div class="spacer" part="spacer end"></div>
        </div>
    `}

    // NOTE: not sure this is the best way
    buttonClick(e){
        // let index = e.currentTarget.assignedElements().indexOf(e.target)
        let index = Array.from(e.currentTarget.children).indexOf(e.target)
        if( index == 0 ) this.prev()
        if( index == 1 ) this.next()
    }

    next(){
        let nextEl = this.scrollerChildren.find(el=>this.offset(el) - (this.clientSize(el)/4) > this.indexAt)
        this.scrollTo(nextEl)
    }

    prev(){
        // NOTE: fix for align:end
        let prevEl = this.scrollerChildren.reverse().find(el=>this.offset(el) + this.clientSize(el) < this.indexAt)
        this.scrollTo(prevEl)
    }

    scrollTo(index){
        let el = typeof index == 'number' ? this.scroller.children[index] : index

        el?.scrollIntoView({
            behavior: 'smooth',
            [this.dir=='x'?'block':'inline']: 'nearest',
            [this.dir=='x'?'inline':'block']: this.align
        });
    }

    get progress(){
        return  (this.scrollAmt(this.scroller) / (this.scrollSize(this.scroller) - this.clientSize(this.scroller)))
    }

    get indexAt(){
        let offset = 0
        if( this.align == 'center' ) offset = this.clientSize(this.scroller)/2
        if( this.align == 'end' ) offset = this.clientSize(this.scroller)

        return this.scrollAmt(this.scroller) + offset
    }

    get scroller(){
        return this.shadowRoot.querySelector('.scroller')
    }

    get scrollerSlot(){
        return this.shadowRoot.querySelector('.scroller > .main')
    }

    get scrollerChildren(){
        let children = Array.from(this.scrollerSlot.assignedElements())

        if( children.length == 1 && children[0].tagName == 'SLOT' )
            children = Array.from(children[0].assignedElements())

        return children
    }

    // utilities for getting element size/pos props depending on direction
    offset(el){ return this.dir == 'x' ? el.offsetLeft : el.offsetTop }
    clientSize(el){ return this.dir == 'x' ? el.clientWidth : el.clientHeight }
    scrollSize(el){ return this.dir == 'x' ? el.scrollWidth : el.scrollHeight }
    scrollAmt(el){ return this.dir == 'x' ? el.scrollLeft : el.scrollTop }
})

export default customElements.get('b-snap-scroller')