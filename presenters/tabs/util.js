
export function viewsFromNodes(nodes, {ignoreSlots=true}={}){

    let views = []
    nodes.forEach(node=>{

        // ignore these node types
        if( (ignoreSlots&&node.slot) || ['#comment', 'SCRIPT', 'STYLE'].includes(node.nodeName) || node.hasAttribute?.('notcontent'))
            return

        // already a tab view
        if( node.tabView )
            return

        if( node.nodeName == '#text' ){
            
            let str = node.textContent.trim()
            if( !str ) return
            
            let _views = str.split("\n").map(s=>s.trim())
            _views = _views.filter(v=>v) // ignore empty lines
            views.push(..._views)
            node.textContent = ''

        } else if(node.tagName == 'SLOT'){
            let slotViews = viewsFromNodes(node.assignedNodes(), {ignoreSlots: false})
            views.push(...slotViews)
        }else{

            // all tab views should have a title, so add one
            // if( !node.title )
            //     node.title = '[unnamed]'

            views.push(node)

        }
    })

    return views
}