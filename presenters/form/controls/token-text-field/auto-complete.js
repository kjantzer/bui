import Menu from 'menu'

let OpenMenu;
let lastWord;

function autoComplete(e, word, items=[], opts={}){

    if( word == lastWord )
        return

    lastWord = word

    opts = Object.assign({
        minLength: 3,
        allResults: '@' // set to null to disable feature
    }, opts)

    autoComplete.close()

    if( (word && word.length >= opts.minLength) || opts.allResults === word ){

        let matchingWord = word

        if( word == opts.allResults )
            matchingWord = false
        // to allow the user to filter allResults, we must remove the allResults key from the word
        else if( opts.allResults )
            word = word.replace( new RegExp('^'+opts.allResults), '' )

        autoComplete.isOpen = true

        OpenMenu = new Menu(items,{
            autoSelectFirst: true,
            search: false,
            matching: matchingWord,
        })

        OpenMenu.popOver(e, {maxHeight: '40vh'})
        .then(selected=>{
            if( selected )
                opts.onSelect&&opts.onSelect(selected)
        })
    }
}

autoComplete.close = function(){
    autoComplete.isOpen = false
    
    if( OpenMenu ){
        OpenMenu.resolve(false)
        OpenMenu.close()
        OpenMenu = null
        lastWord = null
    }
}

export default  autoComplete