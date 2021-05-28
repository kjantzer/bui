// https://blog.roomanna.com/09-24-2011/dynamically-coloring-a-favicon

let favicon

export default (color=false, method="hue", {
    shape='rounded', // square, circle, rounded (square)
    radius= 6 // for "rounded" shape
}={})=>{

    let icon = document.querySelector("link[rel='icon']")

    if( !icon ) return

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

        canvas.width = size;
        canvas.height = size;
        
        let context = canvas.getContext("2d");
        
        context.drawImage(img, 0, 0);
        context.globalCompositeOperation = method;
        context.fillStyle = color;

        if( shape == 'circle' ){
            radius = size / 2
            context.arc(radius, radius, radius, 0, 2 * Math.PI, false);
        }
        // plain square
        else if( shape == 'square' ){
            context.fillRect(0, 0, size, size);
        }
        // square with radius
        else {
            context.beginPath();
            context.moveTo(size,size);
            context.arcTo(0,size,0,0,radius);
            context.arcTo(0,0,size,0,radius);
            context.arcTo(size,0,size,size,radius);
            context.arcTo(size,size,0,size,radius);
        }

        context.fill();

        icon.type = "image/x-icon";
        icon.href = canvas.toDataURL();
    };

    var img = document.createElement("img");
    img.addEventListener("load", onImageLoaded);
    img.src = favicon.href;
}