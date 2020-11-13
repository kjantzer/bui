import setValueAttrs from './setValueAttrs'
import validatePattern from './validatePattern'
import stopMaxLength from './stopMaxLength'

export default function(input){

    setTimeout(()=>{
        setValueAttrs(input, input.value)
    })

    input.addEventListener('change:value', onChange)
    input.addEventListener('input', onInput)
    input.addEventListener('focus', onFocus)
    input.addEventListener('blur', onBlur)
    input.addEventListener('keydown', onKeyDown)

    // let hasPattern = input.hasAttribute('pattern')
    // let hasAutocomplete = input.hasAttribute('autoComplete')

    if( input.type == 'email' ){
        if( !input.pattern ) input.pattern = 'email'
        if( !input.autocomplete ) input.autocomplete = 'email'
    }

    if( input.type == 'tel' ){
        if( !input.autocomplete ) input.autocomplete = 'phone'
    }
}


const testPattern = input => {

    if( validatePattern(input, input.value) ){
        delete input.isInvalid
        input.removeAttribute('invalid')

    }else if(input.hasAttribute('reset-invalid')){
        input.value = input._originalVal || ''
        delete input.isInvalid
        input.removeAttribute('invalid')

    }else{
        input.isInvalid = true
        input.setAttribute('invalid', '')
    }
}

const onChange = e =>{
    setValueAttrs(e.target, e.target.value)
}

const onFocus = e =>{
    e.target._originalVal = e.target.value
}

const onBlur = e =>{
    testPattern(e.target)
    setValueAttrs(e.target, e.target.value)
    delete e.target._originalVal
}

const onInput = e =>{
    setValueAttrs(e.target, e.target.value)
}

const onKeyDown = e =>{
    
    if( e.target.hasAttribute('invalid') )
        e.target.removeAttribute('invalid')

    if( e.key == 'Escape' ){
        e.target.value = e.target._originalVal || ''
        e.target.blur()
    }

    // maxlength doesn't work on iOS, so let's implement our own
    if( stopMaxLength(e, e.target, e.target.value) )
        e.preventDefault()
}
