# Custom Elements

Although custom elements are globally accessible after initially imported, 
it is best practice to import elements when you need them.

```js
import 'blackstone-ui/elements/btn'
let btn = document.createElement('b-btn')

// or
import Btn from 'blackstone-ui/elements/btn'
let btn = new Btn()
```
***

## `<b-paper>`



## `<b-grid>`
Align children elements in a grid

```html
<b-grid cols="4">
    <b-paper dense colspan>Row 1</b-paper>
    <b-paper dense colspan="2">Row 2</b-paper>
    <b-paper dense>Row 3</b-paper>
    <b-paper dense>Row 4</b-paper>
</b-grid>
```

<!--
<b-grid cols="4">
    <b-paper dense colspan>Row 1</b-paper>
    <b-paper dense colspan="2">Row 2</b-paper>
    <b-paper dense>Row 3</b-paper>
    <b-paper dense>Row 4</b-paper>
</b-grid>
-->

#### Attributes
- `gap` - none, `.5`, `1`, `2`
- `cols`
    - `1`-`8`
    - `2,1` or `1,2` (two-thirds/third)
    - `2,1,1` or `1,1,2` (half/quarter)
- `align` - start, center, end (defaults to stretch)

## `<b-text>`
Effectively a "span" tag with attributes to apply styles

<!--
<div><b-text muted>Muted</b-text>, <b-text muted sm>Muted Small</b-text>, <b-text muted xs>Muted Extra Small</b-text></div>
<div><b-text tone="critical" italic>Critical Italic</b-text>, <b-text tone="warning">Warning text</b-text>, and <b-text tone="info">Info text</b-text></div>
<div>Text with<b-text xs sup muted>Super</b-text> Text with<b-text xs sub muted>sub</b-text></div>
<div style="width:160px"><b-text clip>Text with clipping enabled</b-text></div>
<div><b-text link>Link (hover me)</b-text></div>
<div><b-text ucase>uppercase text</b-text>, <b-text lcase>LOWERCASE text</b-text>, and <b-text capitalize>capitalize text</b-text></div>
-->

#### Attributes
- `xs`, `sm`, `lg`, `xl`, `xxl` - size
- `tone` - critical, warning, info, muted
- `muted` - shorthand for `tone="muted"`
- `bold`, `italic`
- `ucase`, `lcase`, `capitalize`
- `align` - left, center, right, justify
- `link` - changes color on hover
- `clip` - keeps text on one line, clipping with ellipsis
- `sup`, `sub` - super/sub vertical align
- `monospace`
- `block` - change to a block element

## `<b-btn>`

<!--
<b-btn>Default Button</b-btn>
<b-btn color="blue">Blue Button</b-btn>
<b-btn color="red" outline>Outline Button</b-btn>
<b-btn text>Text Button</b-btn>
-->

#### Attributes
- `icon`
- `color`
- `outline`
- `pill`
- `text` - no button outline until hover
- `clear`
- `fab` - floating action button
- `stacked`
- `thin` - reduces top/bottom padding
- `xs`, `sm`, `lg`, `xl`
- `icon-only="mobile"` - label will be hidden on small devices

#### Properties
- `spin` - set to `true` to show a spinner

## `<b-btn-group>`
Visually groups buttons together
```html
<b-btn-group>
    <b-btn>Send</b-btn>
    <b-btn icon="down-open"></b-btn>
</b-btn-group>
```
<!--
<b-btn-group>
    <b-btn>Send</b-btn>
    <b-btn icon="down-open"></b-btn>
</b-btn-group>
-->

## `<b-icon>`

Display an svg icon – [See a full list of icons](../docs/icons.md)

<!--
<b-icon name="user"></b-icon>
<b-icon name="cog"></b-icon>
-->

```html
<b-icon name="user"></b-icon>
<b-icon name="cog"></b-icon>
```

## `<b-file-icon>`
File icon has some default file formats defined, but you will inevitably want to add your own.
To support this, you must deliberately call the "define" function before using the custom element.

