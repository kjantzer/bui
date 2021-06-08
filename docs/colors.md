Colors
======

The list of colors is pulled from [material.io](https://material.io/design/color/)

#### Using the colors
```css
@import '~bui/styles/colors.less';

.my-div {
    background: var(--gray-blue-50);
}

button {
    background: var(--theme);
    color: var(--white);
}
```

#### Changing default colors
```css
:root {
    --theme: var(--teal-400);
    --color-secondary: var(--amber);
    --black: #222;
}
```

<!--plain
<b-list-of-colors></b-list-of-colors>
-->