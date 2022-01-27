/*
    Typography Paste Rules

    help:
    https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/pasteRules/textPasteRule.ts
    https://github.com/ueberdosis/tiptap/discussions/1225
    https://github.com/ProseMirror/prosemirror-inputrules/blob/master/src/rules.js
*/
import { Extension, textPasteRule } from '@tiptap/core'

const emDash = textPasteRule({
  find: /--/g,
  replace: '—',
})

const ellipsis = textPasteRule({
  find: /\.\.\./g,
  replace: '…',
})

const apostrophe = textPasteRule({
  find: /\b'\b/g,
  replace: '’',
})

const openDoubleQuote = textPasteRule({
  find: /(?:^|[\s\{\[\(\<'"\u2018\u201C])(")/g,
  replace: '“',
})

const closeDoubleQuote = textPasteRule({
  find: /(")(?:$|[\s\}\]\)\>'"\u2018\u201C])/g,
  replace: '”',
})

const openSingleQuote = textPasteRule({
  find: /(?:^|[\s\{\[\(\<'"\u2018\u201C])(')/g,
  replace: '‘',
})

const closeSingleQuote = textPasteRule({
  find: /(')(?:$|[\s\}\]\)\>'"\u2018\u201C])/g,
  replace: '’',
})

export const TypographyPaste = Extension.create({

  name: 'typography-paste',

  addPasteRules() {
      return [
          emDash,
          ellipsis,
          apostrophe,
          openDoubleQuote,
          closeDoubleQuote,
          openSingleQuote,
          closeSingleQuote
      ]
  }
})

export default TypographyPaste