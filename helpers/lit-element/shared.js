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