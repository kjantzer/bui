# Tag List

## Overview

A control for creating tags such as keywords, hashtags, etc. Supports sorting, de-dupeing, and presets. And can also work with form-control and form-handler to auto fill and save from a model.

```html
<b-tag-list value="tag1,tag2" sorted icon="tag"></b-tag-list>
```

## Form Control
The tag list can be used with form-control and form-handler

```html
<form-handler .model=${this.model}>

    <form-control key="tags">
        <b-tag-list sorted icon="tag" control></b-tag-list>
    </form-control>

</form-handler>
```

## Options

### Presets
```html
<b-tag-list .presets=${['Bug', 'Feature', 'Task']}></b-tag-list>
```