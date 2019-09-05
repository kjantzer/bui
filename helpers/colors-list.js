import { LitElement, html, css } from 'lit-element'

customElements.define('b-list-of-colors', class extends LitElement{

    static get styles(){return css`
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 1em;
        }

        [group="default"] {
            grid-column: 1/5;
        }

        [group="default"] .colors {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 1em;
        }

        .color {
            border: 1px solid rgba(0,0,0,.12);
            padding: .5em;
            /* display: flex;
            justify-content: space-between;
            align-items: center; */
        }

        [num="900"] + [num] {
            margin-top: .5em;
        }
    `}

    connectedCallback(){
        super.connectedCallback()

        this.colors = []

        for( let sheet of document.styleSheets ){

            if( (sheet.href||'').match(/https/) ) continue

            for( let rule of sheet.cssRules ){

                if( rule.cssText.match(/:root { --color/) ){
                    
                    let matches = rule.cssText.match(/--.[^:)]+: (.[^;]+);/g)
                    let colors = {}
                    
                    matches.map(v=>{

                        let [str, name, num, color] = v.match(/--(.[^\d(A\d)]+)(?:-(.+))?: (.[^;]+);/)
                        let key = name + (num?'-'+num:'')
                        
                        if( num ){
                            colors[name] = colors[name] || {name: name, colors: []}
                            colors[name].colors.push({ key, name, num, color })
                        }else{
                            colors['default'] = colors['default'] || {name: 'default', colors: []}
                            colors['default'].colors.push({ key, name, num, color})
                        }
                            
                    })

                    this.colors = Object.values(colors)
                }
            }
        }
    }

    render(){return html`
        ${this.colors.map(g=>html`
            <div group="${g.name}">
                <h3>${g.name}</h3>
                <div class="colors">
                ${g.colors.map(c=>html`
                    <div num=${c.num} key="${c.key}" class="color" style="background-color: var(--${c.key});">
                        <div>${c.key}</div>
                        <!-- <b-sub>${c.num?c.color:''}</b-sub> -->
                    </div>
                `)}
                </div>
            </div>
        `)}
    `}

})