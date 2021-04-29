/*
    Based on: https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/pasteRules/markPasteRule.ts
*/
import { Plugin, PluginKey } from "prosemirror-state";
import { Slice, Fragment } from 'prosemirror-model'
import {ellipsis, emDash, apostrophe, smartQuotes} from './paste-rules'

const rules = [
    ellipsis,
    emDash,
    apostrophe,
    ...smartQuotes
];

export const SmartPaste = new Plugin({
    key: new PluginKey('smartPasteRule'),
    props: {
        transformPasted: slice => {
            return new Slice(handler(slice.content), slice.openStart, slice.openEnd)
        },
    },
})

const handler = (fragment) => {
    const nodes = []

    fragment.forEach(child => {
        
      if (child.isText && child.text) {

        rules.forEach(([regex, str])=>{

            let match

            const replaceStr = (text, match)=>{
                let insert = str
                
                // for non-capturing groups
                if( match[1] ){
                    insert = match[0].replace(match[1], str)
                }

                return text.replace(match[0], insert)
            }

            if( regex.global )
                while( match = regex.exec(child.text)){
                    child.text = replaceStr(child.text, match)
                }
            else{
                match = regex.exec(child.text)
                if( match )
                    child.text = replaceStr(child.text, match)
            }
        })
        
        nodes.push(child)

      } else {
        nodes.push(child.copy(handler(child.content, child)))
      }
    })

    return Fragment.fromArray(nodes)
}