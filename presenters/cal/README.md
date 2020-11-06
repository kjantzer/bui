Calendar
==========

```js
import 'bui/presenters/cal'
```

```html
<b-cal>
    <div slot="2020-04-07">
        Something for this day
    </div>
</b-cal>
```
<!--
<b-cal date="2020-04-1" style="min-height:740px">
    <div slot="2020-04-07">
        Something for this day
    </div>
</b-cal>
-->

## Properties
- `date` - accepts a string, dayjss date, or object (ex: {month:3})

## Methods
- `nextMonth()`
- `prevMonth()`
- `goToToday()`

## Events

- `date-changed` - `event.detail` will be the date range

## Slots

- `after-title`
- `before-nav`
- `after-nav`