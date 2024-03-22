import View, {html, css} from '../presenters/view'
import docs from 'bui/util/piPico/README.md'
import PiPico from 'bui/util/piPico'
import 'bui/helpers/lit/selectors'

customElements.define('demo-components-pipico', class extends View{

    static title = 'Pi Pico'
    docs = docs

    static styles = [View.styles, css`
        
        output {
            color: white;
            background: black;
            padding: 10px;
            white-space: pre-wrap;
            height: 50vh;
            overflow-y: scroll;
            font-family: monospace;
            width: 100%;
            margin-bottom: 0;
            border: 1px black solid;
            border-bottom: none;
        }
    `]

    constructor(){
        super()
        this.pico = new PiPico({reconnect: false}) // see firstUpdated
        this.pico.on('connected', this.requestUpdate.bind(this))
        this.pico.on('read', this.onRead.bind(this))
    }

    async firstUpdated(){

        await this.pico.connect()

        if( this.pico.isConnected ){
            this.pico.write('.hi')
        }else
            this.output.textContent = `Connect to a Raspberry Pi Pico running Kalumajs`
    }

    renderDocsHeader(){ return html`

        <b-grid cols=1>
            <output></output>

            <form-control key="cmd" material="filled" label="" prefix="> " show="prefix" ?disabled=${!this.pico.isConnected}>
                <text-field placeholder="Type command" @submit=${this.sendCmd}></text-field>
            </form-control>

            <b-flex>
                <b-btn @click=${this.connect} ?disabled=${this.pico.isConnected}>Connect to Pi</b-btn>
            </b-flex>

        </b-grid>

        <br><br>
        <b-text-divider xl xbold>Docs</b-text-divider>

    `}

    get output(){ return this.$$('output', true) }
    get cmdInput(){ return this.$$('[key="cmd"]', true) }

    connect(){
        this.pico.requestPort().then(didConnect=>{
            if( !didConnect ) return
            this.output.textContent = ''
            this.pico.write('.hi')
            this.cmdInput.focus()
        })
    }

    onRead({value, from, rawVal}){
        this.output.textContent += rawVal
        this.output.scrollTop = this.output.scrollHeight
    }

    sendCmd(e){
        let cmd = e.currentTarget.value
        e.currentTarget.value = ''

        if( cmd === 'clear')
            return this.output.textContent = ''

        this.pico.write(cmd)
    }

})