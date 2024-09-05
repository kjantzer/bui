/*
    # Shared

    Define a custom element with a "shared" singleton feature. Useful for when a view will be used in multiple places but only needs to be intialized once and then reused.

    ```js
    import 'bui/helpers/lit/shared'

    let MyElement = customElements.defineShared('my-element', class extends LitElement{
        open(){
            log('open this view')
        }
    })

    MyElement.shared.open()

    console.log(MyElement.shared == MyElement.shared) // true
    console.log(MyElement.shared == new MyElement() ) // false
*/
customElements.defineShared = function(name, Class){
    
    customElements.define(name, Class)
    
    let Shared

    Object.defineProperty(Class, 'shared', {
        get: function(){
            if( !Shared )
                Shared = document.createElement(name)
            return Shared
        }
    });
    
    return customElements.get(name)
}