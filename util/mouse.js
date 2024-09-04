/*
    # Mouse
    
    Tracks the mouse location and provides helpful methods for 
    finding what elements are underneath

    ```js
    Mouse.track()

    Mouse.pageX
    Mouse.pageY
    Mouse.elementUnder()
    ```

    Check src file for all methods
*/
let isTracking = false

export const Mouse = {

    event: {},

    track(){

        if( isTracking ) return
        isTracking = true

        window.addEventListener('mousemove', e=>{
            this.event = e
        })

        // TEMP disable
        // window.addEventListener('mouseleave', e=>{
        //     this.event = {}
        // })
    },

    get pageX(){
        return this.event.pageX
    },

    get pageY(){
        return this.event.pageY
    },

    get path(){
        return this.event.path
    },

    get isOverWindow(){
        return this.event.pageX != undefined
    },

    isOverElement(element){
        return !!this.elementsUnder().find(el=>el==element)
    },

    elementUnder({
        tagName=null,
        followShadowDOM=true
    }={}){

        if( !this.isOverWindow ) return []

        let element = document
        while( element.elementFromPoint ){
            element = element.elementFromPoint(this.pageX, this.pageY)
            
            if( tagName && element.tagName.toLowerCase() == tagName.toLowerCase() )
                return element

            if( followShadowDOM && element.shadowRoot && element.shadowRoot.children.length > 0 )
                element = element.shadowRoot
            else{
                // if we want tagName and get here, it was not found
                if( tagName )
                    return

                return element
            }
        }        
    },

    elementsUnder({
        followShadowDOM=true
    }={}){

        if( !this.isOverWindow ) return []

        let elements = document.elementsFromPoint(this.pageX, this.pageY)
        let element = elements[0].shadowRoot

        while( element && element.elementFromPoint ){
            element = element.elementFromPoint(this.pageX, this.pageY)

            elements.unshift(element)

            if( followShadowDOM && element.shadowRoot && element.shadowRoot.children.length > 0 )
                element = element.shadowRoot
            else
                element = null
        }

        return elements
    }

}

// window.Mouse = Mouse // TEMP

export default Mouse