import { LitElement, html, css } from 'lit-element'
import 'bui/elements/headers'
import 'bui/elements/hr'
import docs from 'bui/README.md'
import './setup'
import './changelog'

let docsStr = docs
let trimIndex = docsStr.search('## 🎉 Features')
docsStr = trimIndex > -1 ? docsStr.substr(trimIndex) : docsStr

// FIXME: needs improvement
var matches;
while (matches = /\(\.\/(.[^\/]+)\/README\.md\)/.exec(docsStr)) {
    docsStr = docsStr.replace(matches[0], `(/${matches[1]})`)
}

window.docsStr = docsStr

customElements.define('demo-overview', class extends LitElement{

    static get title(){ return 'Overview' }
    static get icon(){ return 'info' }
    static get path(){ return 'overview(/:view(/*))' }

    static get styles(){return css`
        :host {
            display: grid;
            position:relative;
            height: 100%;
            overflow: hidden;
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
            /* width: 900px;
            max-width: calc(100% - var(--view-gutter)); */
            max-width: 900px;
            position: relative;
            z-index: 1;
        }

        header {
            color: white;
            text-align: center;
            font-size: 1.4em;
            /* padding-top: var(--view-gutter); */
            padding-bottom: 3%;
        }

        @media (max-width: 599px) {
            header {
                font-size: 1em;
            }

            .bgd {
                height: 70vh;
            }
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

        @media (min-width: 600px) {
            header [xl] {
                font-size: 3em;
            }
        }

        a, a:visited {
            color: var(--theme);
            text-decoration: none;
        }

        b-tabs > * {
            min-width: 0;
        }

        b-tabs-router::part(tab-bar) {
            color: white;
            --inactiveColor: rgba(255,255,255,.4);
            --border-color: rgba(255,255,255,.1);
        }
    `}

    render(){return html`
        <div class="bgd old"></div>

        <div class="bgd color"></div>
        <div class="bgd"></div>
        

        <b-tabs-router path="overview/" key="demo-overview">
            <div title="About" view-id="about">
            <main>

                <header>

                    <bui-logo></bui-logo>
                    
                    <b-text xl align="center" block>
                        Blackstone <b-text bold>UI</b-text>
                    </b-text>

                    <p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web components</a> for creating applications – built by Blackstone Publishing using <a href="https://lit-html.polymer-project.org">lit-html</a> and <a href="https://lit-element.polymer-project.org">lit-element</a></p>

                </header>

                <b-paper overshadow>

                    <demo-markdown-docs notoc .docs=${docsStr}></demo-markdown-docs>

                </b-paper>

            </main>
            </div>

            demo-setup
            demo-changelog

        </b-tabs-router>
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