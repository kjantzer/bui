
export default function imgToDataUrl(file, {
    type='image/jpeg',
    quality=0.7,
    maxSize=false,
}={}){

    return new Promise((resolve, reject)=>{

        let reader = new FileReader();

        if(!file.type.match(/image.*/)){
            return reject(`File is not an image: ${file.type}`);
        }

        reader.onload = function (readerEvent) {
            var image = new Image();
            
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    width = image.width,
                    height = image.height;
                
                // limit size if requested
                if( maxSize ){
                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                
                var dataUrl = canvas.toDataURL(type, quality);

                resolve(dataUrl)
            }
            
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    })

}