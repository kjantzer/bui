import Previewer from '../../presenters/previewer'
import Dialog from '../../presenters/dialog'
import download from '../../util/download'
import Palette from './palette'

export const FileRowMixin = (Base)=>class extends Base{

    preview(){
        Previewer.open(this.model)
    }

    download(){
        if( this.willTakeAction('download').notAllowed ) return
        download(this.model.downloadURL)
    }

    async destroy(e){
        
        if( this.willTakeAction('delete', {clickTarget: e?.currentTarget}).notAllowed ) return

        if( await Dialog.confirmDelete().popOver(e) ){
            await this.model.destroySync({wait: true})
            this.remove()
        }
    }

    viewPalette(e){
        Palette.open(this.model.traits.palette, e.currentTarget||e)
    }

    onDragStart(e){
        if( this.willTakeAction('download', {drag: true}).notAllowed ) return
        this.classList.add('dragging')
        enableDragAndDropDownload(e.dataTransfer, this.model)   
    }

    onDragEnd(e){
        this.classList.remove('dragging')
    }
}

export default FileRowMixin

// https://web.dev/datatransfer/
// drag and drop outside of the browser!
export function enableDragAndDropDownload(dataTransfer, model){
    
    let filename = model.get('orig_filename')
    let host = location.protocol+'//'+location.host
    let url = host+model.downloadURL

    dataTransfer.setData('DownloadURL', [
        `application/octet-stream:${filename}:${url}`
    ]);

    dataTransfer.setData('text/plain', host+model.displayURL);

    // Navigates to the URL when dropping on the URL bar or browser page
    dataTransfer.setData('text/uri-list', host+model.displayURL);

    // https://schema.org/ImageObject
    // NOTE: this needs improved, file may not be an image
    const data = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        thumbnail: host+model.previewURL,
        contentUrl: url,
        // datePublished: '2010-08-08',
        description: model.get('description'),
        name: filename,
        height: model.height,
        width: model.width
    };

    dataTransfer.setData('application/ld+json', JSON.stringify(data));
}

