import { LitElement, html, css } from 'lit-element'
import moment from 'moment'
import Dialog from 'bui/presenters/dialog'
import 'bui/presenters/tabs'
import 'bui/elements/icon'
import 'bui/elements/text'
import 'bui/elements/btn'
import 'bui/elements/btn-group'
import 'bui/elements/spinner'
import 'bui/elements/spinner-overlay'
import 'bui/elements/uploader'
import 'bui/elements/paper'
import 'bui/elements/grid'
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
import defineFileIcon from 'bui/elements/file-icon'

import buttons from './elements/buttons'
import text from './elements/text'

defineFileIcon()

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

        b-grid > div {
            background: var(--theme-bgd);
            padding: .25em;
        }

        b-paper {
            margin-bottom: 1em;
        }

        b-tabs-router > section {
            position: relative;
            height: 100%;
            overflow: auto;
        }

        section:not([view-id="Paper"]) > b-paper {
            padding: var(--view-gutter);
        }

        section > b-paper ~ b-paper {
            margin-top: var(--view-gutter);
        }

        b-h1 {
            border-bottom: solid 4px var(--theme-bgd-accent);
            padding-bottom: .15em;
            margin-bottom: 1em;
        }

        b-h1 ~ b-h1 {
            margin-top: var(--view-gutter);
        }
    `}

    async onUpload(e){
        let uploader = e.currentTarget
        let filenames = uploader.files.map(f=>f.name)

        console.log('upload the file', uploader.files);

        if( await Dialog.confirm({
            title: 'Confirm Upload',
            msg: filenames.join('<br>'),
            btns: ['cancel', {label: 'Upload', color: 'theme'}]
        }).modal() )
            console.log('yes, upload');
    }

    render(){return html`
        <b-tabs-router path="elements/" key="elements" layout="left">

            <section title="Grid">
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

                <b-hr></b-hr>
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

                <b-hr></b-hr>
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

                <h1>Spinners</h1>

                Inline spinner <b-spinner></b-spinner>

                <br><br>

                <div style="position: relative; z-index: 0;">
                    <b-spinner-overlay show></b-spinner-overlay>
                    An overlay spinner. Sint ullamco sunt in officia sint. Ea ullamco ipsum anim fugiat anim officia eu sint. Laborum anim fugiat ipsum Lorem. Mollit et cupidatat incididunt pariatur mollit cillum ex ex.</div>

            </section>

            <section title="Empty State" view-id="Empty-State">

                <b-empty-state>Empty state</b-empty-state>

            </section>

            <section title="Uploader" style="position: relative;">
                <h1>Uploader</h1>
                <b-uploader multiple @change=${this.onUpload}></b-uploader>

                <div>Drag and drop a file here to upload<br><br></div>

                <b-btn onclick="this.previousElementSibling.previousElementSibling.chooseFile()">Or select a file</b-btn>
            </section>

            <section title="Timeline">
                <h1>Timeline</h1>

                <div>
                    <b-timeline-horz>
                        <div slot="date">Aug 10</div>
                        <b-icon name="ok-circled" slot="bubble" style="color: var(--green)"></b-icon>
                        <div>Timeline content</div>
                    </b-timeline-horz>
                    <b-timeline-horz>
                        <div slot="date">Aug 27</div>
                        <b-icon name="cancel-1" slot="bubble" style="color: var(--red)"></b-icon>
                        <div>Timeline content</div>
                    </b-timeline-horz>
                    <b-timeline-horz style="--b-timeline-line-display:none;">
                        <div slot="date">Sept 24</div>
                        <div>Timeline content</div>
                    </b-timeline-horz>
                </div>

            </section>

            <section title="Media">
                <h1>Media</h1>

                <h2>Audio</h2>
                <b-audio src="http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4"></b-audio>

                <br>
                <b-hr short></b-hr>
                <br>

                <h2>Embed</h2>
                <b-embed url="https://www.youtube.com/watch?v=sK1ODp0nDbM"></b-embed>

            </section>


            <section title="Misc">
                <h1>Misc</h1>

                <br><h2>Timestamp</h2>
                <p>The following timestamp was created <b-text bold><b-ts .date=${moment()}></b-ts></b-text> and will auto update every minute</p>

                <br><h2>Line/divider/hr</h2>

                <b-hr></b-hr>
                Vertical <b-hr vert></b-hr> Divider
                <b-hr short></b-hr>

                <br><h2>Code</h2>
                This is <b-code>inline code</b-code>

                <br><br>
                <b-code block>
                    This is a code block
                </b-code>

                <br><h2>Timer</h2>
                <b-timer running></b-timer>

                <br><h2>Carousel</h2>
                (This is a very basic implementation)<br><br>
                <b-carousel>
                    <div><b-paper color="gray" block>Slide 1</b-paper></div>
                    <div><b-paper color="gray" block>Slide 2</b-paper></div>
                    <div><b-paper color="gray" block>Slide 3</b-paper></div>
                </b-carousel>

            </section>


            <section title="Icons">
                <h1>Icons</h1>
                <b-icon-list cols="3"></b-icon-list>


                <br><br>
                <h1>File Icon</h1>
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
            </section>

        </b-tabs-router>
    `}

})

export default customElements.get('demo-elements')