Tabs
==============

Toggle between different views with a tab/menu bar. Supports html elements and
lazy-loading of custom elements.

```html
<b-tabs>
    custom-element-1
    custom-element-2
    <section title="View 3">view 3 content</section>
    <b-tabs title="View 4" layout="left">
        <section title="View 4 (A)"></section>
        <section title="View 4 (b)"></section>
    <b-tabs>
</b-tabs>
```

<!--
<b-tabs>
    <section title="View 1">view 1 content</section>
    <section title="View 2">view 2 content</section>
    <section title="View 3">view 3 content</section>
    <b-tabs title="View 4" layout="left">
        <section title="View 4 (A)"></section>
        <section title="View 4 (b)"></section>
    <b-tabs>
</b-tabs>
-->

>NOTE: If you set `.model` on `b-tabs` it will be propagated down
to the views. This will only happen when the sub view is active so it is safe
to take action on the model change.

## Attributes
- `layout` - (top, bottom, left, right) where the menu should be placed
- `key` - used to remember the last active view

## Events
An event will be triggered with the view becomes active/inactive if the view implements
any of the following

- `view.didBecomeActive`
- `view.didBecomeInactive`

- `menu-clicked` - anytime a menu item is clicked (even if already active)
- `active-changed` - the tabs element will also emit a DOM event
    - The event detail will contain a reference to the tab view object: `event.detail.tabView`

>NOTE: `didBecomeActive` only fires after the view has been created and is switching
> from an inactive state. Implement the `connectedCallback` if you need to do something
> on first show

## Style Hooks
- `--menuFontSize`
- `--menuItemPadding`
- `--inactiveColor`
- `--activeColor`
- `--contentPadding`

## Views
The tabs presenter is designed to lazy load custom element views in
order to improve performance. Custom elements need to define a static
`title` to be displayed in the menu.

```javascript
static get title(){ return 'Menu Title' }

// optional, title will be used if not set
static get id(){ return 'menu-title' }

// optional, id will be used if not set
static get path(){ return 'menu-title/'+this.model.id }

// optional, stop display of view for any reason
static get canDisplay(){ return true }
```

Then list the custom elements one per line

```html
<b-tabs>
    custom-element-1
    custom-element-2
</b-tabs>
```

If using a standard html element, a `title` attribute must be defined.
Any elements missing a title will be ignored.

```html
<b-tabs>
    <section title="Menu Title">view content</section>
</b-tabs>
```

#### Properties

- `no-padding` add this class to a view for no padding

## Custom Menu Items
If you need more control over how a menu item is displayed, you can specify
your own with the proper slot. The slot name will be the view's `title`
prefixed with `menu:`

```html
<b-tabs>
    <section title="Menu Title">view content</section>
    <span slot="menu:Menu Title">Menu Title Customized</span>
</b-tabs>
```

## Menu Slots
The tabbar/menu provides slots for rendering content before and after the menu items

```html
<div slot="menu:before">before menu items</div>
<div slot="menu:after">after menu items</div>
```

## No Tab Bar
You can disable a tab bar menu from showing by adding`tab-bar="none"` attribute

```html
<b-tabs tab-bar="none"></b-tabs>
```

## Tab Bar Variations
There are are a few built-in tab bar variations. Once imported, you can use by specifying the `tab-bar` attribute

#### Badges
A simplified tab bar that displays tabs as text buttons with the active one being a colored badge
```js
import 'bui/presenters/tabs/tab-bar/badges'

let view = html`
    <b-list tab-bar="b-tab-bar-badges"></b-list>
`
```

#### Manila
Mimics manila folder tabs (or browser tabs)

```js
import 'bui/tabs/tab-bar/manila'

let view = html`
    <b-list tab-bar="b-tab-bar-manila"></b-list>
`
```

## Custom Tab Bar
You can choose to implement your own tab bar menu by specificying the custom element in
a `tab-bar` attribute. The custom tab bar will have inherit styles to support the 
different layouts

```html
<b-tabs tab-bar="my-custom-tab-bar"></b-tabs>
```

The tab bar will have the following references set:

```js
this.views // class containing the views
this.onMenuClick // the function to call when a menu item is clicked
```

#### Example
```js
customElements.define('my-custom-tab-bar', class extends LitElement{

    static get styles(){return css`
        [active] {
            color: var(--blue);
        }
    `}

    render(){return html`
        ${this.views.map(v=>html`
            ${v.canDisplay?html`
                <div ?active=${v.active} .tabView=${v} @click=${this.onMenuClick}>
                    ${v.title}
                </div>
            `:''}
        `)}
    `}

})
```

Clicked menu items **must** have `.tabView=${view}` set to work

## Slotted Tab Views

```js
customElements.define('my-custom-tab-bar', class extends LitElement{

    render(){return html`
        <b-tabs>
            <div title="Normal view"></div>
            <slot></slot>
        </b-tabs>
    `}

})
```

The following with render three tabs, "Normal view" and "Slotted view", and a lazy-loaded view
```html
<my-custom-tab-bar>
    <div title="Slotted view"></div>
    custom-element-1
</my-custom-tab-bar>
```