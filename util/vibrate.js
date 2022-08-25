const patterns = {
    denied: [350,30,100],
    error: [350,30,100]
}

export default function vibrate(patt){

    // enable vibration support
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if( patterns[patt] )
        patt =  patterns[patt]
        
    if (navigator.vibrate)
        navigator.vibrate(patt);
}