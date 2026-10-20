import { LitElement, html, css } from 'lit'

export default css`
:host {
    display: block;
    position:relative;
    pointer-events: all;
    width: var(--b-notif-width, 300px);
    max-width: 100%;

    /* overflow: hidden; */

    transition: 
        height 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms,
        opacity 300ms,
        transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

    opacity: 0;
    will-change: transform; 
}

:host([slot*="right"]) { transform: translateX(100%); }
:host([slot*="left"]) { transform: translateX(-100%); }
:host([slot="top"]) { transform: translateY(-100%); }
:host([slot="bottom"]) { transform: translateY(100%); }

:host([animation="grow"]) {
    transform: scale(.8)
}

:host([animation="bounce"]) {
    transform: none;
}

:host([animation="bounce"].entered) {
    animation-name: bounce;
    animation-duration: 700ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
}

:host([animation="fade"]) {
    transform: none;
}

:host([slot*="top"]) {
    --spacing-bottom: var(--padding);
}

:host([slot*="bottom"]) {
    --spacing-top: var(--padding);
}

:host(.entered) {
    opacity: 1;
    transform: none;
}

:host(.exit) {
    height: 0 !important;
}

/* :host(:empty) main {
    color: var(--b-notif-color, #fff);
    background: var(--b-notif-bgd, #333);
} */

main {
    background: var(--theme-bgd, #fff);
    --radius: var(--b-notif-radius, 8px);
    border-radius: var(--radius);
    margin-top: var(--spacing-top, 0);
    margin-bottom: var(--spacing-bottom, 0);
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
                0px 6px 10px 0px rgba(0,0,0,0.14),
                0px 1px 18px 0px rgba(0,0,0,0.12);
}

main:has(b-dialog[nocontent][notext]) {
    border-radius: 2em !important;
}

slot {
    display: block;
}

slot > *,
slot::slotted(*) {
    width: 100%;
    box-sizing: border-box;
}


:host {
    --b-notif-btn-color: var(--b-notif-color);
}

:host([color]) {
    --b-notif-btn-bgd: rgba(255,255,255,.1);
}

/* compact: one line pill sized to its content */
:host([compact]) {
    width: fit-content;
    max-width: min(var(--b-notif-compact-max-width, 420px), 100%);
    margin-left: auto; /* hug the anchored side */
}

:host([compact][slot*="left"]) {
    margin-left: 0;
    margin-right: auto;
}

:host([compact]) main {
    border-radius: 2em;
    background: var(--b-notif-compact-bgd, var(--theme-bgd, #fff));
    color: var(--b-notif-compact-color, var(--theme-text, #000));
}

:host([compact][color="inverse"]) main {
    --b-notif-compact-bgd: var(--theme-inverse-bgd, #333);
    --b-notif-compact-color: var(--theme-inverse-text, #fff);
    --theme-text: var(--theme-inverse-text, #fff);
    --theme-text-rgb: var(--theme-inverse-text-rgb, 255,255,255);
}

:host([compact][color="red"]) main { --b-notif-compact-bgd: var(--red, red); --b-notif-compact-color: #fff; --theme-text: #fff; }
:host([compact][color="orange"]) main { --b-notif-compact-bgd: var(--orange, orange); --b-notif-compact-color: #fff; --theme-text: #fff; }

.compact {
    display: flex;
    align-items: center;
    gap: .5em;
    min-height: 2.25em;
    padding: .25em .35em .25em 1em;
    font-size: .9em;
    box-sizing: border-box;
}

/* no buttons: even padding */
.compact:not(:has(b-dialog-btn)) {
    padding-right: 1em;
}

.compact b-icon {
    flex-shrink: 0;
}

:host([accent="green"]) .compact b-icon { color: var(--green, green); }
:host([accent="red"]) .compact b-icon { color: var(--red, red); }
:host([accent="blue"]) .compact b-icon { color: var(--blue, blue); }

.compact .msg {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.compact b-dialog-btn {
    flex-shrink: 0;
    border-radius: 2em;
    --radius: 2em;
}

@keyframes bounce {
  0% { transform: scale(0.8); }
  14% { transform: scale(1.1); }
  28% { transform: scale(.9); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
`