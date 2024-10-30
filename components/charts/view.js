import { LitElement, html, css } from 'lit'
import './echart'
import colorScheme from 'bui/util/color-scheme'

export default class EChartView extends LitElement{

    static styles = css`
        :host {
            display: block;
            position:relative;
        }

        :host([hidden]) { display: none; }
    `
    
    // createChartData(){}

    get isDarkMode(){ return colorScheme.isWhatTheme() == 'dark' }

    render(){return html`
        <b-echart part="chart" @chart-click=${this.onChartClick}></b-echart>
    `}

    get chart(){ return this.$$('b-echart', true) }

    onCollChange(){
        this.refresh()
    }

    firstUpdated(){
        this.refresh()
    }

    fullscreen(){
        this.chart.requestFullscreen()
    }

    onChartClick(e){
        e.stopPropagation()
    }

    refresh(){
        if( this.createChartData )
            this.chart?.set(this.createChartData())
    }

}