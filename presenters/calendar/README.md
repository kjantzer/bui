Calendar
================

A slick, infinite scrolling, calendar view – inspired partially by the MacOS Calendar.app. Uses [lit-virtualizer](https://www.npmjs.com/package/lit-virtualizer) for the scrolling mechanism.

>NOTE: still in the early stages of development and lacks some customization options that may be desired.

```js
import {html} from 'lit'
import 'bui/presenters/calendar'

// will be called when a month is close be being in the viewport
// can return promise
// `date` arg is a day.js object
async function renderMonthContent(date, month, year){
    // if looking at this month
    if( date.isSame(new Date(), 'month')){
        let slot = `${year}-${String(month).padStart(2, '0')}-15`
        return html`
            <div slot="${slot}">Content</div>
        `
    }
}

// then use in lit-html
html`
    <b-calendar .renderMonthContent=${renderMonthContent}></b-calendar>
`
```

## Attributes
- `weekends` - mini, small
- `display` - biweekly, weekly

## Slots

- `before-title`
- `after-title`
- `before-nav`
- `after-nav`

## Events

### `move-to`

If rendered content wants to move slots, this can be called

```js
import 'bui/helpers/lit/emitEvent'

//inside content...
this.emitEvent('move-to', newSlot)
```

## TODO:
More docs needed