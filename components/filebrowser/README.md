File Browser
===============

A component for browsing files (ftp, network, etc).

Mimics file explorer (windows) and finder (mac)

## Example Use
```js
import Panel from 'panel'
import FileBrowser from 'bui/components/filebrowser'

customElements.define('my-file-browser', class extends FileBrowser{

    static get title(){ return 'File Browser' }
	static get icon(){ return 'hdd' }
    static get id(){ return 'file-browser' }
    static get path(){ return 'file-browser(/*)' }
    
    get root(){ return '/api/ftp' }
    get key(){ return 'file-browser' }
    get row(){ return 'b-filebrowser-file' }
    get filters(){ return {} } // b-list filters

    openFile(model){}
})

Panel.register('my-file-browser', {
    width: '800px',
    height: '96vh',
    anchor: 'center',
})
```