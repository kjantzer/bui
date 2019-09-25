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

function parser(str){
    if( typeof DOMParser === 'undefined' )
        throw Error('DOMParser does not exist')
        
    var dom = new DOMParser().parseFromString(str, "text/html");
    return [document, dom.body]
}

function clean(str){

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
        if( node.nodeName == 'P' ){
            p = node

            // clean all its children
            cleanNode(null, p)

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
            cleanNode(p, node)
        }
    })

    let html = el.innerHTML

    // remove line breaks as they dont provide anything and can cause problems in csv exports
    html = html.replace(/[\n\r]/g, ' ')

    return html
}

function cleanNode(parent, node){

    // remove all attributes known to be a problem
    if( node.removeAttribute ){
        
        let isItalic = node.style.fontStyle == 'italic'
        let isBold = node.style.fontWeight == 'bold'
        
        node.removeAttribute('id')
        node.removeAttribute('class')
        node.removeAttribute('style')

        // reapply certain styles // TODO: add option for whether we do this?
        if( isItalic && !['I', 'EM'].includes(node.nodeName) )
            node.style.fontStyle = 'italic'
        if( isBold  && !['B', 'STRONG'].includes(node.nodeName) )
            node.style.fontWeight = 'bold'
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
    let childNodes = Array.from(node.childNodes)
    childNodes.forEach(n=>cleanNode(node, n))

    // remove any empty nodes (but keep <br> which are always empty)
    if( node.nodeName != 'BR' && node.innerText == '' )
        return node.remove()

    // if( parent && parent.tagName == 'P' ){
    if( parent ){

        // keep spans that have styles since they will be bold/italics
        if( node.nodeName == 'SPAN' && node.hasAttribute('style') ){
            parent.appendChild(node)

        // keep tags we want
        // TODO: make list of tags an option?
        }else if( ['#text', 'p', 'br', 'b', 'strong', 'em', 'i', 'ul', 'ol', 'li'].includes(node.nodeName.toLowerCase()) ){

            // if( parent.tagName == 'P' )
                parent.appendChild(node)

        // remove tags we dont want, but keep their contents
        // example: <font>we want to keep this text and any <b>good</b> tags</font>
        }else{
            node.remove()
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
    parser: parser
}