// https://codepen.io/mackermedia/pen/gmNwZP

import Quill from 'quill/core'
import Break from 'quill/blots/break'
import Embed from 'quill/blots/embed'

const Delta = Quill.import('delta')

class SmartBreak extends Break {
    length () {
        return 1
    }
    value () {
        return '\n'
    }

    insertInto(parent, ref) {
        Embed.prototype.insertInto.call(this, parent, ref)
    }
}

SmartBreak.blotName = 'break';
SmartBreak.tagName = 'BR'

Quill.register(SmartBreak, true)

export function lineBreakMatcher() {
  var newDelta = new Delta();
  newDelta.insert({'break': ''});
  return newDelta;
}

export const keyboardLinebreak = {
    key: 13,
    shiftKey: true,
    handler: function (range) {

        let currentLeaf = this.quill.getLeaf(range.index)[0]
        let nextLeaf = this.quill.getLeaf(range.index + 1)[0]

        this.quill.insertEmbed(range.index, 'break', true, 'user');

        // Insert a second break if:
        // At the end of the editor, OR next leaf has a different parent (<p>)
        if (nextLeaf === null || (currentLeaf.parent !== nextLeaf.parent)) {
            this.quill.insertEmbed(range.index, 'break', true, 'user');
        }

        // Now that we've inserted a line break, move the cursor forward
        this.quill.setSelection(range.index + 1, 'use'); // Quill.sources.SILENT
    }
}
