import { LitElement, html, css } from 'lit-element'

customElements.define('b-list-sort-btn', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block
        }

        b-btn {
            --color: var(--toolbarTextColor);
        }

        main {
            display: inline-grid;
            line-height: 1.2em;
        }

        b-label {
            color: var(--toolbarTextColor);
            grid-area: unset !important;
        }

        .none:not(:first-child) {
            display: none;
        }

        b-icon {
            font-size: .8em;
            vertical-align: baseline;
            color: var(--toolbarTextColor);
        }

        /* b-icon:hover {
            cursor: pointer;
            color: var(--primaryColor)
        } */
    `}

    render(){return html`
        <b-btn text class="sorts" @click=${this.sortMenu}>
            <main>
                <b-label xs>Sort</b-label>

                <div>
                    ${this.sorts.active.map(sort=>html`
                        <span .sort=${sort}>
                            <b-icon name="${sort.isDesc?'sort-alt-down':'sort-alt-up'}"></b-icon> ${sort.label}
                        </span>
                    `)}
                    <span class="none">None</span>
                </div>
            </main>
        </b-btn>
    `}

    connectedCallback(){
        super.connectedCallback()
        this.update = this.update.bind(this)
        this.sorts.on('change', this.update)
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.sorts.off('change', this.update)
    }

    // changeDir(e){
    //     e.stopPropagation()
    //     let sort = e.currentTarget.parentElement.sort
    // }

    sortMenu(e){
        this.sorts.showMenu(e.currentTarget)
    }

})

export default customElements.get('b-list-sort-btn')