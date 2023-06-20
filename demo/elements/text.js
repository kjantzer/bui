import { html } from 'lit'
import 'bui/elements/numeral'
import dayjs from 'bui/helpers/day-js'
import 'bui/elements/ts'
import 'bui/elements/timer'
import 'bui/elements/text-divider'

export default html`
<section title="Text">
<!-- <b-paper> -->
    <b-text-divider lg xbold bottom pad=2 thick>Text</b-text-divider>

        <b-grid gap="2">

            <b-flex col gap=".5">
                <b-text-divider ucase sm xbold bottom>Sizes</b-text-divider>
                <b-text xs>Extra Small</b-text>
                <b-text sm>Small</b-text>
                <b-text>Normal</b-text>
                <b-text md>Medium</b-text>
                <b-text lg>Large</b-text>
                <b-text xl>Extra Large</b-text>
            </b-flex>

            <b-flex col gap=".5">
                <b-text-divider ucase sm xbold bottom>Weights</b-text-divider>
                <b-text lighter>Lighter</b-text>
                <b-text>Default</b-text>
                <b-text semibold>Semi-bold</b-text>
                <b-text bold>Bold</b-text>
                <b-text xbold>Extra Bold</b-text>
            </b-flex>

            <b-flex col gap=".5">
                <b-text-divider ucase sm xbold bottom>Accents</b-text-divider>
                <b-text>Normal</b-text>
                <b-text dim>Dim</b-text>
                <b-text muted>Muted</b-text>
                <b-text color="theme">Theme</b-text>
                <b-text gradient>Theme Gradient</b-text>
                <b-text gradient="reverse">Theme Gradient (Reverse)</b-text>
            </b-flex>

            <b-flex col stretch>
                <b-text-divider ucase sm xbold bottom>Speciality</b-text-divider>

                <b-text block>Normal text, in "block" mode. Labore consectetur quis laborum elit. Aliqua officia dolore nisi minim eu voluptate. Irure proident exercitation esse sunt est in deserunt velit elit commodo. In ut dolor incididunt ex. Adipisicing duis cillum laborum ex dolor do commodo consequat quis cupidatat ea.</b-text>
                
                <b-text block body>Body text. Labore consectetur quis laborum elit. Aliqua officia dolore nisi minim eu voluptate. Irure proident exercitation esse sunt est in deserunt velit elit commodo. In ut dolor incididunt ex. Adipisicing duis cillum laborum ex dolor do commodo consequat quis cupidatat ea.</b-text>
            </b-flex>

            <b-flex col gap=".5">

                <b-text-divider ucase sm xbold bottom>Other Variations</b-text-divider>

                <div>
                    <b-text bold>Bold</b-text> and <b-text italic>Italic</b-text>
                </div>
                
                <div><b-text tone="critical" italic>Critical Italic</b-text>, <b-text tone="warning">Warning text</b-text>, and <b-text tone="info">Info text</b-text></div>
                
                <div>Text with<b-text xs sup>Super</b-text> Text with<b-text xs sub>sub</b-text></div>
                
                <div style="width:160px"><b-text clip>Text with clipping enabled</b-text></div>

                <div style="width:200px"><b-text clip=2>More text with clipping enabled but this one is limited to 2 lines. BUI clip attribute is setup to support values 1-7</b-text></div>
                
                <div><b-text link>Link (hover me)</b-text></div>
                
                <div><b-text ucase>uppercase text</b-text>, <b-text lcase>LOWERCASE text</b-text>, and <b-text capitalize>capitalize text</b-text></div>

            </b-flex>

    </b-grid>

<!-- </b-paper> -->

<!-- <b-paper> -->
    <b-text-divider lg xbold bottom pad=2 thick>Text Divider</b-text-divider>
    <div>A subclass of <code>b-text</code>. The same attributes can be applied</div>

    <br><br>

    <b-text-divider>Text Divider</b-text-divider>
    
    <br><br>

    <b-text-divider>
        Text Divider
        <b-text slot="right">Right slot</b-text>
    </b-text-divider>

    <br><br>

    <b-text-divider thick lg bold>
        Text Divider
        <b-text slot="right">Right slot</b-text>
    </b-text-divider>

    <br><br>

    <b-text-divider center>Text Divider</b-text-divider>

<!-- </b-paper> -->

<!-- <b-paper> -->
    <b-text-divider lg xbold bottom pad=2 thick>Label</b-text-divider>
   
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


<!-- </b-paper> -->

<!-- <b-paper> -->
    <b-text-divider lg xbold bottom pad=2 thick>Speciality</b-text-divider>

    <b-grid cols="3" cols-mobile=1 gap=2>

        <div>
            <b-text-divider bottom block ucase sm xbold>Numeral</b-text-divider><br>

            <b-numeral num="13000"></b-numeral> &nbsp;&nbsp;
            <b-currency num="25000"></b-currency> &nbsp;&nbsp;
            <b-currency-acct num="-1247"></b-currency-acct> &nbsp;&nbsp;
            <b-bytes num="34554343323"></b-bytes>
        </div>
        
        <div>
            <b-text-divider bottom block ucase sm xbold>Timestamp</b-text-divider><br>
            Page rendered <b-text tone="info"><b-ts .date=${dayjs()}></b-ts></b-text>
            <b-text sm muted>(Updated every minute)</b-text>
        </div>

        <div>
            <b-text-divider bottom block ucase sm xbold>Timer</b-text-divider><br>
            <b-timer running></b-timer>
        </div>

        <div>
            <b-text-divider bottom block ucase sm xbold>Code</b-text-divider><br>
            
            This is <b-code>inline code</b-code>

            <br><br>
            <b-code block>
                This is a code block
            </b-code>
        </div>

        <div>
        
            <b-text-divider block bottom ucase sm xbold>Ribbon</b-text-divider><br>

            <b-paper overshadow style="height: 120px">
                <b-ribbon>Ribbon</b-ribbon>
                <b-ribbon pos="right" style="--color:var(--pink);font-size:1.4em;">Custom</b-ribbon>
            <!-- </b-paper> -->

        </div>

    </b-grid>

<!-- </b-paper> -->

</section>
`