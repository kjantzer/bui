import Action, {Dialog} from '../action'

export default class DeleteAction extends Action {

    static label='Delete'
    static icon='trash'

    async do(){
        
        if( !await Dialog.confirmDelete().popOver(this.target) )
            return

        await this.saveModels(async model=>model.destroySync())

    }
}