/*
    https://echarts.apache.org/en/option.html#title
*/
import { LitElement, html, css } from 'lit'
import colorScheme from '../../util/color-scheme'

customElements.define('b-echart', class extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
            height: 400px;
        }

        :host(:fullscreen) {
            background: var(--theme-bgd);
        }
    `

    constructor(){
        super()
        this.resize = this.resize.bind(this)
        this.onKeydown = this.onKeydown.bind(this)
        this.onKeyup = this.onKeyup.bind(this)

        // when this chart container size changes, resize the chart
        // NOTE: should we add a delay to resizing? Wait for resize even to stop for long enough?
        // only needed if we have perf issues
        this.resizeObserver = new ResizeObserver(entries=>{
            this.resize()
        })
    }

    resize(){ this.chart?.resize()}

    render(){return html`
        <slot></slot>
    `}

    onKeydown(e){
        if( e.which == 16 ) this.enableZoom(true)
    }

    onKeyup(e){
        if( e.which == 16 ) this.enableZoom(false)
    }

    // workaround for: https://github.com/apache/echarts/issues/10079
    enableZoom(enable=true){
        if( !this.dataZoom ) return
        // get value again cause use may have changed
        this.dataZoom = this.chart.getOption()?.dataZoom
        this.dataZoom?.forEach(zoom=>zoom.zoomLock = !enable)
        this.chart?.setOption({dataZoom: this.dataZoom})
    }

    connectedCallback(){
        super.connectedCallback()
        this.resizeObserver.observe(this)
        window.addEventListener('keydown', this.onKeydown);
        window.addEventListener('keyup', this.onKeyup);
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.resizeObserver.unobserve(this)
        window.removeEventListener('keydown', this.onKeydown);
        window.removeEventListener('keyup', this.onKeyup);
    }

    firstUpdated(){
        // dynamic import so code does not have to be loaded on initial page load
        // NOTE: this is heavy handed (loads full lib)
        // possible to tree shake and only load what is needed; will leave for future improvement
        import(/* webpackChunkName: "echarts" */'echarts').then(echarts => {
            this.echarts = echarts
            this.#setupChart()
        }).catch(error => 'An error occurred while loading echarts');   
    }

    #setupChart(){

        this.chart = this.echarts.init(this);

        this.chart.on('click', params=>{
            this.emitEvent('chart-click', params)
        })

        if( this._chartOptions ){
            this.chart.setOption(this._chartOptions)
            delete this._chartOptions
        }
    }

    set(options){

        // will be applied a different way
        this.dataZoom = options.dataZoom
        options.dataZoom?.forEach(zoom=>zoom.zoomLock = true)

        options.darkMode = colorScheme.isWhatTheme() == 'dark'

        if( !this.chart )
            this._chartOptions = options
        else
            this.chart?.setOption(options, { replaceMerge: ['series'] })
    }

})

export default customElements.get('b-echart')