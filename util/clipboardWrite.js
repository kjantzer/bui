/*
    # Clipboard Write

    Requires (ClipboardItem)[https://caniuse.com/?search=ClipboardItem]. Else, use `copyText` instead

    ```js
    import {clipboardWrite, copyHTML, copyText} from 'bui/util/clipboardWrite'

    clipboardWrite('some text', {type: 'text/plain'})
    copyHTML(el.innerHTML)
    copyText('some text')
    ```

    > NOTES:  
    > - could probably use some checks before attempting to copy
    > - maybe fallback to doc.exec?
*/
export default function clipboardWrite(str, {
    type='text/plain'
}={}){
    var blob = new Blob([str], { type });
    var data = [new ClipboardItem({ [type]: blob })];
    return navigator.clipboard.write(data)
}

export function copyHTML(str){
    return clipboardWrite(str, {type: 'text/html'})
}

export function copyText(str){
    return clipboardWrite(str, {type: 'text/plain'})
}