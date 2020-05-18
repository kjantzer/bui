import { LitElement, html, css } from 'lit-element'
import moment from 'moment'
import 'bui/presenters/tabs'
import 'bui/elements/icon'
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
    `}

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


            <section title="Buttons">
                <h1>Buttons</h1>

                <b-label divider>Default</b-label><br>
                <div>
                    <b-btn>Default</b-btn>
                    <b-btn color="blue">Blue</b-btn>
                    <b-btn color="red">Red</b-btn>
                    <b-btn color="green">Green</b-btn>

                    <b-hr vert></b-hr>

                    <b-btn icon="user">With Icon</b-btn>
                    <b-btn icon="cog"></b-btn>

                    <b-hr vert></b-hr>

                    <b-btn spin>With Spinner</b-btn>

                    <b-hr vert></b-hr>

                    <b-btn clear>Clear Style</b-btn>
                    <b-btn clear color="red">Clear Red</b-btn>

                </div>

                <br><br><b-label divider>Outline</b-label><br>
                <div>
                    <b-btn outline>Default</b-btn>
                    <b-btn outline color="blue">Blue</b-btn>
                    <b-btn outline color="red">Red</b-btn>
                    <b-btn outline color="green">Green</b-btn>
                </div>

                <br><br><b-label divider>Pill</b-label><br>
                <div>
                    <b-btn pill>Default</b-btn>
                    <b-btn pill color="blue">Blue</b-btn>
                    <b-btn pill color="red">Red</b-btn>
                    <b-btn pill color="green">Green</b-btn>
                </div>

                <br><br><b-label divider>Text style</b-label><br>
                <div>
                    <b-btn text>Default</b-btn>
                    <b-btn text color="blue">Blue</b-btn>
                    <b-btn text color="red">Red</b-btn>
                    <b-btn text color="green">Green</b-btn>

                    <b-hr vert></b-hr>

                    <b-btn text icon="user">With Icon</b-btn>
                    <b-btn text icon="cog"></b-btn>
                </div>

                <br><br><b-label divider>Stacked style</b-label><br>
                <div>
                    <b-btn text stacked icon="cog"><span>Settings</span></b-btn>
                    <b-btn text stacked icon="user"><span>Account</span></b-btn>
                    <b-btn text stacked icon="download"><span>Download</span></b-btn>
                    <b-btn text stacked icon="upload-cloud"><span>Upload</span></b-btn>
                </div>

                <br><br><b-label divider>Floating Action Button</b-label><br>
                <div>
                    <b-btn fab color="blue" icon="plus" style="position:relative;right:0;bottom:0"></b-btn>&nbsp;&nbsp;
                    <b-btn fab icon="cog" style="position:relative;right:0;bottom:0"></b-btn>&nbsp;&nbsp;
                    <b-btn fab color="gray" icon="download" style="position:relative;right:0;bottom:0"></b-btn>
                </div>

                <br><br>
                <h1>Button Group</h1>

                <b-btn-group>
                    <b-btn color="blue">Send</b-btn>
                    <b-btn color="blue" icon="down-open"></b-btn>
                </b-btn-group>

                <b-btn-group>
                    <b-btn pill color="green">Open</b-btn>
                    <b-btn pill color="green" icon="plus-circled"></b-btn>
                </b-btn-group>


            </section>


            <section title="Label">

                <h1>Label</h1>

                <b-label>A label</b-label><br><br>
                <b-label divider>A label with divider</b-label><br>
                <b-label divider="center">Centered divider</b-label><br>
                <b-label divider="right">Right divider</b-label>

                
                <br><br>
                
                <b-label filled>Filled</b-label>&nbsp;
                <b-label filled="black">Black</b-label>&nbsp;
                <b-label filled="blue">Blue</b-label>&nbsp;
                <b-label filled="red">Red</b-label>&nbsp;
                <b-label filled="orange">Orange</b-label>&nbsp;
                <b-label filled="green">Green</b-label>&nbsp;

                <br><br>

                <b-label muted filled>Filled</b-label>&nbsp;
                <b-label muted filled="black">Black</b-label>&nbsp;
                <b-label muted filled="blue">Blue</b-label>&nbsp;
                <b-label muted filled="red">Red</b-label>&nbsp;
                <b-label muted filled="orange">Orange</b-label>&nbsp;
                <b-label muted filled="green">Green</b-label>&nbsp;
                
                <br><br>
                
                <b-label outline>Outline</b-label>&nbsp;
                <b-label outline="black">Black</b-label>&nbsp;
                <b-label outline="blue">Blue</b-label>&nbsp;
                <b-label outline="red">Red</b-label>&nbsp;
                <b-label outline="orange">Orange</b-label>&nbsp;
                <b-label outline="green">Green</b-label>&nbsp;
                
                <br><br>

                <b-label badge>Badge</b-label>&nbsp;
                <b-label badge="black">Black</b-label>&nbsp;
                <b-label badge="blue">Blue</b-label>&nbsp;
                <b-label badge="red">Red</b-label>&nbsp;
                <b-label badge="orange">Orange</b-label>&nbsp;
                <b-label badge="green">Green</b-label>&nbsp;

                <br><br>

                <b-label badge="red" dot></b-label>&nbsp;
                <b-label badge="red">1</b-label>&nbsp;
                <b-label badge="red">24</b-label>&nbsp;


                <br><br>

                <br><br>
                <h1>Ribbon</h1>

                <b-paper overshadow style="height: 120px">
                    <b-ribbon>Ribbon</b-ribbon>
                    <b-empty-state>Default</b-empty-state>
                </b-paper>

                <b-paper overshadow style="height: 140px">
                    <b-ribbon pos="right" style="--color:var(--pink);font-size:1.4em;">Ribbon</b-ribbon>
                    <b-empty-state>Right, color and size change</b-empty-state>
                </b-paper>

            </section>

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
                <h1>Empty state</h1>

                <div style="height: 200px; position: relative">
                    <b-empty-state>No results</b-empty-state>
                </div>

            </section>

            <section title="Uploader" style="position: relative;">
                <h1>Uploader</h1>
                <b-uploader multiple></b-uploader>
                
                <div>Drag and drop a file here to upload<br><br></div>

                <b-btn onclick="this.previousElementSibling.previousElementSibling.chooseFile()">Or select a file</b-btn>
                
                <script>
                    let uploader = document.querySelector('b-uploader')
                    uploader.addEventListener('change', async e=>{

                        console.log('upload the file', uploader.files);

                        if( await Dialog.confirm({title: 'Upload?', msg: uploader.files.map(f=>f.name).join('<br>')}).modal() )
                            console.log('yes, upload');
                            // uploader.upload({url:'url-to-upload-to'})
                    })
                </script>
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
                
                <h2>Sub(dued) text</h2>
                <b-sub>Smaller subdued text</b-sub>

                <p>Normal text <b-sub>with smaller</b-sub></p>

                <br><h2>Timestamp</h2>
                <p>Element created <b-ts .date=${moment()}></b-ts></p>

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