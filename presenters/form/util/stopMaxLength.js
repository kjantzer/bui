export default (e, el, val) => {

    let okKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete', 'Tab']
    let metaKey = (e.metaKey || e.ctrlKey)
    let okPress = okKeys.includes(e.key) || metaKey
        
    let max = el.getAttribute('maxlength') || el.getAttribute('max')

    if( max && val.length >= max && !okPress )
        return true
    
    return false
}