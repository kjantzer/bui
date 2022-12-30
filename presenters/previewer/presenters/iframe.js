import { LitElement, html, css } from 'lit'

customElements.define('b-previewer-iframe', class extends LitElement{

    static useFor(ext){
        return ['pdf', 'mp3', 'mp4', 'm4a', 'doc', 'docx', 'xlsx', 'xls', 'html'].includes(ext)
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
            min-height: 0;
            pointer-events: none;
        }

        iframe {
            width: 100%;
            height: 100%;
            pointer-events: all;
            /* background: transparent; */
            /* object-fit: contain; */
        }
    `}

    render(){return html`
        <!-- <object data="${this.model.displayURL}" type="application/pdf">
            <embed src="${this.model.displayURL}" type="application/pdf" />
        </object> -->
        <iframe src="${this.model.displayURL}" allowtransparency=true frameBorder=0 @load=${this.onLoad}></iframe>
    `}
    
    onLoad(){
        // setTimeout(() => {
            // console.log(this.$$('iframe'));
            
            let doc = this.$$('iframe').contentDocument
            let body = doc.body

            // doesn't work (sort of works?)
            body.style.background = 'transparent'    

            body.onclick = function(){
                console.log('on click');
            }

            this.emitEvent('loaded')

            // see if url/api returned a JSON error
            if( body.children.length == 1 && body.children[0].tagName == 'PRE' ){
                let err
                try{ err = JSON.parse(body.textContent)}catch(err){}
                if( err && err.error ){
                    throw new UIError(err.error)
                }
            }

            // this.$$('iframe').addEventListener('click', e=>{
            //     console.log('clicked?', e);
                
            // })
        // }, 0);
        
    }

})

export default customElements.get('b-previewer-iframe')