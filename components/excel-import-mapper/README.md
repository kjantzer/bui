# Excel Import Maper

> More docs needed

TODO:
- consider rename? table- or csv-?
- support serverless mapping if file is csv file?

```js
import ExcelImportMapper from 'bui/components/excel-import-mapper'

customElements.defineShared('custom-excel-importer', class extends ExcelImportMapper {

    constructor(){
        super(...arguments)

        this.url = '/api/excel-import'
        this.pastMappingsUrl = '/api/excel-import/recent-mappings' // optional
        
        // required
        this.allowedHeaders = [
            'isbn',
            'qty',
        ]

        // optional
        this.requiredHeaders = [
            'isbn', // required
            ['isbn', 'qty'] // at least one is required
        ]

        // optional - will help auto-match values to allowed headers
        this.mappingAlternatives = {
            isbn: ['ean', 'isbn_13'],
            qty: ['quantity', 'units',],
        }
    }

    /* 
        Optional override - return false to stop
        Any other value is sent to server as `opts`
    */
    // async confirmImport(btn){
        // default logic confirms with user before submit
    // }

    onImportComplete(resp){
        // test or do more here
        this.close()
    }

    onImportError(err){
        // optional custom processing
        throw err
    }

})

// ....

onUpload(e){
    let uploader = e.currentTarget
    let file = uploader.files[0]
    customElements.get('custom-excel-importer').open(file, uploader)
}
```