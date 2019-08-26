## Helpers

### LitElement Extensions

We've added some extenions LitElement to fit our needs at Blackstone

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