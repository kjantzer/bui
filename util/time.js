/*
    # Time

    Return an object with time units: `{d, h, m, s, ms}

    `secondsToTime(seconds, opts)`
    `msToTime(ms, opts)` 

    #### Opts
    - `days` - include number of days (false will use just hours)
*/
function secondsToTime(secs, {days=true}={}){

    let d = 0
    let h = Math.floor(secs / (60 * 60));

    if( days && h > 24 ){
        d = Math.floor(h/24)
        h = Math.floor(h%24)
    }

    let divisor_for_minutes = secs % (60 * 60);
    let m = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let s = Math.ceil(divisor_for_seconds);

    let ms = Math.round((secs % 1) * 100)

    return {d, h, m, s, ms}
}

function msToTime(ms, opts){
    return secondsToTime(ms/1000, opts)
}

module.exports = {secondsToTime, msToTime}