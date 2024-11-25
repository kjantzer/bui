import { LitElement, html, css } from 'lit'
import Text from './text'

customElements.define('b-text-diff', class extends Text{

    static styles = [super.styles, css`

        [added] {
            color: var(--green);
            background: var(--green-50);
        }

        [removed] {
            color: var(--red);
            background: var(--red-50);
        }
    `]

    computeDiff(){
        import('diff').then(diff=>{
            let {oldValue, newValue} = this.data

            oldValue = String(oldValue||'')
            newValue = String(newValue||'')

            // hacky: not sure I like this part
            if( this.opts?.csv ){
                let sep = typeof this.opts?.csv == 'string' ? this.opts?.csv : ','
                oldValue = String(oldValue).split(sep).sort().join(sep)
                newValue = String(newValue).split(sep).sort().join(sep)
            }
            
            let diffFn = {
                'chars': 'diffChars',
                'words': 'diffWords',
                'lines': 'diffLines',
                'sentences': 'diffSentences'
            }[this.opts?.type] || 'diffWords'
            diffFn = diff[diffFn] || diff.diffWords
            
            this.diff = diffFn(oldValue, newValue)

            this.requestUpdate()
            // this.diff = diff.diffWords(oldValue, newValue)
        })
    }
    
    set data(val){
        let oldVal = this.data
        this.__data = val
        
        this.computeDiff()
    
        this.requestUpdate('data', oldVal)
    }
    
    get data(){ return this.__data}
    
    render(){return html`
            
        ${this.diff?.map(diff=>html`
            <b-text inline ?added=${diff.added} ?removed=${diff.removed}>${diff.value}</b-text>
        `)}

    `}

})

export default customElements.get('b-text-diff')