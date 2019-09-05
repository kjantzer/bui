Colors
======

The list of colors is pulled from [material.io](https://material.io/design/color/)

#### Using the colors
```css
@import 'node_modules/blackstone-ui/helpers/colors.less';

.my-div {
    background: var(--gray-blue-50);
}

button {
    background: var(--color-primary);
    color: var(--white);
}
```

#### Changing default colors
```css
:root {
    --color-primary: var(--teal-400);
    --color-secondary: var(--amber);
    --black: #222;
}
```

<!--plain
<b-list-of-colors></b-list-of-colors>
-->