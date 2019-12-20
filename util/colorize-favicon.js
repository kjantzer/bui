// https://blog.roomanna.com/09-24-2011/dynamically-coloring-a-favicon

let favicon

export default (color=false, method="lighten")=>{

    let icon = document.querySelector("link[rel='icon']")

    if( !favicon ){;
        favicon = icon.cloneNode()
    }

    if( !color ){
        icon.type = favicon.type
        icon.href = favicon.href
        return
    }

    function onImageLoaded() {
        let canvas = document.createElement("canvas");
        let size = img.naturalHeight
        let radius = size / 2

        canvas.width = size;
        canvas.height = size;
        
        let context = canvas.getContext("2d");
        
        context.drawImage(img, 0, 0);
        context.globalCompositeOperation = method;
        context.fillStyle = color;
        context.arc(radius, radius, radius, 0, 2 * Math.PI, false);
        context.fill();

        icon.type = "image/x-icon";
        icon.href = canvas.toDataURL();
    };

    var img = document.createElement("img");
    img.addEventListener("load", onImageLoaded);
    img.src = favicon.href;
}