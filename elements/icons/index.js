const fs = require('fs')
const cheerio = require('cheerio')

let icons = fs.readFileSync(__dirname+'/../icons.svg.html')

const $ = cheerio.load(icons)

let svgs = $('symbol')

svgs.each(function(i){

    let $el = $(this)
    let name = $el.attr('id').replace('icon-', '')

    $el.attr('xmlns', "http://www.w3.org/2000/svg")
    
    let svg = $.html(this)
    svg = svg.replace(/symbol/g, 'svg')

    fs.writeFile(__dirname+`/${name}.svg.html`, svg)

})