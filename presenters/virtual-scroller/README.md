# Virtual Scroller

Uses [lit-virtualizer](https://github.com/PolymerLabs/uni-virtualizer) to render a virtualized list

```html
<b-virtual-scroller
    row="item-element"
    divider="item-divider-element"
    .items=${arrayOfItems}
></b-virtual-scroller>
```

## Limitations
- no "grid" support (see [#17](https://github.com/PolymerLabs/uni-virtualizer/issues/17))