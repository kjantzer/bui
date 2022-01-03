import { css } from 'lit-element'

export default css`
    :host {
        display: inline-grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr auto;
        position:relative;
        --columns: repeat(7, 1fr);
        --gap: .25em;
        --pad: .5em;
        --size: 2em;
        --font-size: 1em;
        /* --font-size: calc(.4 * var(--size)); */
        user-select: none;
        width: 100%;
        height: 100%;
    }

    :host(:not([ready])) {
        opacity: 0;
        pointer-events: none;
    }

    :host([weekends="small"]) {
        --columns: 1fr repeat(5, 2fr) 1fr;
    }

    :host([weekends="mini"]) {
        --columns: 3em repeat(5, 2fr) 3em;
    }
    
    /* :host(:not([inputs])) header {
        height: .25em;
        padding: 0;
        visibility: hidden;
    } */

    :host(:not([btns])) footer {
        height: 0;
        padding: 0;
        visibility: hidden;
    }

    @media (max-width: 599px){
        :host {
            /* grid-template-columns: 1fr; */
            /* grid-template-rows: auto auto 1fr auto auto; */
            /* height: 400px; */
        }
    }

    footer {
        grid-column: 1/-1;
        border-top: solid 1px var(--theme-bgd-accent, #ddd);
        padding: var(--gap);
        text-align: right;
    }

    lit-virtualizer {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        /* padding: 0 var(--pad); */
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


    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em .5em;
        /* border-bottom: solid 1px var(--theme-bgd-accent); */
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
        grid-template-columns: var(--columns);
        /* grid-auto-rows: 2em; */
        gap: var(--gap);
        text-align: right;
        border-bottom: solid 2px rgba(var(--theme-text-rgb), .1);
        padding: .15em var(--pad);
    }

    .day-header > div {
        font-size: var(--font-size);
        font-weight: bold;
        margin-right: .5em;
    }

    :host([display="biweekly"]) b-calendar-month {
        height: calc(var(--height) * 2)
    }

    :host([display="weekly"]) b-calendar-month {
        height: calc(var(--height) * 4)
    }
`