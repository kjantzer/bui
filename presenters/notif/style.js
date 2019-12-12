import { LitElement, html, css } from 'lit-element'

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

:host([color="red"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--red);
}

:host([color="blue"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--blue);
}

:host([color="green"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--green);
}

:host([color="orange"]) {
    --b-notif-color: #fff;
    --b-notif-bgd: var(--orange);
}

:host([color="amber"]) {
    --b-notif-color: var(--gray-900);
    --b-notif-bgd: var(--amber);
}

main {
    border-radius: var(--b-notif-radius, 4px);
    color: var(--b-notif-color, #fff);
    background: var(--b-notif-bgd, #333);
    margin-top: var(--spacing-top, 0);
    margin-bottom: var(--spacing-bottom, 0);

    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
                0px 6px 10px 0px rgba(0,0,0,0.14),
                0px 1px 18px 0px rgba(0,0,0,0.12);
}

slot {
    display: block;
}


:host {
    --b-notif-btn-color: var(--b-notif-color);
}

:host([color]) {
    --b-notif-btn-bgd: rgba(255,255,255,.1);
}

`