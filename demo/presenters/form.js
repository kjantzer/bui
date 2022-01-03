import { LitElement, html, css } from 'lit-element'
import docs from 'bui/presenters/form/README.md'

// must be deliberately imported
import 'bui/presenters/form/controls/text-editor'

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

        form-control[material="outline"] {
            --fc-bgd: var(--theme-bgd);
        }

        form-control[suffix]::part(suffix) {
            flex-grow: 100;
        }

        .form-result {
            background: var(--theme-bgd-accent);
            border-radius: 4px;
            font-family: monospace;
            padding: 1em;
            margin-top: .5em;
            /* white-space: pre-wrap; */
        }

        form-control [slot="prefix"] {
            pointer-events: none;
        }
    `}

    onFormChange(changes){
        setTimeout(()=>{
            this.update()
        })
    }

    formResult(){
        if( !this.formHandler ) return ''
        return html`
            ${this.formHandler.isInvalid?html`
                <b-label filled="red">Invalid</b-label>
            `:''}
            ${JSON.stringify(this.formHandler.values, null, 4)}
        `
    }

    render(){return html`
    
        <b-paper>
            <b-h1>Form</b-h1>
            <br>

        <form-handler .onChange=${this.onFormChange.bind(this)}>
        <b-grid cols=3 cols-mobile=1>

            <form-control material="filled" key="name" label="Name">
                <input slot="control" type="text" autocomplete="name">
            </form-control>

            <form-control material="filled" key="email" label="Email">
                <input slot="control" type="email">
            </form-control>

            <form-control material="filled" key="phone" label="Phone">
                <input slot="control" type="tel">
            </form-control>
            
            <form-control material="filled" key="prefix" label="Validate and prefix" prefix="$">
                <text-field validate="decimal" max="2"></text-field>
            </form-control>

            <form-control material="filled" key="suffix" label="Validate and suffix" suffix=" units">
                <text-field validate="int"></text-field>
            </form-control>

            <form-control material="filled" key="date" label="Date Field">
                <text-field type="date"></text-field>
            </form-control>

            <form-control colspan material="filled" key="text" label="Text Field (Multiline)">
                <text-field multiline></text-field>
            </form-control>

            <form-control colspan material="filled" key="rte" label="Text Editor (WYSIWYG)">
                <text-editor></text-editor>
                <span slot="help">Rich text editing is enabled with tiptap.js</span>
            </form-control>

            
            <b-grid colspan cols-mobile=1>
                <form-control material="filled" key="select" label="Select Field">
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

                <form-control material="filled" key="select-multi" label="Multi Select Field">
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
                <check-box key="checkbox" label="Checkbox"></check-box> &nbsp;&nbsp;
                <check-box type="switch" key="switch" label="Switch"></check-box> &nbsp;&nbsp;
            </div>


            <div>

                <radio-group key="radio">
                    <radio-btn label="One"></radio-btn>
                    <radio-btn label="Two"></radio-btn>
                </radio-group>

                <br><br>
                
                <radio-group key="segment" segment>
                    <radio-btn label="One" active></radio-btn>
                    <radio-btn label="Two"></radio-btn>
                    <radio-btn label="Three" value="3"></radio-btn>
                </radio-group>

                <br><br>
                
                <radio-group key="segment-stacked" segment stacked>
                    <radio-btn label="One" active></radio-btn>
                    <radio-btn label="Two"></radio-btn>
                    <radio-btn label="Three" value="3"></radio-btn>
                </radio-group>

            </div>

            <form-control key="slider" prefix="0" suffix="100" style="margin-top: .25em;">
                <range-slider slot="control" style="margin: 0 1em;"></range-slider>
            </form-control>

        </b-grid>
        </form-handler>

        <br><br>
        <b-text ucase bold>Form Result</b-text>
        <div class="form-result">${this.formResult()}</div>

        </b-paper>

        <b-paper>

            <b-h1>Sliders</b-h1>
            <br>

            <b-grid cols=4 cols-mobile="1">
            <div>
                Standard&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider></range-slider>
            </div>

            <div>
                Range&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider range .value=${[20,60]}></range-slider>
            </div>

            <div>
                Stepped&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider step=10 value=0></range-slider>
            </div>

            <div>
                Min/Max&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <range-slider min="-100" max=20 value=0></range-slider>
            </div>

            </b-grid>
        </b-paper>

        <b-paper>

            <b-h1>Baked-in Styles</b-h1><br><br>

            <b-text block bold ucase>Material Filled</b-text><br>
            <b-grid cols=3 cols-mobile=1>

                <form-control material="filled" label="Text Field">
                    <text-field></text-field>
                    <span slot="prefix"><b-icon name="mail"></b-icon>&nbsp;</span>
                </form-control>

                <form-control material="filled" label="Prefixed" prefix="$" suffix=".00">
                    <text-field></text-field>
                </form-control>

                <form-control material="filled" label="Select Field">
                    <select-field>
                        <option value="">—</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select-field>
                </form-control>

            </b-grid>

            <br><br>

            <b-text block bold ucase>Material Filled (Dense)</b-text><br>
            <b-grid cols=3 cols-mobile=1>

                <form-control dense material="filled" label="Text Field">
                    <text-field></text-field>
                    <span slot="prefix"><b-icon name="mail"></b-icon>&nbsp;</span>
                </form-control>

                <form-control dense material="filled" label="Prefixed" prefix="$" suffix=".00">
                    <text-field></text-field>
                </form-control>

                <form-control dense material="filled" label="Select Field">
                    <select-field>
                        <option value="">—</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select-field>
                </form-control>

            </b-grid>

            <br><br>

            <b-text block bold ucase>Material Outline</b-text><br>
            <b-grid cols=3 cols-mobile=1>

                <form-control material="outline" label="Text Field">
                    <text-field></text-field>
                    <span slot="prefix"><b-icon name="mail"></b-icon>&nbsp;</span>
                </form-control>

                <form-control material="outline" label="Prefixed" prefix="$" suffix=".00">
                    <text-field></text-field>
                </form-control>

                <form-control material="outline" label="Select Field">
                    <select-field>
                        <option value="">—</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select-field>
                </form-control>

            </b-grid>

            <br><br>

            <b-text block bold ucase>Material</b-text><br>
            <b-grid cols=3 cols-mobile=1>

                <form-control material="" label="Text Field">
                    <text-field></text-field>
                    <span slot="prefix"><b-icon name="mail"></b-icon>&nbsp;</span>
                </form-control>

                <form-control material="" label="Prefixed" prefix="$" suffix=".00">
                    <text-field></text-field>
                </form-control>

                <form-control material="" label="Select Field">
                    <select-field>
                        <option value="">—</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select-field>
                </form-control>

            </b-grid>

            <br><br>

            <b-text block bold ucase>Plain</b-text><br>
            <b-grid cols=3 cols-mobile=1>

                <form-control>
                    <text-field placeholder="Text Field"></text-field>
                    <span slot="prefix"><b-icon name="mail"></b-icon>&nbsp;</span>
                </form-control>

                <form-control prefix="$" suffix=".00">
                    <text-field placeholder="0"></text-field>
                </form-control>

                <form-control>
                    <select-field placeholder="Select Field">
                        <option value="">—</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select-field>
                </form-control>

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