![logo](https://i.imgur.com/6QKG2AG.png)

[![demo](https://img.shields.io/badge/-Demo-blue)](http://kjantzer.github.io/bui/)
[![docs](https://img.shields.io/badge/-Documentation-black)](http://kjantzer.github.io/bui/docs/)


Reusable web components for creating interfaces.

***

Example 
```html
<b-tabs>
    <div title="Tab 1">

        <b-paper>
            <b-spinner-overlay></b-spinner-overlay>
            <header>
                <h1>
                    <b-icon name="folder"></b-icon> 
                    Title
                    <b-label>Active</b-label>
                </h1>
                <b-btn icon="upload-cloud" class="text-btn">Upload</b-btn>
            </header>
            <main>
                Content here
                <b-hr></b-hr>
                More content
            </main>
        </b-paper>

    </div>
    <div title="Tab 2">
        Tab 2 content
    </div>

</b-tabs>

```

## Overview

Web components (or custom elements) allow us to encapsalate
logic, designs, and features in html elements. Along with custom
elements, various "presenters" (or views) have been created
for all the ways an app needs to display data

- [Elements](./elements/README.md) - common building-block elements 
- [Util](./util/README.md) - utility methods
- [Router](./router/README.md) - manages the url and triggers views
- [Helpers](./elements/README.md) - helper/extensions
- **Presenters** - ways to present views and data
    - [Dialog](./presenters/dialog/README.md)
    - [Form Control](./presenters/form-control/README.md)
    - [List](./presenters/list/README.md)
    - [Menu](./presenters/menu/README.md)
    - [Panel](./presenters/panel/README.md)
    - [Popover](./presenters/popover/README.md)
    - [Tabs](./presenters/tabs/README.md)

## Developing

[lit-html](https://lit-html.polymer-project.org) and [lit-element](https://lit-element.polymer-project.org)
are being used to create and render custom elements. The beauty in these tools
is that they are simply syntactic sugar for native web technologies

`lit-html` - this is a templating tool that replaces a need for seomthign like mustache.js

`lit-element` - this is a base class for that makes it easier to make custom elements removing
a lot of the boilerplate code usually needed.

## Demo

Install the parcel bundler

```
npm install -g parcel-bundler
```

Then cd to this directory and run:

```
npm start
```

## Notes
- consider switching out `moment.js` for something lighter weight