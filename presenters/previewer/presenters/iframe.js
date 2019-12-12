import { LitElement, html, css } from 'lit-element'

customElements.define('b-previewer-iframe', class extends LitElement{

    static useFor(ext){
        return ['pdf', 'mp3', 'mp4', 'doc', 'docx', 'xlsx', 'xls', 'html'].includes(ext)
    }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
            min-height: 0;
        }

        iframe {
            width: 100vw;
            height: 100vh;
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
            
            this.$$('iframe').contentDocument.body.style.background = 'transparent'    
        // }, 0);
        
    }

})

export default customElements.get('b-previewer-iframe')