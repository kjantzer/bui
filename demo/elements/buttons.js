import { html } from 'lit-element'
import docs from './docs'

export default html`
<section title="Buttons">
<b-paper>
    <b-h1>Buttons</b-h1>

    <demo-markdown-docs .docs=${docs.btn}></demo-markdown-docs>

    <b-grid cols=2 cols-mobile=1>
    
    <div colspan>
        <b-label divider>Default</b-label><br>
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

        <br><br>

        <b-btn clear>Clear Style</b-btn>
        <b-btn clear color="red">Clear Red</b-btn>

    </div>

    
    
    <div>
        <br><b-label divider>Outline</b-label><br>
        <b-btn outline>Default</b-btn>
        <b-btn outline color="theme">Theme</b-btn>
        <b-btn outline color="orange">Orange</b-btn>
        <b-btn outline color="red">Red</b-btn>
        <b-btn outline color="green">Green</b-btn>
    </div>

    
    <div>
        <br><b-label divider>Pill</b-label><br>
        <b-btn pill>Default</b-btn>
        <b-btn pill color="theme">Theme</b-btn>
        <b-btn pill color="orange">Orange</b-btn>
        <b-btn pill color="red">Red</b-btn>
        <b-btn pill color="green">Green</b-btn>
    </div>

    
    <div>
        <br><br><b-label divider>Text style</b-label><br>
        <b-btn text>Default</b-btn>
        <b-btn text color="theme">Theme</b-btn>
        <b-btn text color="orange">Orange</b-btn>
        <b-btn text color="red">Red</b-btn>
        <b-btn text color="green">Green</b-btn>

        <b-hr vert></b-hr>

        <b-btn text icon="user">With Icon</b-btn>
        <b-btn text icon="cog"></b-btn>
    </div>

    
    <div>
        <br><br><b-label divider>Stacked style</b-label><br>
        <b-btn text stacked icon="cog"><span>Settings</span></b-btn>
        <b-btn text stacked icon="user"><span>Account</span></b-btn>
        <b-btn text stacked icon="download"><span>Download</span></b-btn>
        <b-btn text stacked icon="upload-cloud"><span>Upload</span></b-btn>
    </div>

    
    <div>
        <br><br><b-label divider>Floating Action Button</b-label><br>
        <b-btn fab color="theme" icon="plus" style="position:relative;right:0;bottom:0"></b-btn>&nbsp;&nbsp;
        <b-btn fab icon="cog" style="position:relative;right:0;bottom:0"></b-btn>&nbsp;&nbsp;
        <b-btn fab color="gray" icon="download" style="position:relative;right:0;bottom:0"></b-btn>
    </div>

    <div>
        <br><br><b-label divider>Groups</b-label><br>
        <b-btn-group>
            <b-btn color="theme">Send</b-btn>
            <b-btn color="Theme" icon="down-open"></b-btn>
        </b-btn-group>

        &nbsp;

        <b-btn-group>
            <b-btn pill color="green">Open</b-btn>
            <b-btn pill color="green" icon="plus-circled"></b-btn>
        </b-btn-group>

        <b-btn-group>
            <b-btn clear>Settings</b-btn>
            <b-btn clear>Account</b-btn>
        </b-btn-group>
        
        <b-btn-group vert>
            <b-btn color="gray" icon="up-open"></b-btn>
            <b-btn color="gray" icon="down-open"></b-btn>
        </b-btn-group>
    </div>

    </b-grid>

</b-paper>

</section>
`