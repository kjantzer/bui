/*
    # Download To File System

    A UI for `util/downloadToFileSystem`

    ```js
    import downloadToFileSystem from 'bui/elements/download-to-file-system'

    downloadToFileSystem(files)
    ```
*/
import { LitElement, html, css } from 'lit'
import Dialog from '../presenters/dialog'
import CollMap from '../util/collmap'
import downloadToFileSystem from '../util/downloadToFileSystem'

customElements.define('b-download-to-file-system', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            margin: calc(-1 * var(--pad));
            margin-bottom: 0;
        }

        b-table {
            border-radius: 0 var(--radius) 0 0;
            max-height: 215px;
        }

        b-table-row[slot="header"] {
            background: var(--theme-bgd);
        }
    `

    static download(files){
        let el = document.createElement('b-download-to-file-system')
        return el.download(files)
    }

    download(files, {dirName, startIn='downloads'}={}){

        this.files = new CollMap()

        // create a list of files we can use to render a table/list
        files.forEach(file=>{

            let data = {}

            // list of urls
            if( typeof file == 'string' ){
                data.id = file
                data.label = file
            // backbone model?
            }else if( file.get ){
                data.id = file.id
                data.label = file.origFilenameLabel || file.get('orig_filename') || file.get('filename') || file.get('label')
            }// TODO: support generic object?

            this.files.set(data.id, data)
        })
        
        let dialog = new Dialog({
            icon: 'download',
            view: this,
            color: 'inverse',
            btns: [{label: 'Cancel Download', color:'red', muted:true, doesCancel: true}]
        })

        this.index = 0
        this.abortController = new AbortController()

        // begin downloading the files
        downloadToFileSystem(files, {
            startIn, 
            signal: this.abortController.signal,
            dirName,
            progress: (action, data)=>{

                // wait for user to select a directory before showing UI
                if( action == 'directory-picked' ){
                    return dialog
                        .notif({anchor: 'top-right', autoClose: false, closeOnClick: false})
                        .then(r=>{
                            // cancel button used or dialog closed (either way ok to abort)
                            this.abortController.abort()
                        })
                }

                // file download progress
                if( action == 'progress'){
                    this.index = data.index

                    let file = this.files.get(data.file.id)
                    
                    if( file ){
                        file.progress = data.progress
                        file.size = data.size
                        file.totalSize = data.totalSize

                        this.requestUpdate()
                    }
                }

                // if( data.progress > 40 )
                //     data.abortController.abort()
            }
        }).then(r=>{
            dialog.close()
        })
    }

    render(){return html`
        <b-table>
            <b-table-row slot="header">
                <b-flex w="1fr">
                    <b-text bold>Downloading Files</b-text>
                    <b-text>${this.index+1} of ${this.files.size}</b-text>
                </b-flex>
                <b-text w="80px">%</b-text>
            </b-table-row>
            ${this.files.map(file=>html`
            <b-table-row>
                    <b-text>${file.label}</b-text>
                    <b-text>${file.progress||0}%</b-text>
                </b-table-row>
            `)}
        </b-table>
    `}

})

export default function(files){
    return document.createElement('b-download-to-file-system').download(...arguments)
}