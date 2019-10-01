export default (el, val)=>{

    if( !val || val === '0' )
        el.setAttribute('falsy', '')
    else
        el.removeAttribute('falsy')
        
        if( !val )
        el.setAttribute('no-value', '')
    else
        el.removeAttribute('no-value')
        
    if( !val && !el.getAttribute('placeholder') )
        el.setAttribute('empty', '')
    else
        el.removeAttribute('empty')
}