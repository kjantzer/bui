/*
    # isLitHTML

    Determine if a variable is lit-html
    
    ```js
    isLitHTML('some content') // false
    isLitHTML(html`some content`) // true
    ```
*/
export default function isLitHTML(val){ return val && val['_$litType$'] }