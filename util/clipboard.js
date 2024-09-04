/*
    # Clipboard

    Use `util/copyText` if legacy browser support needed

    ```js
    import {clipboardWrite, copyHTML, copyText} from 'bui/util/clipboard'

    clipboardWrite('some text', {type: 'text/plain'})

    // shorthands
    copyHTML(el.innerHTML)
    copyText('some text')
    ```

    > NOTE:  
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