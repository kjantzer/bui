Panel Presenter
===================

Presents a view as an overlay panel. Panels can be full size, vary in width/height, and anchor to
different areas on the screen.

## Panel

```javascript
let panel = new Panel(view, options)
panel.open()
```

### Properties / Options

- `title` (will be displayed in `b-panel-toolbar`)
- `width` (string)
- `height` (string)
- `anchor` (top, right, bottom, left, center)
- `type` (modal)
- `animation` (scale [only works on anchor=center])
- `disableBackdropClick`
- `onClose`
- `onBackdropClick`
- `onKeypress` - only fires if panel is on top
- `controller` - specify a different panel controller (optional)

### Rendering a Custom Element

**Immediate initialization**
```javascript
import {Panel} from 'bui'

let panel = new Panel('custom-element', {
    title: 'My Custom Element View',
    width: '600px',
    height: '800px',
    anchor: 'center'
})

panel.open()
```

**Delayed initialization** with a URL route
```javascript
import {Panel, router} from 'bui'

// Panel.register(path, view, options)
Panel.register('my-custom-element', 'custom-element', {
    title: 'My Custom Element View'
})

router.goTo('my-custom-element')
// url will change to `/#/my-custom-element`
```

### Rendering dynamic html

Rendering panels this way probably shouldn't happen very often, but it is supported.

```javascript
import {Panel} from 'bui'
import {html} from 'lit-html'

// with toolbar
new Panel(function(){return html`
    <b-panel-toolbar></b-panel-toolbar>
    <section>	
        <p>Dynamically generated content</p>
    </section>
`, {type:'modal', title: 'Custom Panel'}).open()

// without toolbar and a custom close button
new Panel(function(){return html`
    <section>
        <p>Dynamically generated content</p>
        <b-btn @click=${this.close}>Okay</b-btn
    </section>
`}, {type:'modal'}).open()
```

## Toolbar

A panel only presents the view given to it. If you would like a toolbar with a close button the view
needs to render one. A panel toolbar element has been created for such a task.

```html
<b-panel-toolbar></b-panel-toolbar>
```
>A close button will be rendered and a title will be displayed if the panel has a `title` property set

### Slots

- `left`
- `right`
- `middle` - next to title
- `title` - in place of title
- `close-btn` - use your own close button

```html
<b-panel-toolbar>
    <span slot="middle">I will appear after the title</span>
    <span slot="right">
        <b-btn>Right Button</b-btn>
    </span>
</b-panel-toolbar>
```

### Attributes

- `shadow`
- `overlay`
- `notitle`
