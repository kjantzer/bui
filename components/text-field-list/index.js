import { LitElement, html, css } from 'lit'
import range from '../../util/range'

customElements.define('b-text-field-list', class extends LitElement{

    static properties = {
        sortable: {type:Boolean, reflect: true},
        value: {type: String},
        maxLines: {type: Number},
        maxLineChars: {type: Number},
        maxChars: {type: Number},

        values: {type: Array}
    }

    static styles = css`
        :host {
            display: grid;
            gap: .5em;
            position:relative;
            max-width: var(--max-char);
        }

        main {
            display: grid;
            gap: .25em
        }

        :host(:not([numbered])) [slot="prefix"] {
            display: none;
        }

        :host([inline]) {
            max-width: none;
            --fc-border-radius: 5em;
        }

        :host([inline]) main {
            display: flex;
            flex-wrap: wrap;
        }

        .too-many-lines {
            width: 100%;
        }

        .too-many-lines ~ form-control {
            --bgd: rgba(244, 67, 54, .1);
        }

        :host(:not([sortable])) [name="drag_indicator"] {
            display: none;
        }

        [name="drag_indicator"] {
            padding: .5em;
            margin: -.5em -.75em -.5em 0;
        }

        .footer b-btn,
        .footer ::slotted(b-btn) {
            margin: -.5em 0;
        }
    `

    updated(changes){
        if( !changes.get('values') ){
            this.setVal()
        }
    }

    render(){return html`

        <main cols=1 @change=${this.onChange}>

            ${this.sortable?html`
            <b-sortable item=".keyword" @sort-changed=${this.save}></b-sortable>
            `:''}

            ${this.values?.map((val,i)=>html`

                ${this.maxLines&&i==this.maxLines?html`
                    <b-text italic color="red" class="too-many-lines">Too many lines</b-text>
                `:''}
                
                <form-control key="" material="filled" dense label="" .value=${val} class="keyword" show="prefix,suffix"
                    @submit=${this.onEnter}>
                    
                    <text-field placeholder="keyword" max=${this.maxLineChars} 
                        @pasted=${this.onPaste}
                        
                        @focus=${this.onFocus}
                        @blur=${this.onBlur}
                    ></text-field>
                    
                    <b-text slot="prefix">${i+1}.)&nbsp;</b-text>
                    <b-icon name="drag_indicator" slot="suffix"></b-icon>

                </form-control>
            `)}

        </main>


        <b-flex colspan class="footer">

            <b-flex>
                <b-text sm dim italic ?hidden=${!this.maxLines}>Max lines: ${this.maxLines}</b-text>
                <b-text sm dim italic ?hidden=${!this.maxLineChars}>Char per line: ${this.maxLineChars}</b-text>
                <b-text sm dim italic ?hidden=${!this.maxChars}>
                    Total chars: 
                    <b-text color=${this.value?.length>this.maxChars?'red':''}>${this.value?.length}</b-text> 
                    of ${this.maxChars}
                </b-text>
            </b-flex>

            <b-flex ?hidden=${!this.value} gap=" ">
                <b-btn sm clear @click=${this.clear}>Clear</b-btn>
                <slot name="meta-right"></slot>
            </b-flex>
            
        </b-flex>
    `}

    get controls(){ return Array.from(this.$$all('form-control')) }

    setVal({addLine=false}={}){

        let val = this.value?.split(`\n`) || []

        this.style.setProperty('--max-char', this.maxLineChars?this.maxLineChars+'ch':'')
        
        let lines = range(Math.max(val.length, 1))

        lines = lines.map((n,i)=>val[i]||'')
        lines = lines.map(s=>s.trim()) // remove whitespace

        // deupe? opt-in?
        // lines = Array.from(new Set(lines))

        if( addLine ){
            if( addLine === true || addLine < 0 )
                addLine = lines.length + 1

            lines.splice(addLine, 0, '')
        }

        this.values = lines

        if( addLine )
            setTimeout(()=>{
                this.controls?.[addLine]?.focus()
            })
    }

    focus(index){
        let controls = this.controls
        ;(controls[index] || controls[controls.length-1])?.focus()
    }

    onEnter(e){
        let index = this.controls.indexOf(e.currentTarget)
        
        if( !e.currentTarget.value?.trim() )
            return e.currentTarget.blur()

        if( this.maxLines && this.values.length >= this.maxLines ){
            throw new UIWarningError(`Only ${this.maxLines} lines allowed`, {target: e.currentTarget})
        }

        this.setVal({addLine: index+1})
        clearTimeout(this._changedTimeout)
    }

    onChange(e){
        e.stopPropagation()
        if( e.target.tagName == 'FORM-CONTROL' ){
            this.save(e)
            clearTimeout(this._changedTimeout)
        }
    }

    onFocus(e){
        clearTimeout(this._changedTimeout)

        let textField = e.currentTarget
        let max = this.maxLineChars

        if( this.maxChars ){
            let charRemaining = this.maxChars - this.value?.length

            if( !max || charRemaining < max )
                max = charRemaining + textField.value.length
        }

        textField.setAttribute('max', max)
    }

    onBlur(e){
        this.save(e)
    }

    save(e){

        clearTimeout(this._changedTimeout)

        let oldVal = this.value
        let controls = this.controls
        let vals = controls.map(c=>c.value.trim()).filter(s=>s)

        this.value = vals.join(`\n`) 

        this._changedTimeout = setTimeout(()=>{
            console.log('emit change');
            this.emitEvent('change', {vals, oldVal})
        },500)
    }

    clear(){
        this.value = ''
        this.emitEvent('change', {vals:[]})
    }

    onPaste(e){
        let {str, extras} = e.detail
        let index = this.controls.indexOf(e.currentTarget.parentElement)

        // TODO: pasting will bypass any maxchars set

        if( extras && index >= 0 ){
            let val = this.values
            val.splice(index+1, 0, ...extras.map(s=>s.trim()))
            this.value = val.join('\n')
            setTimeout(()=>{
                this.focus(index+extras.length)
            })
        }
        
    }

})

export default customElements.get('b-text-field-list')