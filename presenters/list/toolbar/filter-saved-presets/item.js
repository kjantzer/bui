import { LitElement, html, css } from 'lit'
import {Menu, Dialog} from 'bui'
import {edit} from './models'

customElements.define('b-list-filter-set-item', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        b-grid > b-grid {
            align-self: center;
        }

        b-flex:last-child {
            margin-right: -.5em;
        }

        b-btn {
            align-self: center;
        }
    `

    render(){return html`
        <b-grid cols="1,auto" gap=".5">

            <b-grid cols=1 gap="0">
                <b-text>
                    ${this.get('name')}
                </b-text>
                <b-text sm italic dim ?hidden=${!this.get('summary')}>${this.get('summary')}</b-text>
            </b-grid>

            <b-flex gap=" ">
                <b-label sm muted filled=${this.get('type')=='shared'?'green':'blue'}
                        title=${this.get('type')} 
                        ?hidden=${this.get('type')=='private'}>${this.get('type').substr(0,1).toUpperCase()}</b-label>
                    
                <b-btn clear pill sm icon="settings" @click=${this.settings}></b-btn>
            </b-flex>

        </b-grid>
    `}

    async settings(e){
        e.stopPropagation()

        let menu = []

        if( this.willTakeAction('list:preset:edit').allowed )
            menu.push({label: 'Edit', fn: 'edit'})

        if( this.willTakeAction('list:preset:delete').allowed )
            menu.push('-', {label: 'Delete', fn: 'destroy'})

        await new Menu([
            ...menu,
            {text: html`
                Created by <c-user-avatar nameonly uid=${this.model.get('uid')}></c-user-avatar>
                <br><b-ts .date=${this.model.get('ts_created')}></b-ts>`}
        ], {handler: this}).popOver(e.currentTarget)
    }

    async edit(e){
        this.emitEvent('close-popover')
        await edit(this.model)
    }

    async destroy(e){
        if( await Dialog.confirmDelete().popOver(this) ){
            await this.model.destroySync()
            this.parentElement.parentElement.parentElement.remove()
        }
    }

})

export default customElements.get('b-list-filter-set-item')