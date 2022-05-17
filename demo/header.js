import { LitElement, html, css } from 'lit'
import 'bui/elements/text'
import AppInstaller from 'bui/app/installer'
import Menu from 'bui/presenters/menu'
import device, {colorScheme} from 'bui/util/device'
import 'bui/elements/logo'

window.AppInstaller = AppInstaller

window.colorScheme = colorScheme

const themeAccents = [
    {label: 'Default', val:''},
    {label: 'Blue', val:'blue'},
    {label: 'Green', val: '27ae60'},
    {label: 'Pink', val:'pink'},
    {label: 'Purple', val:'deep-purple'},
    {label: 'Orange', val:'orange'},
    {label: 'Deep Orange', val:'deep-orange'},
    {label: 'Teal', val:'teal'},
    {label: 'Red', val: 'red-600'},
    {label: 'Cyan', val:'cyan'},
    {label: 'Indigo', val: 'indigo-A200'},
    {label: 'Mint', val: '00b894'}
]

customElements.define('demo-header', class extends LitElement{

    constructor(){
        super()

        device.applyClasses()

        // document.documentElement.toggleAttribute('dark', this.isDarkMode)
        colorScheme.apply({colorizeFaviconComposition: 'source-in'})

        AppInstaller.canInstallPromise.then(e=>this.update())
    }

    static get styles(){return css`
        :host {
            display: flex;
            align-items: center;
            position:relative;
            z-index: 100;
            height: 48px;
            -webkit-app-region: drag;

            box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -2px;
        }

        bui-logo {
            margin: 0 .75rem;
            --size: 2.2em;
            /* color: var(--theme-chosen); */
        }

        .right {
            margin-left: auto;
            padding-right: 1em;
        }

        @media (max-width: 599px) {
            b-text {
                display: none;
            }
        }
    `}

    render(){return html`

        <bui-logo></bui-logo>

        <b-text md>
            Blackstone <b-text xbold>UI</b-text>
        </b-text>

        <div class="right">
            
            <b-btn text icon="install_desktop" color="theme" lg @click=${AppInstaller.install} ?hidden=${!AppInstaller.canInstall}>Install</b-btn>

            <b-btn text lg icon="invert-colors-on" title="Change theme" @click=${this.changeTheme}></b-btn>
            <b-btn text lg icon="github" title="Go to GitHub repo" href="https://github.com/kjantzer/bui"></b-btn>
            
        </div>
    `}

    get isDarkMode(){
        return localStorage.getItem('theme') == 'dark'
    }

    async changeTheme(e){
        let menu = [
            {divider: "Theme"},
            {label: 'System', val: 'system', theme:true},
            {label: 'Light', val: 'light', theme:true},
            {label: 'Dark', val: 'dark', theme:true},
            {divider: 'Accent'}
        ]

        menu = menu.concat(themeAccents)

        let selected = await new Menu(menu, {
            multiple: false,
            selected: [colorScheme.theme, colorScheme.accent]
        }).popover(e.currentTarget, {adjustForMobile:{type: 'actionsheet'}})

        if( !selected ) return
        
        if( selected.theme )
            colorScheme.setTheme(selected.val)
        else
            colorScheme.setAccent(selected.val)
        

    }

})

export default customElements.get('demo-header')