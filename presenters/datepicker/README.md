Date Picker
===============

> WIP - docs coming soon

```js
import Datepicker from 'bui/presenters/datepicker'
import Popover from 'bui/presenters/popover'

new Popover(target, new Datepicker({
    range: true, // defaults to selecting start/end dates
    value: new Date(), // defaults to today
    min: '1975-01-01', // default
    max: '2099-12-31', // default
    presets: [], // empty array means use all default presets
}))
```

## Parts
- `header`
- `input`
- `months-header`
- `months`
- `presets

## Styles
- `--pad` - padding around each secion (header, months)
- `--gap` - gap between days
- `--size` - size of each day
- `--font-size` - for months