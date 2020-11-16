import { LitElement, html, css } from 'lit-element'
import docs from 'bui/presenters/form/README.md'

// must be deliberately imported
import 'bui/presenters/form/controls/rich-text-field'

customElements.define('demo-presenter-form', class extends LitElement{

    static get title(){ return 'Form' }
    static get id(){ return 'form' }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            padding: var(--view-gutter);
        }

        :host > b-paper {
            padding: var(--view-gutter);
            margin-bottom: var(--view-gutter);
        }

        form-control {
            margin: 0;
            padding: 0;
        }
    `}

    render(){return html`
        


        <b-paper>
            <b-h1>Form</b-h1>
            <br>

        <b-grid cols=3 cols-mobile=1>

            <form-control material="filled" label="Name">
                <input slot="control" type="text" autocomplete="name">
            </form-control>

            <form-control material="filled" label="Email">
                <input slot="control" type="email">
            </form-control>

            <form-control material="filled" label="Phone">
                <input slot="control" type="tel">
            </form-control>
            
            <form-control material="filled" label="Validate and prefix" prefix="$">
                <text-field validate="decimal" max="2"></text-field>
            </form-control>

            <form-control material="filled" label="Validate and suffix" suffix=" units">
                <text-field validate="int"></text-field>
            </form-control>

            <form-control material="filled" label="Date Field">
                <text-field type="date"></text-field>
            </form-control>

            <form-control colspan material="filled" label="Text Field (Multiline)">
                <text-field multiline></text-field>
            </form-control>

            <form-control colspan material="filled" label="Rich Text Field">
                <rich-text-field></rich-text-field>
                <span slot="help">Rich text editing is enabled using quill.js</span>
            </form-control>

            
            <b-grid colspan cols-mobile=1>
                <form-control material="filled" label="Select Field">
                    <select-field>
                        <option value="">No Value</option>
                        <hr>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <optgroup>Group Title</optgroup>
                        <option value="4">Option 4</option>
                        <option value="5">Option 5</option>
                    </select-field>
                </form-control>

                <form-control material="filled" label="Multi Select Field">
                    <select-field multiple>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                        <option value="5">Option 5</option>
                    </select-field>
                </form-control>
            </b-grid>

            <div>
                <check-box label="Checkbox"></check-box> &nbsp;&nbsp;
                <check-box type="switch" label="Switch"></check-box> &nbsp;&nbsp;
            </div>

            <radio-group>
                <radio-btn label="One"></radio-btn>
                <radio-btn label="Two"></radio-btn>
            </radio-group>

        </b-grid>
        </b-paper>

        <b-paper>

            <b-h1>Sliders</b-h1>
            <br>

            <b-grid cols=4 cols-mobile="1">
            <div>
                Standard&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider></range-slider>
            </div>

            <div>
                Range&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider range></range-slider>
            </div>

            <div>
                Stepped&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider step=10 value=0></range-slider>
            </div>

            <div>
                Min/Max&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider min="-100" max=20></range-slider>
            </div>

            </b-grid>
        </b-paper>


        <b-paper>
            <b-h1>Documentation</b-h1>
            <br>
            <demo-markdown-docs .docs=${docs}></demo-markdown-docs>
        </b-paper>
    `}

})

export default customElements.get('demo-presenter-form')