import Menu from '../menu'

export default async function contextMenu({target, models, before, after}={}){

    target ||= this
    let list = this.list

    if( !models && list && list.selection.isOn )
        models = list.currentModels
    else if( !models && this.model )
        models = [this.model]
    
    let menu = []
    
    // if( list && list.selection.isOn )
    //     menu.push({
    //         label: 'Selection Off',
    //         icon: 'library_add_check',
    //         fn: ()=>{
    //             list.selection.end()
    //         }
    //     })
    if( list && list.selection.isOn && models.length )
        menu.push({
            label: 'Clear selection',
            icon: 'backspace',
            fn: ()=>{
                list.selection.clear()
            }
        })

    if( list && !list.selection.isOn )
        menu.push({
            label: 'Select',
            icon: 'library_add_check',
            fn: ()=>{
                list.selection.begin({select: this})
            }
        })

    if( before )
        menu.unshift(...before)

    if( after )
        menu.push(...after)

    let selected = await new Menu(menu).popOver(target)
    if( !selected ) return
    
    let actionFn = selected.menuSelected?.fn || selected.fn
    let resp = null

    // newer Action subclass; NOTE: this is a Catalog Events thing
    if( actionFn && actionFn.prototype?.do){
        resp = await new actionFn(this, target, models)
    }
    else if( typeof actionFn == 'function' ){
        resp = await actionFn.call(this, target, models)
    }else if( typeof actionFn == 'string' ){
        
        if( typeof this[actionFn] == 'function' )
            resp = await this[actionFn].call(this, target, models)
    }

    if( resp )
        list?.selection.end()
}