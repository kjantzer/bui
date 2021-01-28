
// stupid iOS https://stackoverflow.com/a/55652503/484780
// maybe android problem too?

export default function mobileAsyncFocus(focusElem, {delay=1000}={}){
    
    const fakeInput = document.createElement('input')
    fakeInput.setAttribute('type', 'text')
    fakeInput.style.position = 'absolute'
    fakeInput.style.opacity = 0
    fakeInput.style.height = 0
    fakeInput.style.fontSize = '16px' // disable auto zoom

    document.body.prepend(fakeInput)

    fakeInput.focus()

    setTimeout(() => {

        if( typeof focusElem == 'function' )
            focusElem()
        else if( focusElem.focus )
            focusElem.focus()
        else
            console.warning('Given element does not have a `focus` method');

        fakeInput.remove()

    }, delay)
}