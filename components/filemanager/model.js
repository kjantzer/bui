import {Model} from 'backbone'
import { round } from '../../util/math'

export default class FileModel extends Model {

    get displayURL(){ return this.url()+'?display' }
    get previewURL(){ return this.url()+'?display=preview' }
    get downloadURL(){ return this.url()+'?download' }

    get traits(){ return this.attributes.traits || {} }

    saveTrait(key, val){
        let traits = this.traits
        let changes = {[key]:val}

        // given an hash of changes
        if( typeof key !== 'string' && val == undefined )
            changes = key

        // apply each change, deleting trait if value is "null"
        for( let k in changes ){
            let v = changes[k]

            if( v == null )
                delete traits[k]
            else
                traits[k] = v
        }

        this.save('traits', traits, {patch:true})
        this.trigger('change', this, {traits})
    }

    get width(){
        return round(this.traits.width||0, 4)
    }

    get height(){
        return round(this.traits.height||0, 4)
    }

    get origFilenameLabel(){
        return this.get('orig_filename').replace(RegExp(`\.${this.get('ext')}$`), '')
    }

    get filenameLabel(){
        return this.get('filename').replace(RegExp(`\.${this.get('ext')}$`), '')
    }
}