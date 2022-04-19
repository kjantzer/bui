/*
    A work-around for parcel-bundler

    In a real app, icons should be imported specifically, not all of them
*/
const fs = require('fs')
const AllIcons = require('@material-icons/svg/data.json')

let IconImports = AllIcons.icons.map(icon=>{
    return `["${icon.name}", require('@material-icons/svg/svg/${icon.name}/baseline.svg'), {className: 'material'}]`
})

fs.writeFileSync(__dirname+'/demo/elements/all-material-icons.js', `module.exports = [\n${IconImports.join(`,\n`)}\n]`)
