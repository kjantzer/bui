// https://decembersoft.com/posts/promises-in-serial-with-array-reduce/
module.exports = (global||globalThis).Promise.series = (array, fn)=>{
    let i = 0;
    return array.reduce( async (previousPromise, next) => {
        
        let resp = await previousPromise;
        
        if( resp === false )
            return Promise.resolve()
        
        return fn(next, i++);

    }, Promise.resolve());
}