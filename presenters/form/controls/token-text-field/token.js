import Label from '../../../../elements/label'

customElements.define('token-text-field-token', class extends Label{

    set value(val){
        this.firstChild.innerText = val
    }

    get value(){
        return this.innerText
    }

    // alias
    set label(val){ this.value = val }
    get label(){ return this.value }

    change(attrs){
        for( let key in attrs ){

            if( key == 'label' || key == 'value'){
                this.value = attrs[key]
                continue
            }

            if( !attrs[key] )
                delete this.dataset[key]
            else
                this.dataset[key] = attrs[key]
        }
    }

})

export default customElements.get('token-text-field-token')