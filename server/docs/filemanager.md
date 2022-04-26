# FileManager

More docs needed, especially for how it pairs with API

```js
// example of using FileManager with API
const FileManager = require(bui`server/fileManager`)

// create the default files table before using
// db.query(FileManager.createTableSql())

module.exports = class Attachements extends FileManager {

    static get api(){return {
        root: '/attachments',
        routes: [
            ['get', '/:id?', 'find'],
            ['post', '/', 'upload'],
            ['delete', '/:id?', 'destroy']
        ]
    }}

    get ASSETS_PATH(){ return '/mnt/data' }
    get group(){ return 'attachments' }
    // waitForPreviewGeneration = false
    // skipDuplicates = false
    // previewSize = 800 // set to false to disable preview generation

}
```