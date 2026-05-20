import { html } from 'lit'

// TODO: adjust to support node.js?
export default function addressString(data, {oneline=false, linebreak=`\n`, htmllines=false}={}){
    
    // NOTE: street supports line breaks for some longer international addresses (#6051)
    let addr = ['street', 'street2', 'address', 'address2'].map(k=>data[k]).filter(s=>s).flatMap(s=>s.split('\n'))
    let city = ['city', 'state', 'province', 'zip', 'country'].map(k=>data[k]).filter(s=>s)

    let lines = []

    lines.push(...addr, city.join(' '))
    
    lines = lines.filter(s=>s)

    if( htmllines )
        return lines.map(line=>html`<b-text block>${line}</b-text>`)

    return lines.join(oneline?', ':linebreak)
}