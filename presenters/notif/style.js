import { css } from 'lit'

export default css`
:host {
    display: block;
    position: relative;
    box-sizing: border-box;
    pointer-events: all;
    width: var(--b-notif-width, 340px);
    max-width: 100%;

    --radius: var(--b-notif-radius, 12px);
    --gap: var(--b-notif-gap, .625em);
    --peek: .5em;
    --ease: cubic-bezier(.2, 0, 0, 1);

    /* stack collapse/expand; enter/exit use the Web Animations API (see animations.js) */
    transition:
        margin 300ms var(--ease),
        scale 300ms var(--ease),
        opacity 200ms;
}

/* spacing lives inside the notif so collapsing its height also closes the gap */
:host([slot*="top"]) { padding-bottom: var(--gap); }
:host([slot*="bottom"]) { padding-top: var(--gap); }

:host([swipe-axis="x"]) { touch-action: pan-y; }
:host([swipe-axis="y"]) { touch-action: pan-x; }

:host([dragging]) {
    transition: none;
    user-select: none;
}

:host([closing]) {
    pointer-events: none;
}

/*
    Stack: older notifs tuck behind, peeking out toward the anchored edge
*/
:host([stacked]:not([expanded])) {
    scale: calc(1 - var(--stack-depth, 1) * .05);
}

:host([slot*="top"][stacked]:not([expanded])) {
    margin-bottom: calc(-1 * var(--h, 0px) + var(--peek));
    transform-origin: center top;
}

:host([slot*="bottom"][stacked]:not([expanded])) {
    margin-top: calc(-1 * var(--h, 0px) + var(--peek));
    transform-origin: center bottom;
}

:host([stacked="hidden"]:not([expanded])) {
    opacity: 0;
    pointer-events: none;
    --peek: 0px;
}

:host([stacked]:not([expanded])) main > * {
    opacity: 0;
    transition: opacity 200ms;
}

/*
    Surface + colors
    (a custom "view" like b-dialog paints itself; the notif gives it the radius, shadow and motion)
*/
:host {
    --_bgd: var(--b-notif-compact-bgd, var(--theme-bgd, #fff));
    --_text: var(--b-notif-compact-color, var(--theme-text, #222));
}

:host(:not([view])[color="inverse"]) {
    --theme-bgd: var(--theme-inverse-bgd);
    --theme-bgd-rgb: var(--theme-inverse-bgd-rgb);
    --theme-bgd-accent: var(--theme-inverse-bgd-accent);
    --theme-bgd-accent2: var(--theme-inverse-bgd-accent2);
    --theme-text: var(--theme-inverse-text);
    --theme-text-rgb: var(--theme-inverse-text-rgb);
    --theme-text-accent: var(--theme-inverse-text-accent);
    --theme-text-accent2: var(--theme-inverse-text-accent2);
    --_bgd: var(--b-notif-compact-bgd, var(--theme-inverse-bgd, #333));
    --_text: var(--b-notif-compact-color, var(--theme-inverse-text, #fff));
}

:host(:not([view])[color="dark"]) {
    --theme-text: var(--dark-text);
    --theme-text-rgb: var(--dark-text-rgb);
    --_bgd: var(--dark-bgd);
    --_text: var(--dark-text);
}

:host(:not([view])[color="light"]) {
    --theme-text: var(--light-text);
    --theme-text-rgb: var(--light-text-rgb);
    --_bgd: var(--light-bgd);
    --_text: var(--light-text);
}

/* solid colors */
:host(:not([view])[color="red"]) { --_bgd: var(--red, red); }
:host(:not([view])[color="blue"]) { --_bgd: var(--blue, blue); }
:host(:not([view])[color="green"]) { --_bgd: var(--green, green); }
:host(:not([view])[color="theme"]) { --_bgd: var(--theme, #2196f3); }
:host(:not([view])[color="orange"]) { --_bgd: var(--orange, orange); }

:host(:not([view])[color="red"]),
:host(:not([view])[color="blue"]),
:host(:not([view])[color="green"]),
:host(:not([view])[color="theme"]),
:host(:not([view])[color="orange"]) {
    --theme-text: #fff;
    --theme-text-rgb: 255,255,255;
    --_text: #fff;
    --accent: #fff;
}

:host(:not([view])[color="orange"]) {
    --theme-text: var(--light-text, #222);
    --theme-text-rgb: var(--light-text-rgb, 34,34,34);
    --_text: var(--light-text, #222);
    --accent: var(--light-text, #222);
}

:host([accent="red"]) { --accent: var(--red, red); }
:host([accent="green"]) { --accent: var(--green, green); }
:host([accent="blue"]) { --accent: var(--blue, blue); }
:host([accent="orange"]) { --accent: var(--orange, orange); }
:host([accent="theme"]) { --accent: var(--theme, #2196f3); }

main {
    position: relative;
    border-radius: var(--radius);
    background: var(--_bgd);
    color: var(--_text);
    box-shadow:
        0 0 0 1px rgba(var(--theme-text-rgb, 0,0,0), .07),
        0 1px 2px rgba(0,0,0,.08),
        0 6px 16px -4px rgba(0,0,0,.18),
        0 16px 36px -12px rgba(0,0,0,.24);
}

:host([view]) main {
    background: var(--theme-bgd, #fff);
    color: var(--theme-text, #222);
}

slot {
    display: block;
}

slot > *,
slot::slotted(*) {
    width: 100%;
    box-sizing: border-box;
}

/* pill shaped dialogs (only buttons) */
main:has(b-dialog[nocontent][notext]) {
    border-radius: 2em;
}

/*
    Content
*/
.content {
    display: flex;
    align-items: center;
    gap: .75em;
    min-height: 3.25em;
    padding: .625em .625em .625em .875em;
    box-sizing: border-box;
    line-height: 1.35;
}

/* no buttons or close btn: even padding */
.content:not(:has(.btns, .close-btn)) {
    padding-right: 1em;
}

.icon {
    flex-shrink: 0;
    align-self: flex-start;
    display: grid;
    place-items: center;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    color: var(--accent, currentColor);
    background: color-mix(in srgb, var(--accent, currentColor) 15%, transparent);
    --size: 1.15em;
}

/* centered next to a single line */
.content:not(:has(.title, .pretitle)) .icon {
    align-self: center;
}

.icon b-spinner {
    --size: 1.1em;
}

.text {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
}

.pretitle {
    font-size: .75em;
    font-weight: 600;
    letter-spacing: .03em;
    text-transform: uppercase;
    color: var(--accent, inherit);
    opacity: .9;
}

.title {
    font-weight: 600;
}

.title ~ .msg,
.pretitle ~ .msg {
    font-size: .9em;
    margin-top: .1em;
    color: rgba(var(--theme-text-rgb, 0,0,0), .7);
}

.msg > :first-child { margin-top: 0; }
.msg > :last-child { margin-bottom: 0; }

.btns {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: .25em;
}

.btns b-dialog-btn {
    font-size: .9em;
    --radius: 2em;
    --padding: .5em .9em;
    text-transform: capitalize;
}

.close-btn {
    flex-shrink: 0;
    align-self: flex-start;
    margin: -.125em -.125em 0 0;
    font-size: .85em;
    color: rgba(var(--theme-text-rgb, 0,0,0), .5);
    opacity: 0;
    transition: opacity 150ms;
}

:host(:hover) .close-btn,
.close-btn:focus-visible {
    opacity: 1;
}

@media (hover: none) {
    .close-btn { opacity: 1; }
}

/* thin bar counting down to auto close */
.progress {
    position: absolute;
    left: var(--radius);
    right: var(--radius);
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    overflow: hidden;
}

.progress > div {
    height: 100%;
    background: var(--accent, currentColor);
    opacity: .45;
    transform-origin: left center;
}

/*
    Edge: accent bar on the leading side
*/
:host([edge]:not([view])) main::before {
    content: '';
    position: absolute;
    left: .3em;
    top: .6em;
    bottom: .6em;
    width: 3px;
    border-radius: 3px;
    background: var(--accent, currentColor);
}

:host([edge]:not([view])) .content {
    padding-left: 1.125em;
}

/*
    Compact: one line pill sized to its content
*/
:host([compact]) {
    width: fit-content;
    max-width: min(var(--b-notif-compact-max-width, 420px), 100%);
    margin-left: auto; /* hug the anchored side */
}

:host([compact][slot*="left"]) {
    margin-left: 0;
    margin-right: auto;
}

:host([compact][slot="top"]),
:host([compact][slot="bottom"]) {
    margin-right: auto;
}

:host([compact]) main {
    border-radius: 2em;
}

:host([compact]) .content {
    gap: .5em;
    min-height: 2.5em;
    padding: .25em .3em .25em 1em;
    font-size: .9em;
}

:host([compact]) .content:not(:has(.btns, .close-btn)) {
    padding-right: 1.1em;
}

:host([compact]) .content:has(.icon) {
    padding-left: .5em;
}

:host([compact]) .icon {
    align-self: center;
    width: 1.75em;
    height: 1.75em;
    --size: 1em;
}

:host([compact]) .msg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

:host([compact]) .btns b-dialog-btn {
    font-size: 1em;
    --padding: .4em .8em;
}

:host([compact]) .close-btn {
    align-self: center;
    margin: 0;
}

@media (max-width: 599px) {
    :host([compact]) {
        margin-left: auto;
        margin-right: auto;
    }
}
`
