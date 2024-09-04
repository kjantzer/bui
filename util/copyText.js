/*
    # copyText [DEPRECATED]

    ```js
    copyText(str)`
    ```

    > DEPRECATED - use `util/clipboard` now (it is widely supported in browsers)
*/
export default str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};