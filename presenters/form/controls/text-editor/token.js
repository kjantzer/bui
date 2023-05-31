/*
    Tokens (mention, hashtag, etc) for Text Editor

	Modeled after the tiptiap "mention" extension

    https://github.com/ueberdosis/tiptap/blob/main/packages/extension-mention/src/mention.ts

	Example:
	import tokenPlugin, {TokenElement} from 'bui/presenters/form/controls/text-editor/token'

	customElements.define('user-token', class extends TokenElement {
		
        static items(query){
			return this.filterItems(query, ['John Doe', 'Jane Dear'])
		}

		// optionally change how the token is rendered
		// render(){}
	})

	const userTokens = tokenPlugin({tag:'user-token'})

	<text-editor .extensions=${[userTokens]}></text-editor>
*/
import { Node, mergeAttributes } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { PluginKey } from 'prosemirror-state'
import { LitElement, html, css } from 'lit'
import Menu from 'menu'
import pick from '../../../../util/pick'

export default function tokenPlugin({
    tag='b-token', 
    key=true, // will use `tag` name
    char='/', 
    allowSpaces=false
}={}){

    let tokenElement = customElements.get(tag)
    if( !tokenElement ) throw new Error(`Token cannot find '${tag}'`)
    if( typeof tokenElement.items != 'function' ) throw new Error(`Token: ${tag} is missing the 'items()' method`)
    
    const name = key===true?tag:key
    const TokensPluginKey = new PluginKey(name)

    if( tokenElement.char ) char = tokenElement.char

    let attrs = Object.keys(tokenElement.properties)
    let addAttributes = {}
    attrs.forEach(attr=>{
        addAttributes[attr] = {
            default: null,
            parseHTML: element => element.getAttribute(attr),
            renderHTML: attributes => {
                if( !attributes[attr] ){
                    return {}
                }

                return {
                    [attr]: attributes[attr],
                }
            }
        }
    })

    return Node.create({

        name,
        group: 'inline',
        inline: true,
        selectable: false,
        atom: true,

        addOptions(){ return {
            
            tag,

            HTMLAttributes: {},
            
            suggestion: {
                char,
                pluginKey: TokensPluginKey,
                allowSpaces,
                command: ({ editor, range, props }) => {
                    editor
                    .chain()
                    .focus()
                    .insertContentAt(range, [
                        {
                            type: name,
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
                    return editor.can().insertContentAt(range, { type: name })
                },
                render: () => {

                    let menu
                    let popover
                    
                    return {
                        onStart: props => {

                            // create a menu to show token items
                            menu = new Menu(props.items, {
                                search:false,
                                autoSelectFirst: true,
                                onSelect(item){

                                    let args = pick(item, attrs)

                                    if( tokenElement.formatArgsForCommand )
                                        args = tokenElement.formatArgsForCommand.call(this, args, item)

                                    menu.command(args)
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
                            popover = menu.popOver(fakeMouseEvent, {
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

        addAttributes(){ return addAttributes },

        parseHTML() {return [
            {tag: this.options.tag}
        ]},

        renderHTML({ node, HTMLAttributes }) {
            let content = tokenElement.renderHTML 
            ? tokenElement.renderHTML?.call(this, {node, HTMLAttributes})
            : `${this.options.suggestion.char}${node.attrs.val}`

            return [
                this.options.tag,
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
                content
            ]
        },

        renderText({ node }) {
            return tokenElement.renderText 
            ? tokenElement.renderText?.call(this, {node})
            : `${this.options.suggestion.char}${node.attrs.val}`
        },

        addKeyboardShortcuts() {return {
            Backspace: () => this.editor.commands.command(({ tr, state }) => {
                let isToken = false
                const { selection } = state
                const { empty, anchor } = selection

                if (!empty)
                    return false

                state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                    if (node.type.name === this.name) {
                        isToken = true
                        tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

                        return false
                    }
                })

                return isToken
            })
        }},

        addProseMirrorPlugins() {return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]},
    }).configure({
		tag: tag,
        suggestion: {
            items: query => tokenElement.items(query) || []
        }
    })

}


export class TokenElement extends LitElement {

	// example code
    static items({query,editor}){
		console.warn('Token: the `.items(query)` method is not implemented; using example')
        return this.filterItems(query, ['Fake', 'Results'])
    }

    static get properties(){return {
        val: {type: String, reflect:true},
    }}

    // static char = '@'
    // static formatArgsForCommand(args, item){}
    // static renderHTML({ node, HTMLAttributes }){ return '' }
    // static renderText({ node }){ return node.attrs.label }

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
            line-height: 1rem;
        }
    `}

    render(){return html`<slot></slot>`}

    // static renderHTML({ node, HTMLAttributes }) {
    //     return `${this.options.suggestion.char}${node.attrs.val}`
    // }

    

    // generic filter function; not required to use
	static filterItems(query, items){
		return items.filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, this.maxItems)
			.map(str=>{return {label: str, val: str}})
	}

    static get maxItems(){ return 5 } // used by generic `filterItems`

}