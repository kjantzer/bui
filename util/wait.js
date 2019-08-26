
export default (ts=0)=>{
    return new Promise(resolve=>{
        setTimeout(_=>{
            resolve()
        }, ts)
    })
}