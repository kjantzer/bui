import '../elements/icon'
import '../elements/btn'
import '../elements/btn-group'
import '../elements/spinner'
import '../elements/spinner-overlay'
import '../elements/uploader'
import '../elements/paper'
import '../elements/carousel'
import '../elements/timer'
import '../elements/empty-state'
import '../elements/label'
import '../elements/ribbon'
import '../elements/hr'
import '../elements/sub'
import '../elements/avatar'
import '../elements/code'
import '../elements/embed'
import '../elements/audio'
import '../elements/file-icon'
import '../presenters/tabs'
import '../presenters/form-control'
import '../presenters/list'
import '../helpers/colors-list'
import '../helpers/colors.less';

import Dialog from '../presenters/dialog'
window.Dialog = Dialog

import Menu from '../presenters/menu'
window.Menu = Menu


function convertComments(){
    var tw = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT, null, null)
    var comment
    var comments = []

    while( comment = tw.nextNode() ){
        comments.push(comment)
    }

    comments.forEach(com=>{
        let div = document.createElement('div')
        div.classList.add('demo-block')

        let str = com.textContent
        let strs = str.split("\n")
        let type = strs.shift()
        str = strs.join("\n")
        div.innerHTML = str;

        if( type )
            div.setAttribute('type', type)

        let script = div.querySelector('script')
        if( script )
            eval(script.innerText)

        com.replaceWith(div)
    })
}

convertComments()

// popstate
history.pushState = ( f => function pushState(){
    var ret = f.apply(this, arguments);
    convertComments()
    return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
    var ret = f.apply(this, arguments);
    convertComments()
    return ret;
})(history.replaceState);

window.addEventListener('popstate', function(){
    convertComments()
})
