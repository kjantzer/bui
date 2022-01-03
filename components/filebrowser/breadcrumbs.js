import { LitElement, html, css } from 'lit-element'
import scrollbars from '../../helpers/scrollbars'

customElements.define('b-filebrowser-breadcrumbs', class extends LitElement{

    static get listeners(){return {
        coll: {'change:path': 'update'}
    }}

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            align-self: stretch;
            display: flex;
            align-items: center;
            overflow-x: auto;
        }

        ${scrollbars.hide()}

        b-btn {
            font-weight: normal;
            white-space: nowrap;
            flex-shrink: 0;
        }

        [sep] {
            margin: 0px -0.35rem;
            color: var(--theme-text-accent);
            font-weight: bold;
        }

        b-btn:last-of-type {
            font-weight: bold;
            color: var(--theme);
        }
    `}

    render(){return html`
        
        <b-btn text icon="home" index="" @click=${this.navTo}></b-btn>
        
        ${this.coll.path.map((path,i)=>html`
            <b-text sep>/</b-text>
            <b-btn text index=${i} @click=${this.navTo}>${path}</b-btn>
        `)}
    `}

    navTo(e){
        let index = e.currentTarget.getAttribute('index')
        this.coll.navTo(index)
        goTo(this.host.route.makePath({_:this.coll.pathString}))
    }

})

export default customElements.get('b-filebrowser-breadcrumbs')