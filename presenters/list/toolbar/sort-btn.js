import { LitElement, html, css } from 'lit'

customElements.define('b-list-sort-btn', class extends LitElement{

    static get styles(){return css`
        :host {
            display: block
        }

        b-btn {
            --color: var(--toolbarTextColor);
        }

        main {
            display: inline-flex;
        }

        .none:not(:first-child) {
            display: none;
        }

        .count {
            display: none;
            vertical-align: super;
            margin: -1em 0;
            font-weight: normal;
            opacity: .5;
            font-size: .8em;
        }

        @media (max-width:999px){
            .count:not([val="0"]) {
                display: inline-block;
            }

            .sort ~ .sort {
                display: none;
            }
        }

        b-icon {
            /* font-size: .8em; */
            /* vertical-align: baseline; */
            color: var(--toolbarTextColor);
            margin: 0 -.125em;
        }

        /* b-icon:hover {
            cursor: pointer;
            color: var(--primaryColor)
        } */
    `}

    render(){return html`
        <b-btn text class="sorts" @click=${this.sortMenu}>
            <main>
                <b-text bold>Sort:</b-text>

                <b-flex gap=" " left>
                    ${this.sorts.active.map(sort=>html`
                        <b-flex inline gap="0" left class="sort" .sort=${sort}>
                            <b-icon name="arrow_right_alt" ?rotate-90=${!sort.isDesc} ?rotate90=${sort.isDesc}></b-icon> ${sort.label}
                        </b-flex>
                    `)}
                    
                    <span class="none">None</span>
                    
                    <span class="count" val="${this.sorts.active.length-1}">
                        +${this.sorts.active.length-1}
                    </span>
                </b-flex>
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