import { html } from 'lit-element'

export default html`
<section title="Buttons">
<b-paper>
    <b-h1>Buttons</b-h1>

    <b-label divider>Default</b-label><br>
    <div>
        <b-btn>Default</b-btn>
        <b-btn color="theme">Theme</b-btn>
        <b-btn color="orange">Orange</b-btn>
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
        <b-btn outline color="theme">Theme</b-btn>
        <b-btn outline color="orange">Orange</b-btn>
        <b-btn outline color="red">Red</b-btn>
        <b-btn outline color="green">Green</b-btn>
    </div>

    <br><br><b-label divider>Pill</b-label><br>
    <div>
        <b-btn pill>Default</b-btn>
        <b-btn pill color="theme">Theme</b-btn>
        <b-btn pill color="orange">Orange</b-btn>
        <b-btn pill color="red">Red</b-btn>
        <b-btn pill color="green">Green</b-btn>
    </div>

    <br><br><b-label divider>Text style</b-label><br>
    <div>
        <b-btn text>Default</b-btn>
        <b-btn text color="theme">Theme</b-btn>
        <b-btn text color="orange">Orange</b-btn>
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
        <b-btn fab color="theme" icon="plus" style="position:relative;right:0;bottom:0"></b-btn>&nbsp;&nbsp;
        <b-btn fab icon="cog" style="position:relative;right:0;bottom:0"></b-btn>&nbsp;&nbsp;
        <b-btn fab color="gray" icon="download" style="position:relative;right:0;bottom:0"></b-btn>
    </div>

</b-paper>
<b-paper>
    <b-h1>Button Group</b-h1>

    <b-btn-group>
        <b-btn color="theme">Send</b-btn>
        <b-btn color="Theme" icon="down-open"></b-btn>
    </b-btn-group>

    &nbsp;

    <b-btn-group>
        <b-btn pill color="green">Open</b-btn>
        <b-btn pill color="green" icon="plus-circled"></b-btn>
    </b-btn-group>

</b-paper>
</section>
`