/*
    Shared item styles for <b-nav-view-bar> buttons and <b-nav-view-link>

    The bar sets the --nav-item-* vars for each mode (sidebar list, compact rail, narrow tab bar);
    links slotted into the bar inherit them so they match
*/
import {css} from 'lit'

export default css`
    .item {
        display: flex;
        flex-direction: var(--nav-item-direction, row);
        align-items: center;
        gap: var(--nav-item-gap, .65em);
        flex: var(--nav-item-flex, none);
        min-width: var(--nav-item-min-width, 0);
        width: var(--nav-item-width, 100%);
        box-sizing: border-box;
        padding: var(--nav-item-padding, .5em .75em);
        border: none;
        border-radius: var(--nav-item-radius, 8px);
        background: none;
        font: inherit;
        font-size: var(--nav-item-font-size, inherit);
        font-weight: var(--nav-item-font-weight, 400);
        color: var(--theme-text);
        text-align: var(--nav-item-align, left);
        cursor: pointer;
        transition: background-color 120ms, color 120ms;
        -webkit-tap-highlight-color: transparent;
    }

    .item b-icon {
        color: var(--nav-item-icon-color, var(--theme-text-accent));
        font-size: var(--nav-item-icon-size, 1.1em);
        flex-shrink: 0;
        width: var(--nav-item-icon-width, 1.25em); /* same box for every icon so labels line up (like the app shell sidebar) */
    }

    /* a section's own icon (ex: an avatar, see renderTabIcon) */
    .item .tab-icon {
        --size: var(--nav-item-tab-icon-size, 1.35em);
        flex-shrink: 0;
    }

    .item span {
        min-width: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.3; /* (room for descenders; overflow: hidden clips at the line box) */
    }

    /* compact rail: allow 2 line labels */
    :host([compact]) .item span,
    .item.wrap span {
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.15;
    }

    .item[active] {
        background: var(--nav-item-active-bgd, color-mix(in srgb, var(--theme) 14%, transparent));
        color: var(--nav-item-active-color, var(--theme));
        font-weight: 600;
    }

    .item[active] b-icon {
        color: var(--nav-item-active-color, var(--theme));
    }

    @media (hover) {
        .item:not([active]):hover {
            background: var(--nav-item-hover-bgd, var(--theme-bgd-accent2));
        }
    }
`
