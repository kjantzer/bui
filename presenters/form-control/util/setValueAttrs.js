export default (el, val)=>{

    if( !val || val === '0' )
        el.setAttribute('falsy', true)
    else
        el.removeAttribute('falsy')
        
        if( !val )
        el.setAttribute('no-value', true)
    else
        el.removeAttribute('no-value')
        
    if( !val && !el.getAttribute('placeholder') )
        el.setAttribute('empty', true)
    else
        el.removeAttribute('empty')
}