```js
import { css } from 'lit'
import defineFileIcon, {fileIconColors} from 'bui/elements/file-icon'

// list of predefined colors
// override them in this object or in the define method
console.log(fileIconColors)

// use default colors
defineFileIcon()

// use defaults with your own colors
defineFileIcon({
    // must be defined with lit-element css
    jpg: css`
        :host([ext="jpg"]),
        :host([ext="jpeg"]) {
            --color: orange;
        }
    `
})
```

```html
<b-file-icon ext="pdf"></b-file-icon>
<b-file-icon ext="doc" style="--size:4em"></b-file-icon>
```
<!--
<b-file-icon ext="pdf"></b-file-icon>
<b-file-icon ext="docx"></b-file-icon>
<b-file-icon ext="xlsx"></b-file-icon>
<b-file-icon ext="psd"></b-file-icon>
<b-file-icon ext="indd"></b-file-icon>
<b-file-icon ext="ai"></b-file-icon>
<b-file-icon ext="mp3"></b-file-icon>
<b-file-icon ext="mp4"></b-file-icon>
<b-file-icon ext="html"></b-file-icon>
<b-file-icon ext="xml"></b-file-icon>
<b-file-icon ext="zip"></b-file-icon>
-->

#### Style hooks
`--b-file-icon-color-default` - when no `ext` color  
`--b-file-icon-bgd-default`  - when no `ext` bgd    
`--b-file-icon-size`  
`--b-file-icon-radius`  

## `<b-hr>`
A line divider

<!--
<b-hr></b-hr>
<br>
Label 1 <b-hr vert></b-hr> Label 2
-->

#### Attributes
- `short` - makes the line short (not full width)
- `vert` - changes to a vertical line

## `<b-sub>` DEPRECATED
>deprecated, use `<b-text sm muted></b-text>` instead

A subdued (or sub text) text element that is slightly smaller and lighter in color

<!--
<b-sub>Subdued text</b-sub>
-->

## `<b-ts>`
Simple element for displaying timestamps. If a string is given, it will be converted to a dayjs date. Or set the dayjs date using `.date=${myDate}`. `dayjs.fromNow()` will be rendered and updated every 1 minute.
```html
<b-ts date="2020-04-23"></b-ts>
<b-ts .date=${myDate}></b-ts>
```
<!--
<b-ts date="2020-04-23"></b-ts>
-->

## `<b-label>`

Default is an uppercase, bold, and slightly subdued (gray) text block for labeling.
Can be altered to display as filled, outlined, or as a badge.

<!--
<b-label>Default Label</b-label>&nbsp;&nbsp;
<b-label filled>Filled Label</b-label>&nbsp;&nbsp;
<b-label outline>Outline Label</b-label>&nbsp;&nbsp;
<b-label badge>Badge Label</b-label>
<br><br>
<b-label divider>Label Divider</b-label>
<br>
<b-label divider="center">Label Divider</b-label>
-->

#### Attributes
- `xs` - xtra small
- `sm` - small
- `lg` - large
- `filled`, `filled="color"`
- `badge`, `badge="color"`
- `outline`, `outline="color"`
- `divider`, `divider="[center,right]"`

#### Style hooks
- `--dividerThickness`

## `<b-ribbon>`
```html
<b-ribbon>Ribbon</b-ribbon>
<b-ribbon pos="right">Ribbon</b-ribbon>
```

**Note:** make sure the correct parent element has a relative type position
<!--
<b-paper style="height: 7em">
    <b-ribbon>Ribbon</b-ribbon>
    <b-ribbon pos="right" style="--color:var(--pink);--height:2em;">Right <b-sub>second line</b-sub></b-ribbon>
</b-paper>
-->

#### Attributes
- `pos` - left/right
- `shadow` - true/false
- `value` - can be used in place of inner html slot

#### Style Hooks
- `--width` 
- `--height` ex: set to `2em` for 2 lines
- `--padding` top/bottom padding
- `--color` background color
- `--shadow` customize shadow attribute
- `--offset` defaults to slight offset to give depth

## `<b-avatar>`
Create scalable avatars with initials or image with from a url or gravatar GUID

