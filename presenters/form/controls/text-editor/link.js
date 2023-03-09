/*
    NOTE: we are rolling a custom "link" extension so we can make "click to open" 
    only work if ctrl/cmd is also being held

    Existing extension has no support for this built in
*/
import Link from '@tiptap/extension-link'

// https://github.com/ueberdosis/tiptap/blob/develop/packages/extension-link/src/link.ts
export default Link.extend({
  
    addProseMirrorPlugins() {

        // continue supporting the existing plugins
        let plugins = Link.config.addProseMirrorPlugins.call(this)

        // add our own custom "click to open" plugin
        plugins.push(
            clickHandler({
                type: this.type
            })
        )

        return plugins
    }
  
})

import { getAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

// https://github.com/ueberdosis/tiptap/blob/develop/packages/extension-link/src/helpers/clickHandler.ts#L9
// this plugin mostly same as ^
function clickHandler(options){
return new Plugin({
    key: new PluginKey('handleClickLink'), // NOTE this is named same as default, I think that's ok?
    props: {
      handleClick: (view, pos, event) => {
        
        // skip non-primary button
        if (event.button !== 0) {
          return false
        }

        // require ctrl/cmd key to be held
        if( !event.metaKey && !event.ctrlKey ) return false

        const attrs = getAttributes(view.state, options.type.name)
        const link = event.target?.closest('a')

        const href = link?.href ?? attrs.href
        const target = link?.target ?? attrs.target

        if (link && href) {
          window.open(href, target)

          return true
        }

        return false
      }
    }
  })
}
