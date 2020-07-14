/*
    Blackstone Specific ID path

    id = 'd0af'
    path = 'd/0/d0af'
*/
module.exports = id=>{
    id = String(id)
    if( !id ) throw new Error('Cannot make path from id: ', id)
    return `${id[0]}/${id[1]}/${id}`
}