import { Extension } from '@tiptap/core'

export const KeyboardEvents = Extension.create({

	name: 'bui-keyboard-events',

	addKeyboardShortcuts() {
		return {
			'Escape': () => {
				let host = this.editor.view.root.getRootNode().host
				host.dispatchEvent(new Event('esckey'))
			},
			'Shift-Mod-Enter': ()=>{
				let host = this.editor.view.root.getRootNode().host
				host.dispatchEvent(new Event('submit'))
			}
		}
	}

})