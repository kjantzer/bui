import { LitElement, html, css } from 'lit'

customElements.define('b-global-seach-row', class extends LitElement{

    static listeners = {
        model: {
            'active': 'toggleActive',
            'scrollto': 'scrollIntoViewIfNeeded'
        }
    }

    static styles = css`
        :host {
            display: block;
            position:relative;
            /*border-bottom: solid 1px var(--theme-bgd-accent);*/
            margin: .25em;
            border-radius: .5em;
        }

        :host > * {
            padding:  .75em;
        }

        :host([active]) {
            background-color: var(--theme-bgd-accent);
        }
    `

    toggleActive(active){
        this.toggleAttribute('active', active)

        // dont scroll into view if we just moused over
        let ts = new Date().getTime() - (this._tsMouseOver||0)
    }

    render(){
        let resultRender = this.list?.host?.resultRender?.get(this.model.get('result_type'))
        let m = this.model

        if( resultRender ){

            // cache?
            if( typeof resultRender == 'string' ){
                let el = new (customElements.get(resultRender))()
                el.model = this.model
                return el
            }
            return resultRender(this.model)
        }

        if( m.get('shortcut') || m.get('shortcuts') )
            return html`
            <b-global-search-result-row-template sm icon=${m.get('icon')}>
                <b-text>
                    <b-text dim ?hidden=${!m.get('parent')}>${m.get('parent')} /</b-text>
                    <b-text bold>${m.get('title')}</b-text>
                </b-text>
            </b-global-search-result-row-template>
        `
        
        return html`
        <b-grid cols=1 gap=" ">
        <b-flex>
        
            <b-text>${this.get('label')||this.get('title')||this.get('name')}</b-text>

            ${this.get('type')=='searchSet'?html`
                <b-text>
                    <b-code keyboard>${this.get('val').key}</b-code>
                </b-text>
            `:''}

        </b-flex>
        <b-text dim sm italic ?hidden=${!this.get('val')?.description}>${this.get('val')?.description}</b-text>
        </b-grid>
        `
    }

    firstUpdated(){
        this.addEventListener('click', e=>{
            this.emitEvent('go-to-result')
        })

        this.addEventListener('mouseover', e=>{
            this._tsMouseOver = new Date().getTime()
            this.emitEvent('select-result', this.model)
        })
    }

})

export default customElements.get('b-global-seach-row')