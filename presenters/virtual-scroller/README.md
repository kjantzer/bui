Virtual Scroller
==================

Uses [lit-virtualizer](https://github.com/PolymerLabs/uni-virtualizer) to render a virtualized list

```html
<b-virtual-scroller
    row="c-order-assembly-item"
    divider="c-order-assembly-divider"
    .items=${items}
></b-virtual-scroller>
```

## Limitations
- no "grid" support (see [#17](https://github.com/PolymerLabs/uni-virtualizer/issues/17))