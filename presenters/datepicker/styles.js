import { css } from 'lit'

export default css`
    :host {
        display: inline-grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto 1fr auto;
        position:relative;
        --gap: .25em;
        --pad: .5em;
        --size: 2em;
        --font-size: calc(.4 * var(--size));
        user-select: none;
        height: 320px;
    }
    
    :host(:not([inputs])) header {
        height: .25em;
        padding: 0;
        visibility: hidden;
    }

    :host(:not([btns])) footer {
        height: 0;
        padding: 0;
        visibility: hidden;
    }

    b-datepicker-presets {
        grid-row: span 3;
        border-right: solid 1px var(--theme-bgd-accent, #ddd);
        padding: var(--gap);
        width: 170px;
    }

    @media (max-width: 599px){

        :host {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr auto auto;
            height: 400px;
        }

        b-datepicker-presets {
            width: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-row: 4;
            height: 100px;
            border-right: none;
            border-top: solid 1px var(--theme-bgd-accent, #ddd);
            font-size: .8em;
        }
    }

    b-datepicker-presets[hidden] {
        padding: 0;
        width: 0;
        height: 0;
    }

    footer {
        grid-column: 1/-1;
        border-top: solid 1px var(--theme-bgd-accent, #ddd);
        padding: var(--gap);
        text-align: right;
    }

    lit-virtualizer {
        width: calc((7 * var(--size)) + (2 * var(--pad)) + (6 * var(--gap)));
        height: 100%;
        box-sizing: border-box;
        padding: 0 var(--pad);
        overflow-x: hidden;
    }

    lit-virtualizer::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    lit-virtualizer {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    /* div {
        background: #ddd; 
        border-bottom: solid 1px black;
        height: 100%;
        width: 100%;
    } */

    header {
        padding: 1em .5em;
        /* border-bottom: solid 1px var(--theme-bgd-accent); */
    }

    header input {
        border: none;
        font-size: 1em;
        width: 6.5em;
        outline: none;
        background: none;
        color: inherit;
        user-select: initial;
    }

    :host([active="start"]) header input:first-of-type {
        color: var(--theme);
        box-shadow: 0 1px;
    }

    :host([active="end"]) header input:last-of-type {
        color: var(--theme);
        box-shadow: 0 1px;
    }

    .day-header {
        display: grid;
        grid-template-columns: repeat(7, var(--size));
        /* grid-auto-rows: 2em; */
        gap: var(--gap);
        text-align: center;
        border-bottom: solid 2px var(--theme-bgd-accent, #ddd);
        padding: .15em var(--pad);
    }

    .day-header > div {
        font-size: var(--font-size);
        font-weight: bold;

    }
`