```html
<b-avatar initials="KJ" size="40"></b-avatar>
<b-avatar initials="BT" size="40"></b-avatar>
<b-avatar initials="JD" size="40"></b-avatar>
<b-avatar initials="KJ" bgd="#E91E63" size="40"></b-avatar>
<b-avatar gravatar="6bd69795f929a40746cdf026a03b703e" size="40"></b-avatar>
<b-avatar url="https://i.imgur.com/6QKG2AG.png" size="40"></b-avatar>
```

<!--
<b-avatar initials="KJ" size="40"></b-avatar>
<b-avatar initials="BT" size="40"></b-avatar>
<b-avatar initials="JD" size="40"></b-avatar>
<b-avatar initials="KJ" bgd="#E91E63" size="40"></b-avatar>
<b-avatar gravatar="6bd69795f929a40746cdf026a03b703e" size="40"></b-avatar>
<b-avatar url="https://i.imgur.com/6QKG2AG.png" size="40"></b-avatar>
-->

#### Attributes
- `initials` - will display a dash if not set
- `bgd` - defaults to selecting a color keyed from the initials
- `color` - text color, defaults to white
- `size` - default: 24
- `gravatar` - the GUID of a [gravatar](https://en.gravatar.com/) account
- `url` - specify a custom image to use

#### Changing default colors
```js
import {BgdColors} from 'avatar'
BgdColors = [/*...array of colors...*/]
```

## `<b-empty-state overlay lg>`

Use to show a message when a view is empty. **NOTE:** make sure the parent 
element has `position:relative` (or absolute)

<!--
<b-empty-state>Nothing to show</b-empty-state>
-->

#### Attributes
- `xs` - xtra small
- `sm` - small
- `md` - medium
- `lg` - large
- `static` - removes absolute pos and 100% height
- `must-be="first"` or "last" - will not display if not

## `<b-spinner>`

An animated circle spinner to represent progress

<!--
<b-spinner></b-spinner>&nbsp;&nbsp;
<b-spinner style="--size: 2em;"></b-spinner>
-->

#### Style Hooks

- `--size`

## `<b-spinner-overlay>`

Shows an overlay over the parent element with a `b-spinner` and optional label

<!--
<div>
    Some content here
    <b-spinner-overlay show></b-spinner-overlay>
</div>
-->

>**Note:** if the spinner is at the top level of a shadowroot, it will link itself
> to the host element as `host.spinner`

#### Attributes
- `show`
- `label`
- `lg` - make spinner large
- `dark` 

#### Style Hooks
- `--spinnerBgd`
- `--spinnerColor`
- `--spinnerSize`





## `<b-audio>`
Display an audio control bar for playing audio. Provides seeking keyboard 
shortcuts when hovered over the element

<!--
<b-audio src="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4"><b-audio>
-->

```html
<b-audio src="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4"><b-audio>
```

```js
// or via JS
import AudioPlayer from 'elements/audio'
let player = new AudioPlayer('http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4', {autoplay: true})
```

#### Attributes
- `src`
- `autoplay`

> TODO: provide better theming control

## `<b-carousel>`
A slider/carousel element that will show one of the nested elements at time.
A set of dots will be shown to represent the number of slides available.

<!--
<b-carousel>
    <b-paper block>Slide 1</b-paper>
    <b-paper block>Slide 2</b-paper>
    <b-paper block>Slide 3</b-paper>
</b-carousel>
-->

Currently a very simple implementation with no animation or sliding.
Maybe later we'll introduce animation and more features, like nav arrows

##### Styles
- `--dotSize`
- `--dotPadding`
- `--dotMargin`
- `--dotExpand` - transform scale

## `<b-timer>`

Displays a runnning timer

<!--
<b-timer running></b-timer>
<b-timer running short ms style="margin-left: 2em;"></b-timer>
-->

#### Attributes
- `time` - current time in milliseconds
- `ms` - whether to show milliseconds
- `short` -  wont show minutes/hours unless greater than 0
- `running` - should the timer be progressing