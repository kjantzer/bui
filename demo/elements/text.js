import { html } from 'lit-element'

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

</b-paper>
<b-paper>
    <b-h1>Ribbon</b-h1>

    <b-paper overshadow style="height: 120px">
        <b-ribbon>Ribbon</b-ribbon>
        <b-empty-state>Default</b-empty-state>
    </b-paper>

    <b-paper overshadow style="height: 140px">
        <b-ribbon pos="right" style="--color:var(--pink);font-size:1.4em;">Ribbon</b-ribbon>
        <b-empty-state>Right, color and size change</b-empty-state>
    </b-paper>

</b-paper>
</section>
`