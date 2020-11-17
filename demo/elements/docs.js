import docs from '../../elements/README.md'

let elementDocs = {}

export const rawDocs = docs

docs.split(`\n## `).forEach(str=>{
    try{

        let [, name, doc] = str.match(/^`<b-([^>]+)>`(.+)/s)

        elementDocs[name] = doc.trim() // replace(/^\n+/, '')

    }catch(err){}
})

export default elementDocs

let keys = Object.keys(elementDocs)
keys = keys.sort()

export let allDocs = keys.map(key=>{

    return `## \`${key}\`\n${elementDocs[key]}`

}).join(`\n\n`)