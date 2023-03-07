const fs = require('fs')
const JSZip = require('jszip')
const parseString = require('xml2js').parseStringPromise
const puppeteer = require('puppeteer');
const {minimal_args} = require('../../../puppeteer')

// NOTE: to be called in context of `files/mananger`
module.exports = async function previewEpub(filename){

    let dest = `/tmp/${new Date().getTime()}-${filename}-preview`
    let filepath = this.dirPath+'/'+filename

    // dest = `${ASSETS_PATH}/${new Date().getTime()}-${filename}-preview` // TEMP
    // previewFilePath = ASSETS_PATH+'/'+filename+'.preview.jpg' // TEMP

    let file = fs.readFileSync(filepath)
    let zip = await JSZip.loadAsync(file)
    
    // make output dir
    fs.mkdirSync(dest)

    for( let k in zip.files ){

        let zipEntry = zip.files[k]

        if( zipEntry.name.match('__MACOSX') ) return

        let filePath = zipEntry.name.split('/')
        let fileName = filePath.pop()
        filePath = filePath.join('/')

        let path = dest+'/'+zipEntry.name
        
        if( zipEntry.dir ){
            await fs.mkdirSync(path)
            return
        }

        if( filePath && !fs.existsSync(dest+'/'+filePath) )
            await fs.mkdirSync(dest+'/'+filePath)
        
        let blob = await zipEntry.async('nodebuffer')

        await fs.writeFileSync(path, blob)
    };

    // get contents as json
    let contentsFilePath = dest+'/OEBPS/content.opf'
    let contentsXML = fs.readFileSync(contentsFilePath)
    let contents = await parseString(contentsXML, {trim: true, mergeAttrs: true, explicitArray:false})
    contents = contents.package

    // get TOC as json
    let tocFilePath = dest+'/OEBPS/toc.ncx'
    let tocXML = fs.readFileSync(tocFilePath)
    let toc = await parseString(tocXML, {trim: true, mergeAttrs: true, explicitArray:false})
    toc = toc.ncx
    
    // now create img of cover file for the preview
    let previewPath = dest+'/OEBPS/cover.xhtml'
    let previewFilePath = `/tmp/${new Date().getTime()}-${filename}.preview.jpg`
    
    const browser = await puppeteer.launch({args: minimal_args.concat([
        // '--no-sandbox',
        '--font-render-hinting=none', // https://github.com/puppeteer/puppeteer/issues/2410#issuecomment-560573612
        '--enable-font-antialiasing'
    ])});

    const page = await browser.newPage();

    await page.goto(`file://${previewPath}`);

    await page.screenshot({
        type: 'jpeg',
        path: previewFilePath,
        fullPage: true,
    });

    await browser.close();

    return {contents, toc, previewFilePath}
}