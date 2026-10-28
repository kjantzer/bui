<p align="center">
  <a href="https://bui.js.org" rel="noopener" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/kjantzer/bui/master/logo-dark.png">
      <img width="160" src="https://raw.githubusercontent.com/kjantzer/bui/master/logo.png"/>
    </picture>
  </a>
</p>

<h1 align="center">Blackstone UI</h1>

<p align="center">
  Build whole apps from web components.<br>
  The <a href="https://lit.dev">Lit</a> library behind <a href="https://www.blackstonepublishing.com">Blackstone Publishing</a>'s internal apps.
</p>

<p align="center">
  <a href="https://bui.js.org"><b>Demo &amp; docs</b></a> ·
  <a href="https://bui.js.org/#/setup">Setup</a> ·
  <a href="./CHANGELOG.md">Changelog</a>
</p>

[![BUI demo: the about page, a form in dark mode, and the phone layout](./preview.jpg)](https://bui.js.org)

BUI has UI elements, dialogs and lists, an app shell with routing, and the Node server classes to back them. Use one piece, or all of it.

## What's inside

| | |
|---|---|
| **[Core](https://bui.js.org/#/elements)** `bui/elements` | The building blocks: buttons, text, icons, labels, avatars, layout, and more |
| **[Presenters](https://bui.js.org/#/presenters)** `bui/presenters` | Dialogs, menus, popovers, panels, forms, lists, calendars, tabs, and nav views |
| **[Components](https://bui.js.org/#/components)** `bui/components` | Larger features ready to drop in: comments, file manager, search, tag lists |
| **App** `bui/app` | The app shell (sidebar, topbar, panels), router, views, and error handling |
| **[Server](https://bui.js.org/#/server)** `bui/server` | Node classes for REST APIs over MySQL, file storage, search, and realtime sync |
| **[Utilities](https://bui.js.org/#/docs)** `bui/util` `bui/helpers` | Small functions and Lit/Backbone helpers used throughout |

Every part has live examples in the [demo](https://bui.js.org), and [Docs](https://bui.js.org/#/docs) lists every documented file.

## Why BUI

- **Any screen.** Layouts adapt on their own, from a desktop sidebar to a phone tab bar
- **Themeable.** Light and dark modes and accent colors; restyle with CSS variables and `::part`
- **Routed.** Views, tabs, and panels get URLs, so links, back, and forward just work
- **Take what you need.** Import one element, or build a whole app on the shell. It all works with Lit

## Install

```bash
npm install https://github.com/kjantzer/bui.git --save
```

BUI changes too often to publish consistent versions, so install it from GitHub rather than the (outdated) [npm package](https://www.npmjs.com/package/blackstone-ui). See [Setup](https://bui.js.org/#/setup) for bundler aliases, styles, and PWA setup.

## A quick look

Elements are plain HTML tags; presenters like dialogs are promises you await.

```js
import { html } from 'lit'
import 'bui/elements/btn'
import Dialog from 'bui/presenters/dialog'

async function remove(){
    if( await Dialog.confirmDelete().modal() )
        // ...
}

html`<b-btn icon="delete" color="red" @click=${remove}>Delete</b-btn>`
```

## Run the demo

The demo is the best way to see how the pieces fit together.

```bash
git clone https://github.com/kjantzer/bui.git
cd bui
npm install
npm start
```

Then open http://localhost:1234

## Status

BUI is developed almost daily by a small team at Blackstone Publishing and runs in production there, so the latest commit should be stable. Breaking changes are noted in the [changelog](./CHANGELOG.md).

The docs can trail the code; when in doubt, the source is the reference. Found a bug? Please open an issue or a PR.
