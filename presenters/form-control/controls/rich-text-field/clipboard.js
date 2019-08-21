import Quill from 'quill/core'
import Clipboard from 'quill/modules/clipboard';
import {htmlCleaner} from 'util'
import autoFormat from '../../../../util/autoFormat'

const Delta = Quill.import('delta')

// helpful: https://github.com/quilljs/quill/issues/1184#issuecomment-403657128
class BUIClipboard extends Clipboard {
    onPaste (e) {
        e.preventDefault()
        const dirtyHtml = e.clipboardData.getData('text/html')
        this.insertHTML(dirtyHtml, true)
    }

    insertHTML(html, clean=true){
        const range = this.quill.getSelection()
        
        html = htmlCleaner.clean(html)
        html = autoFormat(html)

        // delete any contents the user has selected
        const delta = new Delta()
            .retain(range.index)
            .delete(range.length)

        this.quill.updateContents(delta, 'silent')
        this.quill.setSelection(range.index, 0, 'silent')

        // paste the cleaned html
        this.dangerouslyPasteHTML(range.index, html, 'user')
    }
}

Quill.register({
    'modules/clipboard': BUIClipboard
})