/*
    Hashtags for Text Editor

	Modeled after the tiptiap "mention" extension

    https://github.com/ueberdosis/tiptap/blob/main/packages/extension-mention/src/mention.ts

	Example:
	import hashtagPlugin, {HashtagElement} from 'bui/presenters/form/controls/text-editor/hashtag'

	customElements.define('user-hashtag', class extends HashtagElement {
		static items(query){
			return this.filterItems(query, ['John Doe', 'Jane Dear'])
		}
		// optionally change how the hashtag is rendered
		// render(){}
	})

	const userHashtags = hashtagPlugin('user-hashtag')

	<text-editor .extensions=${userHashtags}></text-editor>

  NOTE: this largely duplicates mention.js
  - consider creating a base class and extend both 
*/
import { Node, mergeAttributes } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { PluginKey } from 'prosemirror-state'
import { LitElement, html, css } from 'lit'
import Menu from 'menu'

export default function hashtagPlugin(tagName){
    let hashtagTag = customElements.get(tagName)
    if( !hashtagTag ) throw new Error(`Hashtag cannot find '${tagName}'`)
    if( typeof hashtagTag.items != 'function' ) throw new Error(`Hashtag: ${tagName} is missing the '.items(query)' method`)
    
	return Hashtag.configure({
		tag: tagName,
        suggestion: {
            items: query => hashtagTag.items(query) || []
        }
    })
}

export const HashtagsPluginKey = new PluginKey('hashtags')

export const Hashtag = Node.create({

  name: 'hashtag',

  addOptions(){ return {
    
    tag: 'b-hashtag',

    HTMLAttributes: {},
    
    suggestion: {
		pluginKey: HashtagsPluginKey,
		// allowSpaces: true,
        char: '#',
        command: ({ editor, range, props }) => {
            editor
            .chain()
            .focus()
            .insertContentAt(range, [
                {
                    type: 'hashtag',
                    attrs: props,
                },
                {
                    type: 'text',
                    text: ' ',
                },
            ])
            .run()
        },
        allow: ({ editor, range }) => {
            return editor.can().insertContentAt(range, { type: 'hashtag' })
        },
        render: () => {

			let menu
			let popover
			
			return {
				onStart: props => {

					// create a menu to show hashtag items
					menu = new Menu(props.items, {
						search:false,
						autoSelectFirst: true,
						onSelect(item){
							menu.command({
								tag: item.val
							})
						}
					})

					menu.command = props.command

					// find target at caret position
					let target = props.editor.view.docView.domAfterPos(props.range.from)

					// create a fake mouse event with same coord as target
					// (popover doesn't like binding to the invisible target above so this is a workaround)
					let rect = target.getBoundingClientRect()
					let fakeMouseEvent = new MouseEvent('click', {
						clientX:rect.left+rect.width,
						clientY: rect.top+rect.height
					})

					// show menu (disabling the default keyevents...see below)
					popover = menu.popover(fakeMouseEvent, {
						onKeyDown:(e)=>{}
					})

				},
				onUpdate(props) {
					if( menu ){
						menu.updateMenu(props.items)
						menu.command = props.command
					}
				},
				onKeyDown(props) {
					// only foward a few keystrokes to the menu
					if( menu && ['ArrowDown', 'ArrowUp'].includes(props.event.key) )
						menu.onKeydown(props.event)	
				},
				onExit() {
					if( menu ){
						menu.close()
						menu = null
					}
				}
			}
		},
    },
  }},

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
		tag: {
			default: null,
			parseHTML: element => element.getAttribute('tag'),
			renderHTML: attributes => {
				if( !attributes.tag ){
					return {}
				}

				return {
					'tag': attributes.tag,
				}
			}
		},
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.tag,
      }
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
	return [
		this.options.tag,
		mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		`${this.options.suggestion.char}${node.attrs.tag}`,
	]
  },

  renderText({ node }) {
    return `${this.options.suggestion.char}${node.attrs.tag}`
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isHashtag = false
        const { selection } = state
        const { empty, anchor } = selection

        if (!empty) {
          return false
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isHashtag = true
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

            return false
          }
        })

        return isHashtag
      }),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})


export class HashtagElement extends LitElement {

	static get maxItems(){ return 5 }

	// generic filter funtion
	static filterItems(query, items){
		return items.filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, this.maxItems)
			.map(str=>{return {label: str, val: str}})
	}

	// example code
    static items(query){
		console.warn('Hashtag: the `.items(query)` method is not implemented; using example')
        return this.filterItems(query, [
			'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet'])
    }

    static get properties(){return {
        tag: {type: String, reflect:true},
    }}

    static get styles(){return css`
        :host {
            display: inline-flex;
            position:relative;
            color: var(--theme);
            background-color: rgba(var(--theme-rgb), .1);
            border-radius: .3rem;
            padding: .1rem 0.2rem;
            position: relation;
			white-space: normal;
        }
    `}

	constructor(){
		super()
		this.addEventListener('click', this.onClick)
	}

    render(){return html`<slot></slot>`}

	onClick(){}

}