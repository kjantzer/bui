# Global Search

A modal panel for displaying recently opened records, searching for records, and opening shortcuts to views

## Register

```js
import {register} from 'bui/components/global-search'

register({
    url: '/api/search', // default, change if needed
    searchSets, // see below
    resultRender, // see below
    filters: {
        // optional filters for results list
    }
})

// now go to `/search`
```

## Result Render

Search results should return a `result_type` value. It will be used to determine how to render.

```js
const resultRender = {
    result_type_a: (m, {detail}={})=>html`
        <b-global-search-result-row-template icon="">
            render the result data
        </b-global-search-result-row-template>
    `,

    result_type_b: (m, {detail}={})=>html``
}
```

## Search Sets

Special targeted searches can be enabled with `searchSets`.

```js
const searchSets = {
    '/u ': {label: 'Users', icon: 'person', url: '/api/search/user'},
    '/p ': {label: 'Person', icon: 'person', url: '/api/search/person'},
}
```