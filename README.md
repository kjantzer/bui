<img src="./logo.png">

Reusable web components for creating interfaces.

***

Example 
```html
<b-tabs>
    <div title="Tab 1">

        <b-paper>
            <b-spinner-overlay></b-spinner-overlay>
            <header>
                <h1><b-icon name="folder"></b-icon> Title</h1>
                <b-btn icon="upload-cloud" class="text-btn">Upload</b-btn>
            </header>
            <main>
                Content here
            </main>
        </b-paper>

    </div>
    <div title="Tab 2">
        Tab 2 content
    </div>

</b-tabs>

```

# Overview

Web components (or custom elements) allow us to encapsalate
logic, designs, and features in html elements.

For example, a simple icon can be rendered with

```html
<b-icon name="user"></b-icon>
````

Or a much more complex element like a date picker

```html
<date-picker></date-picker>
````

>NOTE: custom elements must have a dash in their name which is why all the elements start with `b-`

# Custom Elements

### Check out the [list of elements here](./elements/README.md)

## Developing custom elements

[lit-html](https://lit-html.polymer-project.org) and [lit-element](https://lit-element.polymer-project.org)
are being used to create and render custom elements. The beauty in these tools
is that they are simply syntactic sugar for native web technologies

### `lit-html`

[read about it](https://lit-element.polymer-project.org/guide)

This is a templating tool and can be used anywhere, including Backbone.Views.
It's fast and is going to be replacing our use of `_.template`

### `lit-element`

[read about it](https://lit-html.polymer-project.org/guide)

This is a base class for that makes it easier to make custom elements removing
a lot of the boilerplate code usually needed.

# Presenters

Classes used to present views (ideally a custom element) to the user. 

- [Panel](./presenters/panel/README.md)
- [Tabs](./presenters/tabs/README.md)
- [List](./presenters/list/README.md)
- [Popover](./presenters/popover/README.md)
- [Menu](./presenters/menu/README.md)
- [Dialog](./presenters/dialog/README.md)

# Router

A class for managing the URL and routing to views. Router is a singleton class

Routes can be added manually, but should generally be used by core UI components
such as Panel. Panels leverage the router with a `.register()` method

```javascript
Panel.register('url-path', 'view-name', opts={})
```

# Helpers

### LitElement Extensions

We've added some extenions LitElement to fit our needs.

[read more](./helpers/lit-element/README.md)


### Backbone.js Integration

We are still using Backbone models and collections for data management (for now at least)
and Backbone views are still used as top level entry points for UI.

`Backbone.View` will render the contents of the `html()` method:

```javascript
import {html} from 'lit-html'
class MyView extends Backbone.View {
    html(){return html`
        create your html view here
    `}
}
```

# Demo

Install the parcel bundler

```
npm install -g parcel-bundler
```

Then cd to this directory and run:

```
npm start
```
