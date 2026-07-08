import Menu from '../menu'
import {html} from 'lit'

export default async function contextMenu({
    target,
    models,
    before,
    after,
    actions,
    beforePresent,
    selectionControls=true,
    endSelectionAfterAction=true
}={}){

    target ||= this
    let list = this.list
    let menu = []

    if( !models && list && list.selection.isOn )
        models = list.currentModels
    else if( !models && this.model )
        models = [this.model]


    if( !models.length && !menu.length ){
        if( this.list?.selection.isOn ){
            list.selection.select(this)
            models = list.currentModels
        }else
            throw new UIWarningError('No rows selected', {target})
    }

    if( before )
        menu.push(...before)

    if( models.length && actions ){

        if(typeof actions === 'function')
            actions = actions(models)

        if( actions?.length )
            menu.push({divider: `Actions`}, ...actions)
    }

    if( after )
        menu.push(...after)

    let _menu

    if( selectionControls && list?.selection ){

        let el = this
        function selectionOn(){
            list.selection.begin({select: el})
            _menu.close()
        }

        function selectionOff(){
            list.selection.end()
            _menu.close()
        }

        function selectionClear(){
            list.selection.clear()
            _menu.close()
        }

        menu.push({text:html`
            <b-flex wrap gap-row=" " left>
                <b-text link @click=${selectionOn} ?hidden=${list.selection.isOn}>Selection: On</b-text>
                <b-text link @click=${selectionOff} ?hidden=${!list.selection.isOn}>Selection: Off</b-text>
                <b-text link @click=${selectionClear} ?hidden=${!list.selection.isOn}>Deselect (${models.length})</b-text>
            </b-flex>
        `})
    }

    if( beforePresent )
        await beforePresent(menu)

    _menu = new Menu(menu)
    let selected = await _menu.popOver(target)
    if( !selected ) return
    
    let action = selected.menuSelected?.fn || selected.fn
    let resp = null

    // newer Action subclass
    if( action && action.prototype?.do){
        resp = await new action(this, target, models, {selected})
    }
    else if( action ){

        if( typeof action == 'string' )
            resp = this[action]?.call(this, target, models, {selected})
        else
            resp = await action.call(this, target, models, {selected})
    }

    if( resp && endSelectionAfterAction)
        list?.selection.end()
}