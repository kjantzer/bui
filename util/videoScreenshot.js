// originally from: https://gist.github.com/westc/f6de681820d78df64c01e10bfd03f985
export default (path, {
    secs=.5,
    width=null
}={}) => {

    return new Promise((resolve,reject)=>{

        let video = document.createElement('video');

        video.onloadedmetadata = function() {
            
            if('function' === typeof secs )
                secs = secs(this.duration);
                
            else if( secs > 0 && secs < 1)
                secs = secs * this.duration

            this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
        };

        video.onseeked = function(e) {
            let canvas = document.createElement('canvas');
            let ratio = video.videoWidth / video.videoHeight;
            
            width = width || video.videoWidth;
            canvas.width = width;
            canvas.height = width / ratio;
            
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            resolve(canvas.toDataURL())
        };
        
        video.onerror = function(e) {
            reject()
        };

        video.src = path;

    })

}