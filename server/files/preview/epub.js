const fs = require('fs').promises
const JSZip = require('jszip')
const parseString = require('xml2js').parseStringPromise

// NOTE: to be called in context of `files/mananger`
module.exports = async function previewEpub(filePath){

    // Read the EPUB file into a buffer and read zip contents
    // TODO: maybe shouldn't read into memory? write to /tmp instead?
    const epubBuffer = await fs.readFile(filePath);
    const zip = await JSZip.loadAsync(epubBuffer);

    let content = await contentJSON(zip)
    let toc = await tocJSON(zip)
    let coverFile = null

    if( content ) {
        let cover = content.manifest.find(d=>d.id=='cover-image'||d.properties=='cover-image')
        coverFile = cover ? (zip.files['OPS/'+cover.href] || zip.files['OEBPS/'+cover.href]) : null
    }

    return {content, toc, coverFile}
}


async function contentJSON(zip){

    const file = zip.files['OPS/package.opf'] || zip.files['OEBPS/content.opf']

    if( !file )
        return null

    const fileContent = await file.async('string')

    let data = await parseString(fileContent, {trim: true, explicitArray:false})

    // simplify the data structure
    data = data.package
    data.manifest = data.manifest.item.map(d=>d.$)

    if( data.spine.itemref )
        data.spine.itemref = data.spine.itemref.map(d=>d.$.idref)

    return data
}

async function tocJSON(zip){
    
    let file = zip.files['OEBPS/toc.ncx'] || zip.files['OPS/toc.ncx'] // epub 2 or 3

    if( !file ) return null

    let fileContent = await file.async('string')
    let data = await parseString(fileContent, {trim: true, mergeAttrs: true, explicitArray:false})
    data = data.ncx

    return data
}