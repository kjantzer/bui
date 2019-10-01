export default (el, val) => {

    let required = el.hasAttribute('required')

    // `validate` is deprecated, use `pattern`
    let pattern = el.getAttribute('pattern') || el.getAttribute('validate')
    
    if( !pattern ) return required ? !!val : true
    
    switch(pattern){
        case 'int':
            pattern = '^\\d+$'; break;
        case 'float':
        case 'decimal':
            pattern = '^\\d+(\\.\\d*)?$|^\\.\\d+$'; break;
        case 'email':
            pattern = '^\\S+@\\S+\\.\\S+$'; break;
    }
    
    return !required && !val ? true : (new RegExp(pattern)).test(val)
    
}