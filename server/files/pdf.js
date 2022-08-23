const {round} = require(bui`util/math`)
const shellExec = require(bui`util/shellExec`)

async function pdfInfo(filepath, {withText=false}={}){

    let infoStr = await shellExec('pdfinfo', `"${filepath}"`)

    let lines = infoStr.trim().split(`\n`)

    let info = {
        pages: 0,
        width: 0,
        height: 0
    }

    lines.forEach(line=>{
        let [key, val] = line.split(':')
        info[key.trim().toLowerCase()] = (val||'').trim()
    })

    if( info['page size'] ){
        try{
            let [, w, h] = info['page size'].match(/^(\d+\.?\d+?) x (\d+\.?\d+?) pts/)
            if( w ){
                info.width = round(w / 72)
                info.height = round(h / 72)
                info.page_width = parseFloat(w)
                info.page_height = parseFloat(h)
            }
        }catch(err){}
    }

    if( info.pages )
        info.pages = parseInt(info.pages)

    if( withText ){
        try{
            let text = await pdfText(filepath, withText)
            info.text = text
        }catch(err){}
    }

    return info
}

async function pdfText(filepath){
    return await shellExec('pdftotext', [
        '-raw', // keep content in raw data feed order
        '-layout',
        // `-f ${page}`, // first
        // `-l ${page}`, // and last page
        '-q', // dont print errors
        `"${filepath}"`,
        '-' // print to stdout
    ])
}

module.exports = {pdfInfo, pdfText}