import { LitElement, html, css } from 'lit-element'

customElements.define('b-hardcover-book', class extends LitElement{

    static get properties(){ return {
        shadow: {type: Boolean, reflect: true},
        animated: {type: Boolean, reflect: true},
        open: {type: Boolean, reflect: true}
    }}

    constructor(){
        super()
        this.shadow = true
        this.animated = false
    }

    static get styles(){return css`
        /* ///////////////////////////////////////////////////

        HARDCOVER
        Table of Contents

        1. container
        2. background & color
        3. opening cover, back cover and pages
        4. position, transform y transition
        5. events
        6. Bonus
            - Cover design
            - Ribbon
            - Figcaption
        7. mini-reset

        https://tympanus.net/codrops/2013/07/11/animated-books-with-css-3d-transforms/

        /////////////////////////////////////////////////////*/

        /*
            1. container
        */

        :host {
            --width: 160px;
            --height: 250px;
            --bgd: #eee;
            --bgd-inside: #fffbec;
            --bgd-edge: #999;
            --shadow-color: rgba(0,0,0,.6);
            position: relative;
            width: var(--width); 
            height: var(--height);
            perspective: 1000px;
            flex-shrink: 0;
            display: inline-block;
            transform-style: preserve-3d;
            
        }

        *, *:after, *:before { 
            box-sizing: border-box;
        }

        ::before,
        ::after {
            content: "";
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        /*
            2. background & color
        */

        /* HARDCOVER FRONT */
        .front li:first-child {
            background-color: var(--bgd);
            backface-visibility: hidden;
        }

        /* reverse */
        .front li:last-child {
            background: var(--bgd-inside);
        }

        /* HARDCOVER BACK */
        .back li:first-child {
            background: var(--bgd-inside);
        }

        /* reverse */
        .back li:last-child {
            background: var(--bgd-inside);
        }

        .spine li:first-child {
            background: #eee;
        }
        .spine li:last-child {
            background: #333;
        }

        /* thickness of cover */

        .front li:first-child:after,
        .front li:first-child:before,
        .front li:last-child:after,
        .front li:last-child:before,
        .back li:first-child:after,
        .back li:first-child:before,
        .back li:last-child:after,
        .back li:last-child:before,
        .spine li:first-child:after,
        .spine li:first-child:before,
        .spine li:last-child:after,
        .spine li:last-child:before {
            background: var(--bgd-edge);
        }

        /* page */

        .page > li {
            background: linear-gradient(to left, #fffbf6 0%, #fff 100%);
            box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.1), inset -1px 0px 1px rgba(150, 150, 150, 0.2);
            border-radius: 0px 5px 5px 0px;
        }

        /*
            3. opening cover, back cover and pages
        */

        .front {
            transform: rotateY(-34deg) translateZ(8px);
            z-index: 100;
        }

        .back {
            transform: rotateY(-15deg) translateZ(-8px);
        }

        .page li:nth-child(1) { transform: rotateY(-28deg);}
        .page li:nth-child(2) { transform: rotateY(-30deg);}
        .page li:nth-child(3) { transform: rotateY(-32deg);}
        .page li:nth-child(4) { transform: rotateY(-34deg);}
        .page li:nth-child(5) { transform: rotateY(-36deg);}

        /*
            4. position, transform & transition
        */

        .front,
        .back,
        .spine,
        .front li,
        .back li,
        .spine li {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
        }

        .front,
        .back {
            transform-origin: 0% 100%;
        }

        .front {
            transition: all 0.8s ease, z-index 0.6s;
        }

        /* HARDCOVER front */
        .front li:first-child {
            cursor: default;
            user-select: none;
            transform: translateZ(2px);
        }

        .front li:last-child {
            transform: rotateY(180deg) translateZ(2px);
        }

        /* HARDCOVER back */
        .back li:first-child {
            transform: translateZ(2px);
        }

        .back li:last-child {
            transform: translateZ(-2px);
        }

        /* thickness of cover */
        .front li:first-child:after,
        .front li:first-child:before,
        .front li:last-child:after,
        .front li:last-child:before,
        .back li:first-child:after,
        .back li:first-child:before,
        .back li:last-child:after,
        .back li:last-child:before,
        .spine li:first-child:after,
        .spine li:first-child:before,
        .spine li:last-child:after,
        .spine li:last-child:before {
            position: absolute;
            top: 0;
            left: 0;
        }

        /* HARDCOVER front */
        .front li:first-child:after,
        .front li:first-child:before {
            width: 4px;
            height: 100%;
        }

        .front li:first-child:after {
            transform: rotateY(90deg) translateZ(-2px) translateX(2px);
        }

        .front li:first-child:before {
            transform: rotateY(90deg) translateZ(158px) translateX(2px);
        }

        .front li:last-child:after,
        .front li:last-child:before {
            width: 4px;
            height: var(--width);
        }

        .front li:last-child:after {
            transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
        }
        .front li:last-child:before {
            box-shadow: 0px 0px 30px 5px #333;
            transform: rotateX(90deg) rotateZ(90deg) translateZ(-170px) translateX(-2px) translateY(-78px);
        }

        /* thickness of cover */

        .back li:first-child:after,
        .back li:first-child:before {
            width: 4px;
            height: 100%;
        }

        .back li:first-child:after {
            transform: rotateY(90deg) translateZ(-2px) translateX(2px);
        }
        .back li:first-child:before {
            transform: rotateY(90deg) translateZ(158px) translateX(2px);
        }

        .back li:last-child:after,
        .back li:last-child:before {
            width: 4px;
            height: var(--width);
        }

        .back li:last-child:after {
            transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
        }

        .back li:last-child:before {
            transform: rotateX(90deg) rotateZ(90deg) translateZ(-170px) translateX(2px) translateY(-78px);
        }

        :host([shadow]) .back li:last-child:before {
            box-shadow: 10px -1px 80px 20px var(--shadow-color);
        }

        /* BOOK SPINE */
        .spine {
            transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
            width: 16px;
            z-index: 0;
        }

        .spine li:first-child {
            transform: translateZ(2px);
        }

        .spine li:last-child {
            transform: translateZ(-2px);
        }

        /* thickness of book spine */
        .spine li:first-child:after,
        .spine li:first-child:before {
            width: 4px;
            height: 100%;
        }

        .spine li:first-child:after {
            transform: rotateY(90deg) translateZ(-2px) translateX(2px);
        }

        .spine li:first-child:before {
            transform: rotateY(-90deg) translateZ(-12px);
        }

        .spine li:last-child:after,
        .spine li:last-child:before {
            width: 4px;
            height: 16px;
        }

        .spine li:last-child:after {
            transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
        }

        .spine li:last-child:before {
            box-shadow: 5px -1px 100px 40px rgba(0, 0, 0, 0.2);
            transform: rotateX(90deg) rotateZ(90deg) translateZ(-240px) translateX(2px) translateY(-6px);
        }

        .page,
        .page > li {
            position: absolute;
            top: 0;
            left: 0;
            transform-style: preserve-3d;
        }

        .page {
            width: 100%;
            height: 98%;
            top: 1%;
            left: 3%;
            z-index: 10;
        }

        .page > li {
            width: 100%;
            height: 100%;
            transform-origin: left center;
            transition-property: transform;
            transition-timing-function: ease;
        }

        .page > li:nth-child(1) { transition-duration: 0.6s;}
        .page > li:nth-child(2) { transition-duration: 0.6s;}
        .page > li:nth-child(3) { transition-duration: 0.4s;}
        .page > li:nth-child(4) { transition-duration: 0.5s;}
        .page > li:nth-child(5) { transition-duration: 0.6s;}

        /*
            5. events
        */

        .hardcover-book > .page li:nth-child(2) {
            background-position: top left;
            background-size: 310%
        }

        :host([animated]:hover) .front,
        :host([open]) .front {
            transform: rotateY(-145deg) translateZ(0);
            z-index: 0;
        }

        :host([animated]:hover) .page li:nth-child(1),
        :host([open]) .page li:nth-child(1) {
            transform: rotateY(-30deg);
            transition-duration: 1.5s;
        }

        :host([animated]:hover) .page li:nth-child(2),
        :host([open]) .page li:nth-child(2) {
            transform: rotateY(-32deg);
            transition-duration: 1.8s;
        }

        :host([animated]:hover) .page li:nth-child(3),
        :host([open]) .page li:nth-child(3) {
            transform: rotateY(-136deg);
            transition-duration: 1.6s;
        }

        :host([animated]:hover) .page li:nth-child(4),
        :host([open]) .page li:nth-child(4) {
            transform: rotateY(-138deg);
            transition-duration: 1.4s;
        }

        :host([animated]:hover) .page li:nth-child(5),
        :host([open]) .page li:nth-child(5) {
            transform: rotateY(-140deg);
            transition-duration: 1.2s;
        }

        /* cover CSS */

        .front-cover {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            /* overflow: hidden; */
            z-index: 1;
            backface-visibility: hidden;
            background-size: cover;
        }

        .front-cover::after {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }

        slot.cover::slotted(div) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            box-sizing: border-box;
        }

        li.inside {
            overflow: hidden;
        }

        slot[name="inside"]::slotted(*) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            box-sizing: border-box;
        }

        slot[name="cover-img"]::slotted(img) {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `}

    render(){return html`
        <figure class='hardcover-book'>

            <!-- Front -->

            <ul class='front'>
                <li>
                    <div class="front-cover">
                        <slot name="cover-img"></slot>
                        <slot class="cover"></slot>
                    </div>
                </li>
                <li></li>
            </ul>

            <!-- Pages -->

            <ul class='page'>
                <li></li>
                <li class="inside">
                    <slot name="inside"></slot>
                </li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <!-- Back -->

            <ul class='back'>
                <li></li>
                <li></li>
            </ul>
            <ul class='spine'>
                <li></li>
                <li></li>
            </ul>
            
        </figure>
    `}

})

export default customElements.get('b-hardcover-book')