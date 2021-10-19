File Explorer
===============

A component for browseing files (ftp, network, etc)

Mimics file explorer (windows) and finder (mac)

```js
import Panel from 'panel'
import FileExplorer from 'bui/components/fileexplorer'

customElements.define('my-file-explorer', class extends FileExplorer{

    static get title(){ return 'File Explorer' }
	static get icon(){ return 'hdd' }
    static get id(){ return 'file-explorer' }
    static get path(){ return 'file-explorer(/*)' }
    
    get root(){ return '/api/ftp' }
    get key(){ return 'file-explorer' }
    get row(){ return 'b-fileexplorer-file' }

    openFile(model){}
}

Panel.register('my-file-explorer', {
    width: '800px',
    height: '96vh',
    anchor: 'center',
})