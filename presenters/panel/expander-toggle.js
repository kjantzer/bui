/*
    # Panel Expander

    Allows for a panel to toggle between small pane and full window

    > TODO: needs more work to have more dynamic settings; makes assumptions right now
*/
import ToggleView from '../../elements/toggle-view'

customElements.define('b-panel-expander-toggle', class extends ToggleView {

    constructor(){
        super()
        this.type = 'expand'
    }

    firstUpdated(){
        this.applyParent()
    }

    // TODO: assumes expanded by default; should detect what is first
    get isExpanded(){ return this.active ? false : true }

    apply(){
        super.apply()
        this.applyParent()
    }

    applyParent(){
        this.parent.toggleAttribute('expanded', this.isExpanded)

        // TODO: should be settings (test for default value on init?)
        this.parent.panel.width = this.isExpanded ? '100%' : '600px'
        this.parent.panel.anchor = this.isExpanded ? 'bottom' : 'right'
        this.parent.panel.animation = this.isExpanded ? 'rise' : 'slide'
    }
})