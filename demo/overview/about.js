/*
    About (the demo's start): what BUI is, what's in it (links to each section), and how to start
*/
import { LitElement, html, css } from 'lit'
import 'bui/elements/btn'
import 'bui/elements/copy-btn'
import 'bui/elements/text'
import 'bui/elements/icon'
import 'bui/elements/avatar'
import 'bui/elements/label'
import 'bui/elements/logo'
import Dialog from 'bui/presenters/dialog'
import Notif from 'bui/presenters/notif'

const INSTALL = 'npm install https://github.com/kjantzer/bui.git --save'

const SECTIONS = [
    {icon: 'code', title: 'Core', path: 'elements',
        text: 'The building blocks: buttons, text, icons, labels, avatars, layout, and more.'},
    {icon: 'call_to_action', title: 'Presenters', path: 'presenters',
        text: 'Dialogs, menus, popovers, panels, forms, lists, calendars, and nav views.'},
    {icon: 'view_sidebar', title: 'Components', path: 'components',
        text: 'Larger features ready to drop in: comments, file manager, search, tag lists.'},
    {icon: 'help_center', title: 'Docs', path: 'docs',
        text: 'Every documented file, including the app shell, router, helpers, and utilities.'},
    {icon: 'storage', title: 'Server', path: 'server',
        text: 'Node classes for REST APIs over MySQL, file storage, search, and realtime sync.'}
]

const PRINCIPLES = [
    {icon: 'devices', title: 'Any screen',
        text: 'Layouts adapt on their own, from a desktop sidebar to a phone tab bar.'},
    {icon: 'palette', title: 'Themeable',
        text: 'Light and dark modes and accent colors; restyle with CSS variables and ::part.'},
    {icon: 'link', title: 'Routed',
        text: 'Views, tabs, and panels get URLs, so links, back, and forward just work.'},
    {icon: 'extension', title: 'Take what you need',
        text: 'Import one element, or build a whole app on the shell. It all works with Lit.'}
]

const SAMPLE = `import { html } from 'lit'
import 'bui/elements/btn'
import Dialog from 'bui/presenters/dialog'

async function remove(){
    if( await Dialog.confirmDelete().modal() )
        // ...
}

html\`<b-btn icon="delete" color="red" @click=\${remove}>Delete</b-btn>\``

