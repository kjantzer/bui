import { LitElement, html, css } from 'lit-element'

customElements.define('b-fileexplorer-breadcrumbs', class extends LitElement{

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
        }

        b-btn:not(:last-of-type):not(:hover):not(:first-child) {
            opacity: .5
        }

        b-btn:last-of-type {
            font-weight: bold;
        }
    `}

    render(){return html`
        
        <b-btn text icon="home" index="" @click=${this.navTo}></b-btn>
        
        ${this.coll.path.map((path,i)=>html`
            <b-icon name="right-open"></b-icon>
            <b-btn text index=${i} color="theme" @click=${this.navTo}>${path}</b-btn>
        `)}
    `}

    navTo(e){
        let index = e.currentTarget.getAttribute('index')
        this.coll.navTo(index)
        goTo(this.host.route.makePath({_:this.coll.pathString}))
    }

})

export default customElements.get('b-fileexplorer-breadcrumbs')