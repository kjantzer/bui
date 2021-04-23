import { html } from 'lit-element'
import 'bui/elements/numeral'
import dayjs from 'bui/helpers/day-js'
import 'bui/elements/ts'
import 'bui/elements/timer'

export default html`
<section title="Text">
<b-paper>
    <b-h1>Text</b-h1>
    
    <div><b-text muted>Muted</b-text>, <b-text muted sm>Muted Small</b-text>, <b-text muted xs>Muted Extra Small</b-text></div>

    <div>
        <b-text md>Medium</b-text>, <b-text lg>Large</b-text>, <b-text xl>Extra Large</b-text>
    </div>

    <div>
        <b-text bold>Bold</b-text>, <b-text italic>Italics</b-text>
    </div>
    
    <div><b-text tone="critical" italic>Critical Italic</b-text>, <b-text tone="warning">Warning text</b-text>, and <b-text tone="info">Info text</b-text></div>
    
    <div>Text with<b-text xs sup muted>Super</b-text> Text with<b-text xs sub muted>sub</b-text></div>
    
    <div style="width:160px"><b-text clip>Text with clipping enabled</b-text></div>
    
    <div><b-text link>Link (hover me)</b-text></div>
    
    <div><b-text ucase>uppercase text</b-text>, <b-text lcase>LOWERCASE text</b-text>, and <b-text capitalize>capitalize text</b-text></div>

</b-paper>
<b-paper>
    <b-h1>Label</b-h1>
   
    <b-grid cols=2 mobile-cols=1>

    <div>
    <b-label filled>Filled</b-label>&nbsp;
    <b-label filled="gray">Gray</b-label>&nbsp;
    <b-label filled="black">Black</b-label>&nbsp;
    <b-label filled="blue">Blue</b-label>&nbsp;
    <b-label filled="red">Red</b-label>&nbsp;
    <b-label filled="orange">Orange</b-label>&nbsp;
    <b-label filled="green">Green</b-label>&nbsp;

    <br><br>

    <b-label muted filled>Filled with muted</b-label>&nbsp;
    <b-label muted filled="black">Black</b-label>&nbsp;
    <b-label muted filled="blue">Blue</b-label>&nbsp;
    <b-label muted filled="red">Red</b-label>&nbsp;
    <b-label muted filled="orange">Orange</b-label>&nbsp;
    <b-label muted filled="green">Green</b-label>&nbsp;
    
    </div>

    <div>
    
    <b-label outline>Outline</b-label>&nbsp;
    <b-label outline="black">Black</b-label>&nbsp;
    <b-label outline="blue">Blue</b-label>&nbsp;
    <b-label outline="red">Red</b-label>&nbsp;
    <b-label outline="orange">Orange</b-label>&nbsp;
    <b-label outline="green">Green</b-label>&nbsp;
    
    <br><br>

    <b-label muted outline>Outline with muted</b-label>&nbsp;
    <b-label muted outline="black">Black</b-label>&nbsp;
    <b-label muted outline="blue">Blue</b-label>&nbsp;
    <b-label muted outline="red">Red</b-label>&nbsp;
    <b-label muted outline="orange">Orange</b-label>&nbsp;
    <b-label muted outline="green">Green</b-label>&nbsp;

    </div>

    <div>
        <b-label filled xs>X-Small</b-label>&nbsp;
        <b-label filled sm>Small</b-label>&nbsp;
        <b-label filled>Default</b-label>&nbsp;
        <b-label filled lg>Large</b-label>&nbsp;
        <b-label filled xl>X-Large</b-label>&nbsp;
    </div>

    <div>
        <b-label badge>Badge</b-label>&nbsp;
        <b-label badge="black">Black</b-label>&nbsp;
        <b-label badge="blue">Blue</b-label>&nbsp;
        <b-label badge="red">Red</b-label>&nbsp;
        <b-label badge="orange">Orange</b-label>&nbsp;
        <b-label badge="green">Green</b-label>&nbsp;
        &nbsp;&nbsp;&nbsp;
        <b-label badge="red">1</b-label>&nbsp;
        <b-label badge="red">24</b-label>&nbsp;
        <b-label badge="red" dot></b-label>&nbsp;
    </div>


    <div>

        <b-label badge xs>X-Small</b-label>&nbsp;
        <b-label badge sm>Small</b-label>&nbsp;
        <b-label badge>Default</b-label>&nbsp;
        <b-label badge lg>Large</b-label>&nbsp;
        <b-label badge xl>X-Large</b-label>&nbsp;

    </div>

    </b-grid> 

    <br><br>

    <b-label>A label</b-label><br><br>
    <b-label divider>A label with divider</b-label><br>
    <b-label divider="center">Centered divider</b-label><br>
    <b-label divider="right">Right divider</b-label>


</b-paper>

<b-paper>
    <b-h1>Speciality</b-h1>

    <b-grid cols="3" cols-mobile=1>

        <div>
            <b-text block ucase muted bold>Numeral</b-text><b-hr pad="xs"></b-hr>

            <b-numeral>130000000</b-numeral> &nbsp;&nbsp;
            <b-numeral>25000</b-numeral> &nbsp;&nbsp;
            <b-bytes>34554343323</b-bytes>
        </div>
        
        <div>
            <b-text block ucase muted bold>Timestamp</b-text><b-hr pad="xs"></b-hr>
            Page rendered <b-text tone="info"><b-ts .date=${dayjs()}></b-ts></b-text>
            <b-text sm muted>Updated every minute</b-text>
        </div>

        <div>
            <b-text block ucase muted bold>Timer</b-text><b-hr pad="xs"></b-hr>
            <b-timer running></b-timer>
        </div>

        <div>
            <b-text block ucase muted bold>Code</b-text><b-hr pad="xs"></b-hr>
            
            This is <b-code>inline code</b-code>

            <br><br>
            <b-code block>
                This is a code block
            </b-code>
        </div>

        <div>
        
            <b-text block ucase muted bold>Ribbon</b-text><b-hr pad="xs"></b-hr>

            <b-paper overshadow style="height: 120px">
                <b-ribbon>Ribbon</b-ribbon>
                <b-ribbon pos="right" style="--color:var(--pink);font-size:1.4em;">Custom</b-ribbon>
            </b-paper>

        </div>

    </b-grid>

</b-paper>

</section>
`