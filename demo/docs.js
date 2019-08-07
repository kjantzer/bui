import '../elements/icon'
import '../elements/btn'
import '../elements/spinner'
import '../elements/spinner-overlay'
import '../elements/uploader'
import '../elements/paper'
import '../elements/timer'
import '../elements/empty-state'
import '../elements/label'
import '../elements/hr'
import '../elements/sub'
import '../presenters/tabs'
import '../presenters/form-control'
import '../presenters/list'


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
        div.innerHTML = com.textContent;
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
