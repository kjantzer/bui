import { LitElement, html, css } from 'lit-element'
import 'bui/presenters/tabs'
import 'bui/elements/icon'
import 'bui/elements/text'
import 'bui/elements/btn'
import 'bui/elements/btn-group'
import 'bui/elements/spinner'
import 'bui/elements/spinner-overlay'
import 'bui/elements/tooltip'
import 'bui/elements/paper'
import 'bui/elements/grid'
import 'bui/elements/flex'
import 'bui/elements/timer'
import 'bui/elements/empty-state'
import 'bui/elements/label'
import 'bui/elements/ribbon'
import 'bui/elements/avatar'
import 'bui/elements/hr'
import 'bui/elements/sub'
import 'bui/elements/ts'
import 'bui/elements/code'
import 'bui/elements/embed'
import 'bui/elements/audio'
import 'bui/elements/carousel'
import 'bui/elements/timeline-horz'
import 'bui/helpers/day-js'
import './elements/icons'
import './elements/uploader'

import buttons from './elements/buttons'
import text from './elements/text'
import specialty, {styles as specialtyStyles} from './elements/specialty'
import iconDocs from '../docs/icons.md'

import elementDocs, {allDocs} from './elements/docs'

customElements.define('demo-elements', class extends LitElement{

    static get title(){ return 'Elements' }
    static get icon(){ return 'code' }
    static get path(){ return 'elements(/:tab)' }

    static get styles(){return css`
        :host {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr;
            position:relative;
            overflow: hidden;
        }

        [view-id="layout"] b-grid > div {
            background: var(--theme-bgd-accent);
            padding: .25em;
        }

        [view-id="layout"] b-flex > div {
            background: var(--theme-bgd-accent);
        }

        b-paper {
            margin-bottom: 1em;
        }

        b-tabs-router > section {
            position: relative;
            height: 100%;
            overflow: auto;
        }

        section:not([view-id="paper"]) > b-paper {
            padding: 1em;
        }

        section > b-paper ~ b-paper {
            margin-top: 1em;
        }

        b-h1 {
            border-bottom: solid 4px var(--theme-bgd-accent);
            padding-bottom: .15em;
            margin-bottom: 1em;
        }

        b-h1 ~ b-h1 {
            margin-top: var(--view-gutter);
        }

        b-avatar {
            --size: 3em;
        }

        ${specialtyStyles}
    `}

    

    render(){return html`
        <b-tabs-router path="elements/" key="elements" layout="left">

             <section title="Icons">

                <b-paper>
                <b-h1>Icons</b-h1>

                <demo-markdown-docs notoc .docs=${iconDocs}></demo-markdown-docs>

                <b-btn href="material-icons">View Available Material Icons</b-btn>
                </b-paper>

                <br><br>

                <b-paper>
                    <b-h1>File Icon</b-h1>
                    <b-file-icon ext="pdf" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="docx" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="xlsx" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="psd" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="indd" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="ai" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="mp3" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="mp4" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="html" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="xml" style="--size:4em"></b-file-icon>
                    <b-file-icon ext="zip" style="--size:4em"></b-file-icon>

                    <br><br>
                    <demo-markdown-docs notoc .docs=${elementDocs['file-icon']}></demo-markdown-docs>
                </b-paper>
            </section>

            b-demo-icons

            <section title="Layout">

                <b-paper>
                <h1>Grid</h1>

                <b-grid cols="4">
                    <div colspan>Row 1</div>
                    <div colspan=2>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                    <div>Row 5</div>
                    <div>Row 6</div>
                    <div>Row 7</div>
                    <div>Row 8</div>
                </b-grid>

                <b-hr short thick pad="lg"></b-hr>

                <h2>Columns</h2>
                <div>There are defaults columns, but if you need something custom, you can apply your own <code>grid-template-columns</code> style</div>

                <h3>4 Columns (1-8 supported) — <code>cols="4"</code></h3>
                <b-grid cols="4">
                    <div>Row 1</div>
                    <div>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                    <div>Row 5</div>
                    <div>Row 6</div>
                    <div>Row 7</div>
                    <div>Row 8</div>
                </b-grid>

                <h3>Two-thirds, one-third — <code>cols="2,1"</code></h3>
                <b-grid cols="2,1">
                    <div>Row 1</div>
                    <div>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                    <div>Row 5</div>
                    <div>Row 6</div>
                    <div>Row 7</div>
                    <div>Row 8</div>
                </b-grid>

                <h3>Half, quarter, quarter — <code>cols="2,1,1"</code></h3>
                <b-grid cols="2,1,1">
                    <div>Row 1</div>
                    <div>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                    <div>Row 5</div>
                    <div>Row 6</div>
                    <div>Row 7</div>
                    <div>Row 8</div>
                </b-grid>

                <b-hr short thick pad="lg"></b-hr>
                
                <h2>Gap</h2>

                <h3><code>gap="0"</code></h3>
                <b-grid gap="0">
                    <div>Row 1</div>
                    <div>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                </b-grid>

                <h3><code>gap=".5"</code></h3>
                <b-grid gap=".5">
                    <div>Row 1</div>
                    <div>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                </b-grid>

                <h3><code>gap="2"</code></h3>
                <b-grid gap="2">
                    <div>Row 1</div>
                    <div>Row 2</div>
                    <div>Row 3</div>
                    <div>Row 4</div>
                </b-grid>

                </b-paper>

                <b-paper>

                    <h1>Flex</h1>

                    <b-paper outline compact><b-flex left>
                        <div>Flex box</div>
                        <div>Flex box</div>
                        <div>Flex box</div>
                    </b-flex>
                    </b-paper>

                    <b-paper outline compact><b-flex right>
                        <div>Flex box</div>
                        <div>Flex box</div>
                        <div>Flex box</div>
                    </b-flex>
                    </b-paper>

                    <b-paper outline compact><b-flex stretch>
                        <div>stretch</div>
                        <div>stretch</div>
                        <div>stretch</div>
                    </b-flex>
                    </b-paper>

                    <b-paper outline compact><b-flex col>
                        <div>coll</div>
                        <div>coll</div>
                        <div>coll</div>
                    </b-flex>
                    </b-paper>

                </b-paper>
                
            </section>

            <section title="Paper">
                <h1>Paper</h1>

                <b-paper overshadow>
                    Default white with overshadow
                </b-paper>
            
                <b-paper color="blue">
                    Blue color
                </b-paper>

                <b-paper color="red">
                    Red color
                </b-paper>

                <b-paper color="green">
                    Green color
                </b-paper>

                <b-paper color="gray">
                    Gray color
                </b-paper>

                <br>
                <h2>Color Variations</h2>

                <b-paper color="info" outline>
                    <b-icon name="info-circled"></b-icon> "info" color, outline style, with icon
                </b-paper>

                <b-paper color="postit" outline>
                    <b-icon name="flag"></b-icon> "postit" color, outline style, with icon
                </b-paper>

                <br>
                <h2>Other Variations</h2>

                <b-paper empty>
                    Empty state style
                </b-paper>

                <b-paper dense outline>
                    Dense padding
                </b-paper>

                <b-paper compact outline>
                    Compact padding (no padding) - useful when the child element wants to set it's own padding
                </b-paper>

            </section>

            ${text}
            ${buttons}

            <section title="Avatar">
                <h1>Avatar</h1>

                <b-label divider>Initials</b-label><br>
                <b-avatar initials="AB" size="40"></b-avatar>
                <b-avatar initials="GT" size="40"></b-avatar>
                <b-avatar initials="ND" size="40"></b-avatar>
                <b-avatar initials="KJ" size="40"></b-avatar>
                <b-avatar initials="BT" size="40"></b-avatar>
                <b-avatar initials="JD" size="40"></b-avatar>

                <br><br>
                <b-label divider>Custom Color</b-label><br>
                <b-avatar initials="KJ" bgd="#E91E63" size="40"></b-avatar>

                <br><br>
                <b-label divider>Gravatar and Img url</b-label><br>
                <b-avatar gravatar="6bd69795f929a40746cdf026a03b703e" size="40"></b-avatar>
                <b-avatar url="https://i.imgur.com/6QKG2AG.png" size="40" shadow></b-avatar>

            </section>

            <section title="Spinner">

                <b-paper>
                <b-h1>Spinners</b-h1>

                Inline spinner <b-spinner></b-spinner>
                
                <br><br>

                <div style="position: relative; z-index: 0;">
                    <b-spinner-overlay show></b-spinner-overlay>
                    An overlay spinner. Sint ullamco sunt in officia sint. Ea ullamco ipsum anim fugiat anim officia eu sint. Laborum anim fugiat ipsum Lorem. Mollit et cupidatat incididunt pariatur mollit cillum ex ex.</div>

                </b-paper>

            </section>
            
            <section title="Tooltip">

                <b-paper><b-text tooltip="Testing">tooltips</b-text>

                    <b-h1>Tooltips</b-h1>

                    <p>Hover over me and wait a second to see a tooltip.
                        <b-tooltip>👋 Hey there!</b-tooltip>
                    </p>

                    <p>Hover over me and wait a 5 seconds to see a tooltip.
                        <b-tooltip delay=5>⏱ I took a bit longer to show</b-tooltip>
                    </p>

                    <p>Tooltips have a few settings. Hover over the info icon to see how <b-code>delay</b-code>, <b-code>target</b-code>, and <b-code>align</b-code> can changed for a different effect.
                        <b-icon name="info-circled"><b-tooltip delay=0 target="parent" align="top">Testing</b-tooltip></b-icon></p>

                    <p>A preset attribute called <b-code>label</b-code> can be used as a shorthand for this ^</p>

                    <div>
                        <b-btn clear empty lg icon="home"><b-tooltip label>Home</b-tooltip></b-btn>
                        <b-btn clear empty lg icon="person"><b-tooltip label>Account</b-tooltip></b-btn>
                        <b-btn clear empty lg icon="cog" tooltip="Settings"></b-btn>
                    </div>


                    <p>Tooltips use the Popover presenter to show the tooltip.</p>

                    <p><b-text tone="info">HTML<b-tooltip delay=500><b>Bold</b> text with an icon <b-icon name="blackstone"></b-icon></b-tooltip></b-text> is also supported in the <b-text tooltip="Testing">tooltips</b-text></p>

                </b-paper>

            </section>

            <section title="Empty State" view-id="Empty-State">
                
                <b-empty-state>Empty state</b-empty-state>

            </section>

            demo-elements-uploader

            <section title="Media">
                <h1>Media</h1>

                <h2>Audio</h2>
                <b-audio src="//media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4"></b-audio>

                <br>
                <b-hr short></b-hr>
                <br>

                <h2>Embed</h2>
                <b-embed url="//www.youtube.com/watch?v=sK1ODp0nDbM"></b-embed>

            </section>


            <section title="Misc">
                <h1>Misc</h1>

                <br><h2>Line/divider/hr</h2>

                <b-hr></b-hr>
                Vertical <b-hr vert></b-hr> Divider 
                <b-hr short></b-hr>

                

            </section>

            ${specialty}

            <section title="Docs">

                <b-paper>
                <b-h1>Element Docs</b-h1>

                <demo-markdown-docs .docs=${allDocs}></demo-markdown-docs>
                </b-paper>
            </section>
            

        </b-tabs-router>
    `}

})

export default customElements.get('demo-elements')