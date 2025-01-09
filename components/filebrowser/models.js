import {Collection, Model} from 'backbone'
import {applyGrouping} from '../../presenters/list/group-by/util'

export default class Coll extends Collection {

    constructor({root='/api/ftp'}){
        super()
        this.urlRoot = root
        this.path = []
    }

    get model(){ return FileDirModel }

    applyGrouping(models){
        return applyGrouping.call(this, models)
    }
    
    get url(){ return this.urlRoot+(this.path.length>0?('/'+this.path.join('/')):'') }

    get pathString(){
        return this.path.join('/')
    }

    set path(val){
        if( typeof val == 'string' )
            val = val.split('/').map(s=>decodeURIComponent(s))

        this.__path = Array.isArray(val) ? val : []
        this.trigger('change:path')
    }

    get path(){ return this.__path }

    push(path){
        this.path.push(path)
        this.trigger('change:path')
    }
    
    pop(){
        this.path.pop()
        this.trigger('change:path')
    }

    navTo(index=''){
        index = parseInt(index)
        if( isNaN(index) )
            this.path = []
        this.path = this.path.slice(0,index+1)
        this.trigger('change:path')
    }
}

class FileDirModel extends Model {

    attrTypes = {
        date: 'date'
    }

    get typeSort(){
        return this.get('type') == 'd' ? 'Dir' : this.get('ext')
    }

    get dateSort(){
        let date = this.get('date')
        if( !date?.isValid() ) return '4_Older'

        let age = date.diff(new Date(), 'day')

        if( age == 0 && !date.isSame(new Date(), 'date') )
            age = -1

        let label = {
            '0': '0_Today',
            '-1': '1_Yesterday',
            '-2': '2_2 Days Ago',
        }[age] || '3_Recent'

        if( age < -7 ) label = '4_Older'

        return label
    }
}

