/*
    HTML Cleaner

    Takes a string of html and removes non-standard
    html, removes inline styles and classes, and removes
    any new lines. The end result is a much cleaner
    underlying html structure.

    ```
    import {htmlCleaner} from 'util/html-cleander'
    let html = htmlCleaner.clean(strOfHtml)
    ```

    You can override the parser if you need (for example, in node.js)
    
    ```
    htmlCleaner.parser = function(str){ return [document, body] }
    ```
*/

const DEFAULT_ALLOW_TAGS = ['p', 'br', 'b', 'strong', 'em', 'i', 'ul', 'ol', 'li']

// TODO: move to param
const DEFAULT_ALLOW_STYLES = {
    fontStyle: ['italic'],
    fontWeight: ['bold'],
    textAlign: ['left', 'justify', 'right', 'center']
}

function parser(str){
    if( typeof DOMParser === 'undefined' )
        throw Error('DOMParser does not exist')
        
    var dom = new DOMParser().parseFromString(str, "text/html");
    return [typeof document !== 'undefined' ? document : dom, dom.body||dom]
}

function stripHTML(str){
    var [document, body] = this.parser(str)
    let childNodes = Array.from(body.childNodes)
    return childNodes.map(node=>node.textContent).join(' ')
}

function clean(str, opts={}){

    opts = Object.assign({
        keepParent:true,
        allowTags: DEFAULT_ALLOW_TAGS,
        allowStyles: DEFAULT_ALLOW_STYLES
    }, opts)
    
    var [document, body] = this.parser(str)
    var el = document.createElement('div')
    var p = null

    let childNodes = Array.from(body.childNodes)

    // if there is only one child node and its a paragraph, lets loop 
    // through its child nodes (we'll recreate the <p> tag down below)
    // we do this because I've seen copy that has fake paragraphs 
    // using br tags inside a paragraph: <p>para 1<br><br>para 2</p>
    if( childNodes.length == 1 && childNodes[0].tagName == 'P' )
        childNodes = Array.from(childNodes[0].childNodes)

    childNodes.forEach(node=>{

        // top level <br> tags terminate the current <p>
        if( node.nodeName == 'BR' )
            return p = null

        // if we have a top level <p>, lets keep it
        if( childNodes.length == 1 && node.nodeName == 'P' ){
            p = node

            // clean all its children
            cleanNode(null, p, opts)

            // if NOT empty after cleaning, keep it
            if( p.innerText !== '')
                el.appendChild(p)

            return
        
        // all other tags
        }else{

            // create a top level <p> if we dont have one
            if( !p ){
                p = document.createElement('p')
                el.appendChild(p)
            }
        
            // cleaning will append to `p`
            cleanNode(p, node, opts)
        }
    })

    if( opts.keepParent === 'never' )
        el = el.childNodes[0] || el
    if( opts.keepParent === false && el.childNodes[0].childNodes.length > 1 )
        el = el.childNodes[0] || el

    let html = el.innerHTML ? el.innerHTML : Array.from(el.childNodes).map(node=>node.toString()).join('')

    // remove line breaks as they dont provide anything and can cause problems in csv exports
    html = html.replace(/[\n\r]/g, ' ')
    // replace non-breaking spaces with normal spaces
    html = html.replace(/&nbsp;/g, ' ')

    return html
}

function cleanNode(parent, node, opts={}){

    opts.allowTags = opts.allowTags != undefined ? opts.allowTags : DEFAULT_ALLOW_TAGS
    opts.allowStyles = opts.allowStyles != undefined ? opts.allowStyles : DEFAULT_ALLOW_STYLES

    // remove all attributes known to be a problem
    if( node.removeAttribute ){
        
        let styles = Object.assign({}, node.style)
        
        node.removeAttribute('id')
        node.removeAttribute('class')
        node.removeAttribute('style')

        for( let styleName in opts.allowStyles ){
            let allow = opts.allowStyles[styleName]

            if( allow === true && styles[styleName] ){
                node.style[styleName] = styles[styleName]
            }else{

                allow = Array.isArray(allow) ? allow : [allow]

                if( allow.includes(styles[styleName]) ){
                    node.style[styleName] = styles[styleName]
                }
            }
        }
    }

    // if the node is a comment or a known weird tag (word docs have things like <o:p>) remove it
    if( node.nodeName == '#comment' || node.nodeName.match(/:/) )
        return node.remove()

    // if text node, do some cleaning
    else if( node.nodeName == "#text" ){

        // if the text node is just spaces, remove them
        // node.textContent = node.textContent.replace(/^\s+$/g, '')

        // swap multiple spaces in a row for just one space
        node.textContent = node.textContent.replace(/\s{2,}/g, ' ')

        // optionally clean more data for platforms that need it
        // TEST
        // simplifyTextNode(node)
    }

    // clean all child nodes of this node
    let childNodes = node.childNodes ? Array.from(node.childNodes) : []
    childNodes.forEach(n=>cleanNode(node, n, opts))

    // remove any empty nodes (but keep <br> which are always empty)
    if( node.nodeName != 'BR' && node.innerText == '' )
        return node.remove()

    // if( parent && parent.tagName == 'P' ){
    if( parent ){

        // keep spans that have styles since they will be bold/italics
        if( node.nodeName == 'SPAN' && node.hasAttribute('style') ){
            parent.appendChild(node)

        // keep tags we want
        }else if( (['#text'].concat(opts.allowTags)).includes(node.nodeName.toLowerCase()) ){
            // make sure inline elements dont start with a <br> tag ie <br><i><br> as this will parse to <p><i><br> and break Quill
            if( ['i', 'b', 'strong', 'em'].includes(node.nodeName.toLowerCase()) ){
                if( node.childNodes[0] && node.childNodes[0].nodeName == 'BR' )
                    node.childNodes[0].remove()
            }
            // if( parent.tagName == 'P' )
            parent.appendChild(node)

        // remove tags we dont want, but keep their contents
        // example: <font>we want to keep this text and any <b>good</b> tags</font>
        }else{

            if( node.remove )
                node.remove()
            else
                node.parentNode.removeChild(node) // node.js xmldom

            childNodes = Array.from(node.childNodes)
            childNodes.forEach(child=>{
                parent.appendChild(child)
            })
        }
    }

    return node
}


function simplifyTextNode(node){
    // replace fancy quotes with simple ones
    node.textContent = node.textContent.replace(/[“”]/g, '"')
    node.textContent = node.textContent.replace(/[‘’]/g, "'")

    // replace mdash and ndash with regular dashes
    node.textContent = node.textContent.replace(/[–—]/g, "-")

    // replace ellipsis
    node.textContent = node.textContent.replace(/…/g, "...")
}


module.exports = {
    clean: clean,
    stripHTML: stripHTML,
    parser: parser
}