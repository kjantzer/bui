
function capitalize(str){
    return str
    .split(' ')
    .map(s=>s[0]
    .toUpperCase()+s.substr(1))
    .join(' ')
}

function titleize(str){
    return capitalize(str.replace(/[\-_]/g, ' '))
}


module.exports = {capitalize, titleize}