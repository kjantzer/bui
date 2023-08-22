/*
    Leaflet Map

    A very simply implementation - not ready for production

    https://leafletjs.com/reference.html
*/
import { LitElement, html, css } from 'lit'
import styles from './styles'
import CollMap from '../../util/collmap'

let LeafletJS = document.createElement('script')
LeafletJS.setAttribute('crossorigin', '')
LeafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
LeafletJS.integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
LeafletJS.addEventListener('load', e=>{
    window.dispatchEvent(new CustomEvent('leafletjs-ready'))
})

if( document.body )
    document.body.appendChild(LeafletJS)
else
    document.addEventListener('DOMContentLoaded', e=>{
        document.body.appendChild(LeafletJS)
    })

customElements.define('b-leaflet-map', class extends LitElement{

    static properties = {
        zoom: {type: Number},
        lat: {type: Number},
        lng: {type: Number}
    }

    static styles = [styles, css`
        :host {
            display: block;
            position:relative;
            width: 800px;
            height: 400px;
            overflow: hidden;
        }
        
        :host > div {
            height: 100%;
            width: 100%;
            background-color: var(--theme-bgd-accent);
        }
    `]

    constructor(){
        super()

        this.zoom = 13
        this.lng = -121.7949145
        this.lat = 42.5407115
        this._markers = new CollMap()
    }

    firstUpdated(){
        if( window.L ){
            this.setup()
        }else{
            window.addEventListener('leafletjs-ready', this.setup.bind(this), {once: true})
        }
    }

    setup(){
        this.map = L.map(this.$$('div')).setView([this.lat, this.lng], this.zoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '© OpenStreetMap'
        }).addTo(this.map);

        if( this.__markers )
            this.markers = this.__markers
    }

    render(){return html`
        <div></div>
    `}

    set markers(coords){

        if( !this.map ){
            this.__markers = coords
            return
        }else{
            delete this.__markers
        }

        this.clearMarkers()
        coords.forEach(coords=>{
            this.addMarker(coords)
        })

        // center on the one marker
        if( coords.length == 1 )
            this.map.setView(L.latLng(...coords))
            
    }

    clearMarkers(){
        this._markers.forEach(marker=>marker.remove())
    }

    addMarker(coords){
        let icon = L.icon({
            iconUrl: '/icons/2021-192.png', // FIXME:
            iconSize:     [24,24], // size of the icon
            // shadowSize:   [50, 64], // size of the shadow
            // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        
        let marker = L.marker(coords, {icon})
        this._markers.set(coords, marker)
        marker.addTo(this.map)
    }

})

export default customElements.get('b-leaflet-map')

