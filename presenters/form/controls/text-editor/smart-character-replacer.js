import { Extension } from '@tiptap/core'
import { ellipsis, emDash, smartQuotes} from 'prosemirror-inputrules'
import { SmartPaste } from './smart-paste'

export const SmartCharacterReplacer = Extension.create({
  
    name: 'smartCharacters',

    addInputRules() {return [
        ellipsis,
        emDash,
        ...smartQuotes,

    ]},

    addPasteRules() {return [
        SmartPaste
    ]}


})