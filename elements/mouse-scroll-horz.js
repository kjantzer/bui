/*
    # Mouse Scroll Horz

    Add as child of any element to make the parent element scrollable horizontally when the user scrolls with the mouse.

    ```html-preview
    <div style="overflow-x: auto;">
        <b-mouse-scroll-horz></b-mouse-scroll-horz>
        <div style="background: gray; height: 4em; width: 200vw;">Scroll me horizontally</div>
    </div>
    ```

    TODO: add feature to require a key down to scroll?
*/
import { LitElement} from 'lit'

customElements.define('b-mouse-scroll-horz', class extends LitElement{

    constructor(){
        super()
        this.scrollHorz = this.scrollHorz.bind(this)
    }

    connectedCallback(){
        super.connectedCallback()
        this.container = this.parentElement || this.getRootNode()?.host
        this.container?.addEventListener('wheel', this.scrollHorz)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.container?.removeEventListener('wheel', this.scrollHorz)
    }

    scrollHorz(e){
        e.preventDefault();
        this.container.scrollLeft += e.deltaX == -0 ? e.deltaY : e.deltaX
    }

})

export default customElements.get('b-mouse-scroll-horz')