/*
    Mentions for Text Editor

	Modeled after the tiptiap "mention" extension

    https://github.com/ueberdosis/tiptap/blob/main/packages/extension-mention/src/mention.ts

	Example:
	import mentionPlugin, {MentionElement} from 'bui/presenters/form/controls/text-editor/mention'

	customElements.define('user-mention', class extends MentionElement {
		static items(query){
			return this.filterItems(query, ['John Doe', 'Jane Dear'])
		}
		// optionally change how the mention is rendered
		// render(){}
	})

	const userMentions = mentionPlugin('user-mention')

	<text-editor .extensions=${userMentions}></text-editor>
*/
import { Node, mergeAttributes } from '@tiptap/core'
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion'
import { LitElement, html, css } from 'lit'
import Menu from 'menu'

export default function mentionPlugin(tagName){
    let mentionTag = customElements.get(tagName)
    if( !mentionTag ) throw new Error(`Mention cannot find '${tagName}'`)
    if( typeof mentionTag.items != 'function' ) throw new Error(`Mention: ${tagName} is missing the '.items(query)' method`)
    
	return Mention.configure({
		tag: tagName,
        suggestion: {
            items: query => mentionTag.items(query) || []
        }
    })
}

export const Mention = Node.create({

  name: 'mention',

  addOptions(){ return {
    
    tag: 'b-mention',

    HTMLAttributes: {},
    
    suggestion: {
        char: '@',
        command: ({ editor, range, props }) => {
            editor
            .chain()
            .focus()
            .insertContentAt(range, [
                {
                    type: 'mention',
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
            return editor.can().insertContentAt(range, { type: 'mention' })
        },
        render: () => {

			let menu
			let popover
			
			return {
				onStart: props => {

					// create a menu to show mention items
					menu = new Menu(props.items, {
						search:false,
						autoSelectFirst: true,
						onSelect(item){
							menu.command({
								uid: item.val,
								uname:item.label,
								type:item.type
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
					menu.close()
					menu = null
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
		uid: {
			default: null,
			parseHTML: element => element.getAttribute('uid'),
			renderHTML: attributes => {
				if( !attributes.uid ){
					return {}
				}

				return {
					'uid': attributes.uid,
				}
			}
		},
		uname: {
			default: null,
			parseHTML: element => element.getAttribute('uname'),
			renderHTML: attributes => {
				if( !attributes.uname ){
					return {}
				}

				return {
					'uname': attributes.uname,
				}
			}
		},
		type: {
			default: null,
			parseHTML: element => element.getAttribute('type'),
			renderHTML: attributes => {
				if( !attributes.type ){
					return {}
				}

				return {
					'type': attributes.type,
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
		`${this.options.suggestion.char}${node.attrs.uname||node.attrs.uid}`,
	]
  },

  renderText({ node }) {
    return `${this.options.suggestion.char}${node.attrs.uname||node.attrs.uid}`
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isMention = false
        const { selection } = state
        const { empty, anchor } = selection

        if (!empty) {
          return false
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isMention = true
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

            return false
          }
        })

        return isMention
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


export class MentionElement extends LitElement {

	static get maxItems(){ return 5 }

	// generic filter funtion
	static filterItems(query, items){
		return items.filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, this.maxItems)
			.map(str=>{return {label: str, val: str}})
	}

	// example code
    static items(query){
		console.warn('Mention: the `.items(query)` method is not implemented; using example')
        return this.filterItems(query, [
			'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet'])
    }

    static get properties(){return {
        uid: {type: String, reflect:true},
		uname: {type: String},
		type: {type: String}
    }}

    static get styles(){return css`
        :host {
            display: inline;
            position:relative;
            color: var(--theme);
            background-color: rgba(var(--theme-rgb), .1);
            border-radius: 0.3rem;
            padding: 0.1rem 0.3rem;
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