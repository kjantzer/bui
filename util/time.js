
function secondsToTime(secs){
    var h = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var m = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var s = Math.ceil(divisor_for_seconds);

    var ms = Math.round((secs % 1) * 100)

    return {h, m, s, ms}
}

function msToTime(ms){
    return secondsToTime(ms/1000)
}

module.exports = {secondsToTime, msToTime}