customElements.define('demo-about', class extends LitElement{

    static title = 'About'
    static icon = 'info'
    static id = 'about'
    static path = 'about'

    static styles = css`
        :host {
            display: block;
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2.5rem) calc(3rem + var(--nav-view-bottom-space, 0px));
            background: var(--theme-bgd);
            --radius: 16px;
            --line: rgba(var(--theme-text-rgb, 0,0,0), .1);
        }

        .page {
            max-width: 1040px;
            margin: 0 auto;
            container-type: inline-size;
            display: grid;
            gap: clamp(3rem, 7vw, 5rem);
        }

        a {
            color: var(--theme);
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        h1, h2, h3, p {
            margin: 0;
        }

        /* hero: what it is (left) and a few live elements (right) */
        .hero {
            display: grid;
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
            gap: clamp(2rem, 5vw, 4rem);
            align-items: center;
        }

        .hero bui-logo {
            --size: 3.25em;
            display: block;
            margin-bottom: 1.5rem;
        }

        .eyebrow {
            font-size: .8rem;
            font-weight: 600;
            letter-spacing: .08em;
            text-transform: uppercase;
            color: var(--theme);
            margin-bottom: .75rem;
        }

        h1 {
            font-size: clamp(2.2rem, 5vw, 3.4rem);
            line-height: 1.05;
            letter-spacing: -.02em;
            font-weight: 800;
        }

        /* (solid, like the logo; the theme gradient starts at a purpler blue) */
        h1 .accent {
            color: var(--theme);
        }

        .lede {
            margin-top: 1.25rem;
            font-size: 1.1rem;
            line-height: 1.6;
            color: var(--theme-text-accent);
            max-width: 34em;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: .5rem;
            margin-top: 2rem;
        }

        .install {
            display: flex;
            align-items: center;
            gap: .5rem;
            margin-top: 1.25rem;
            padding: .4rem .4rem .4rem .9rem;
            max-width: 100%;
            width: fit-content;
            box-sizing: border-box;
            border-radius: 10px;
            background: var(--theme-bgd-accent);
            font-family: var(--font-mono, ui-monospace, Menlo, monospace);
            font-size: .82rem;
        }

        .install span {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .install .prompt {
            color: var(--theme-text-accent);
            user-select: none;
        }

        /* a small "app" made of real BUI elements */
        .sample {
            border-radius: var(--radius);
            background: var(--theme-bgd-accent2, var(--theme-bgd-accent));
            border: solid 1px var(--line);
            padding: 1.25rem;
            display: grid;
            gap: .75rem;
            box-shadow: 0 20px 50px -25px rgba(0,0,0,.35);
        }

        .sample-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: .5rem;
        }

        .row {
            display: flex;
            align-items: center;
            gap: .75rem;
            padding: .7rem .75rem;
            border-radius: 12px;
            background: var(--theme-bgd);
        }

        .row b-avatar {
            --size: 2.25rem;
            flex-shrink: 0;
        }

        .row .who {
            flex: 1;
            min-width: 0;
            display: grid;
        }

        .sample-actions {
            display: flex;
            justify-content: flex-end;
            gap: .5rem;
            margin-top: .25rem;
        }

        /* sections */
        .section-head {
            display: grid;
            gap: .5rem;
            margin-bottom: 1.5rem;
        }

        h2 {
            font-size: 1.6rem;
            letter-spacing: -.01em;
            font-weight: 700;
        }

        .section-head p {
            color: var(--theme-text-accent);
            line-height: 1.5;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
            gap: .75rem;
        }

        /* five cards: a row of three, then two wider ones */
        @container (min-width: 760px) {
            .cards {
                grid-template-columns: repeat(6, minmax(0, 1fr));
            }

            .card { grid-column: span 2; }
            .card:nth-child(n+4) { grid-column: span 3; }
        }

        .card {
            display: grid;
            grid-template-columns: auto 1fr auto;
            gap: .25rem .85rem;
            align-items: start;
            padding: 1.1rem 1.1rem 1.2rem;
            border-radius: var(--radius);
            border: solid 1px var(--line);
            background: var(--theme-bgd);
            cursor: pointer;
            text-align: left;
            font: inherit;
            color: inherit;
            transition: border-color 150ms, transform 150ms, box-shadow 150ms;
        }

        .card:hover {
            border-color: color-mix(in srgb, var(--theme) 50%, transparent);
            transform: translateY(-2px);
            box-shadow: 0 12px 30px -18px rgba(0,0,0,.4);
        }

        .card:focus-visible {
            outline: 2px solid var(--theme);
            outline-offset: 2px;
        }

        .card .icon {
            grid-row: span 2;
            display: grid;
            place-items: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 10px;
            background: color-mix(in srgb, var(--theme) 14%, transparent);
            color: var(--theme);
        }

        .card h3 {
            font-size: 1.05rem;
            font-weight: 650;
            align-self: center;
        }

        .card p {
            grid-column: 2 / -1;
            color: var(--theme-text-accent);
            line-height: 1.45;
            font-size: .92rem;
        }

        .card .go {
            color: var(--theme-text-accent);
            opacity: 0;
            transition: opacity 150ms;
            align-self: center;
        }

        .card:hover .go {
            opacity: 1;
        }

        .principles {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
            gap: 1.75rem 2rem;
        }

        .principle b-icon {
            --size: 1.4em;
            color: var(--theme);
            margin-bottom: .6rem;
        }

        .principle h3 {
            font-size: 1rem;
            font-weight: 650;
            margin-bottom: .35rem;
        }

        .principle p {
            color: var(--theme-text-accent);
            line-height: 1.5;
            font-size: .95rem;
        }

        /* quick look: the code and what it does */
        .quick {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
            gap: clamp(1.5rem, 4vw, 3rem);
            align-items: center;
        }

        .quick .section-head {
            margin: 0;
        }

        .quick b-btn {
            justify-self: start;
            margin-top: .5rem;
        }

        pre {
            margin: 0;
            padding: 1.25rem 1.4rem;
            border-radius: var(--radius);
            background: #16181d;
            color: #e6e8ee;
            font-family: var(--font-mono, ui-monospace, Menlo, monospace);
            font-size: .82rem;
            line-height: 1.6;
            overflow: auto;
        }

        /* status */
        .note {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1rem;
            padding: 1.25rem 1.4rem;
            border-radius: var(--radius);
            border: solid 1px var(--line);
            line-height: 1.55;
        }

        .note b-icon {
            --size: 1.4em;
            color: var(--theme);
        }

        .note p + p {
            margin-top: .5rem;
            color: var(--theme-text-accent);
        }

        @media (max-width: 820px) {
            .hero,
            .quick {
                grid-template-columns: minmax(0, 1fr);
            }
        }

        /* (phones: the logo is in the header) */
        @media (max-width: 699px) {
            .hero bui-logo {
                display: none;
            }
        }
    `

    render(){return html`
        <div class="page">

            <section class="hero">
                <div>
                    <bui-logo></bui-logo>
                    <div class="eyebrow">Blackstone UI</div>
                    <h1>Build whole apps from <span class="accent">web components</span>.</h1>
                    <p class="lede">
                        BUI is the <a href="https://lit.dev" target="_blank">Lit</a> library behind Blackstone Publishing's
                        internal apps: UI elements, dialogs and lists, an app shell with routing, and the Node
                        server classes to back them. Use one piece, or all of it.
                    </p>

                    <div class="actions">
                        <b-btn lg pill color="theme" icon="arrow_forward" @click=${()=>goTo('setup')}>Get started</b-btn>
                        <b-btn lg pill outline @click=${()=>goTo('elements')}>Browse components</b-btn>
                        <b-btn lg pill clear icon="github" href="https://github.com/kjantzer/bui">GitHub</b-btn>
                    </div>

                    <div class="install">
                        <span class="prompt">$</span>
                        <span>${INSTALL}</span>
                        <b-copy-btn clear sm .value=${INSTALL}></b-copy-btn>
                    </div>
                </div>

                ${this.renderSample()}
            </section>

            <section>
                <div class="section-head">
                    <h2>What's inside</h2>
                    <p>Every part has live examples and docs in this app.</p>
                </div>

                <div class="cards">
                    ${SECTIONS.map(s=>html`
                        <button class="card" @click=${()=>goTo(s.path)}>
                            <span class="icon"><b-icon name=${s.icon}></b-icon></span>
                            <h3>${s.title}</h3>
                            <b-icon class="go" name="arrow_forward"></b-icon>
                            <p>${s.text}</p>
                        </button>
                    `)}
                </div>
            </section>

            <section class="principles">
                ${PRINCIPLES.map(p=>html`
                    <div class="principle">
                        <b-icon name=${p.icon}></b-icon>
                        <h3>${p.title}</h3>
                        <p>${p.text}</p>
                    </div>
                `)}
            </section>

            <section class="quick">
                <div class="section-head">
                    <h2>A quick look</h2>
                    <p>
                        Elements are plain HTML tags; presenters like dialogs are promises you await.
                        This asks before deleting and resolves to the choice.
                    </p>
                    <b-btn pill color="red" icon="delete" @click=${this.tryDelete}>Try it</b-btn>
                </div>
                <pre><code>${SAMPLE}</code></pre>
            </section>

            <section class="note">
                <b-icon name="info"></b-icon>
                <div>
                    <p>
                        <b>Actively developed.</b> BUI changes almost daily as Blackstone's apps grow, so install it from
                        GitHub rather than npm. Breaking changes are noted in the <a href="#/changelog">changelog</a>.
                    </p>
                    <p>A small team keeps it running in production, so the docs can trail the code; when in doubt, the source is the reference.</p>
                </div>
            </section>

        </div>
    `}

    // (real elements; the buttons work)
    renderSample(){return html`
        <div class="sample" aria-label="Example">
            <div class="sample-head">
                <b-text bold md>Reviewers</b-text>
                <b-label filled="theme">3 open</b-label>
            </div>

            ${[['SR', 'Sam R.', 'Approved the cover', 'green', 'Done'],
               ['AM', 'Ana M.', 'Reviewing chapter 4', 'orange', 'In progress'],
               ['DT', 'Dev T.', 'Not started', 'gray', 'Waiting']].map(([initials, name, status, color, label])=>html`
                <div class="row">
                    <b-avatar initials=${initials}></b-avatar>
                    <div class="who">
                        <b-text semibold>${name}</b-text>
                        <b-text sm muted>${status}</b-text>
                    </div>
                    <b-label filled=${color}>${label}</b-label>
                </div>
            `)}

            <div class="sample-actions">
                <b-btn clear @click=${this.tryNotif}>Remind</b-btn>
                <b-btn color="theme" icon="add" @click=${this.tryNotif}>Add reviewer</b-btn>
            </div>
        </div>
    `}

    async tryDelete(e){
        if( await Dialog.confirmDelete().popOver(e.currentTarget) )
            Notif.alert('Deleted (not really)')
    }

    tryNotif(){
        Notif.alert('That was a real BUI notification')
    }
})

export default customElements.get('demo-about')
