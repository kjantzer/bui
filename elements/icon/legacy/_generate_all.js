const fs = require('fs')
const cheerio = require('cheerio')

let files = fs.readdirSync(__dirname)

let imports = []

files.forEach(file=>{

    if( !file.match(/\.svg\.html$/) ) return

    let icon = fs.readFileSync(__dirname+'/'+file, 'utf-8')

    const $ = cheerio.load(icon)
    let $el = $('svg')
    let name = $el.attr('id').replace('icon-', '')

    imports.push(`['${name}', require('./${file}')]`)
})

fs.writeFileSync(__dirname+'/_all.js', `
import {IconElement} from '../index'

IconElement.register(
    ${imports.join(`,\n\t`)}
)
`)