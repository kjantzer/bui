import { LitElement, html, css } from 'lit-element'

customElements.define('b-print-page-template', class extends LitElement{

    // get name(){ return 'Print View'}
    // get pageMargins(){ return '.5in' }
    // get pageSize(){ return '8.5in 11in' }

    static get styles(){return css`
        :host {
            display: block;
            position: relative;
        }

        table {
            padding: 0;
            margin: 0;
            width: 100%;
        }

        @media print {
            table.paging thead td, table.paging tfoot td {
                height: .5in;
            }
        }

        header, footer {
            width: 100%; height: .5in;
        }

        thead, tfoot {
            pointer-events: none;
        }

        header {
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            height: .5in;
            width: 100%;
            overflow: avoid;
        }

        :host, table, tbody, main{
            font-size: 16px !important;
            /* overflow-x: hidden;
            overflow-y: auto; */
        }

        tbody, tbody tr, tbody tr td {
            overflow-x: hidden;
        }

        aside {
            position: fixed;
            top: calc(3em + var(--safe-top));
            right: 1em;
        }

        @media print {
            /* :host, table, tbody, main{
                font-size: 0.16in !important;
            } */
            aside {
                display: none;
            }

            header {
                position: fixed;
                /* margin-top: -.5in; */
            }
        }
    `}

    get headerTitle(){ return ''}

    applySetting(e){
        let control = e.currentTarget
        this.toggleAttribute(control.key, control.checked)
    }

    renderHeader(){ return html`
        <b-text lg bold>
            <text-field .value=${this.headerTitle}></text-field>
        </b-text>
    `}

    renderContent(){return html``}
    renderFooter(){return html``}

    render(){return html`
        
        <!-- <header>
            ${this.renderHeader()}
        </header> -->

        <!-- <table class=paging><thead><tr><td>&nbsp;</td></tr></thead><tbody><tr><td> -->

        <main>
        ${this.renderContent()}
        </main>

        <!-- </td></tr></tbody><tfoot><tr><td>&nbsp;</td></tr></tfoot></table>

        <footer>
            ${this.renderFooter()}
        </footer> -->
    `}


})

export default customElements.get('b-print-page-template')