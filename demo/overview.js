import { LitElement, html, css } from 'lit-element'
import 'bui/elements/headers'
import 'bui/elements/hr'

customElements.define('demo-overview', class extends LitElement{

    static get title(){ return 'Overview' }
    static get icon(){ return 'info-circled' }

    static get styles(){return css`
        :host {
            display: block;
            position:relative;
            height: 100%;
            overflow: auto;
        }

        .bgd {
            left: 0;
            height: 60vh;
            top: -7%;
            position: absolute;
            background: linear-gradient(-20deg, #222, #111);
            opacity: .8;
            width: 100%;
            transform: skewY(4deg);
            z-index: 0;
        }

        .bgd.color {
            opacity: 1;
            background: var(--theme);
        }

        .bgd.old {
            display: none;
            background: linear-gradient(-20deg, #1b3b52, #2c3033);
        }

        main {
            margin: 1em auto;
            width: 900px;
            max-width: calc(100% - var(--view-gutter));
            position: relative;
            z-index: 1;
        }

        header {
            color: white;
            text-align: center;
            font-size: 1.4em;
            padding-top: var(--view-gutter);
            padding-bottom: 6%;
        }

        bui-logo {
            --size: 5em;
            color: #fff;
            margin-bottom: 1rem;
        }

        main > b-paper {
            min-height: 50vh;
            padding: var(--view-gutter);
        }

        @media (min-width: 700px) {
            header [xl] {
                font-size: 3em;
            }
        }

        a, a:visited {
            color: var(--theme);
            text-decoration: none;
        }
    `}

    render(){return html`
        <div class="bgd old"></div>

        <div class="bgd color"></div>
        <div class="bgd"></div>
        

        <main>

            <header>

                <bui-logo></bui-logo>
                
                <b-text xl align="center" block>
                    Blackstone <b-text bold>UI</b-text>
                </b-text>

                <p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web components</a> for creating applications – built by Blackstone Publishing using <a href="https://lit-html.polymer-project.org">lit-html</a> and <a href="https://lit-element.polymer-project.org">lit-element</a></p>

            </header>

            <b-paper overshadow>

                <b-h1>Installation</b-h1>
                <p>Blackstone-UI is available as an [npm package](https://www.npmjs.com/package/blackstone-ui)</p>

                <b-code block>
                npm install blackstone-ui --save
                </b-code>

                <p>Or if you want the latest cutting-edge version</p>

                <b-code block>
                npm install https://github.com/kjantzer/bui.git --save
                </b-code>

                <br><b-hr></b-hr>

                <b-h1>Overview</b-h1>

                <p>Web components (or custom elements) allow us to encapsalate
                logic, designs, and features in html elements. Along with custom
                elements, various "presenters" (or views) have been created
                for all the ways an app needs to display data</p>

                <br><b-hr></b-hr>

                <b-h1>Developing</b-h1>

                <p>[lit-html](https://lit-html.polymer-project.org) and [lit-element](https://lit-element.polymer-project.org)
                are being used to create and render custom elements. The beauty in these tools
                is that they are simply syntactic sugar for native web technologies</p>

                <p><b-code>lit-html</b-code> - this is a templating tool that replaces a need for something like mustache.js</p>

                <p><b-code>lit-element</b-code> - this is a base class for that makes it easier to make custom elements removing a lot of the boilerplate code usually needed.</p>

                <br><b-hr></b-hr>

                <b-h1>Demo</b-h1>

                Install the parcel bundler

                <b-code block>
                npm install -g parcel-bundler
                </b-code>

                Then <b-code>cd</b-code> to this directory and run:

                <b-code block>
                npm start
                </b-code>

            </b-paper>

        </main>
    `}

})

export default customElements.get('demo-overview')

const codePreview = `
<b-paper compact>
<b-tabs>
    <div title="Tab 1">
        <b-spinner-overlay></b-spinner-overlay>
        <header>
            <h3>
                <b-icon name="folder"></b-icon> 
                Title
                <b-label>Active</b-label>
            </h3>
            <b-uploader url="/" auto-upload></b-uploader>
            <b-btn icon="upload-cloud" class="text-btn" onclick="this.previousElementSibling.selectFile()">Upload</b-btn>
        </header>
        <main>
            Content here
            <b-hr></b-hr>
            More content
        </main>
    </div>
    <div title="Tab 2">
        Tab 2 content
    </div>
</b-tabs>
</b-paper>`