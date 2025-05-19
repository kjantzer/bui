import TabsView from '../../presenters/tabs'
import RouterController from './router-controller'

// DEPRECATED: use router-controller instead
customElements.define('b-tabs-router', class extends TabsView {

	routeController = new RouterController(this, {rootPath: this.getAttribute('path')})

})

export default customElements.get('b-tabs-router')