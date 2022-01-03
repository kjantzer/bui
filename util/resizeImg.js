/*
    NOTE: consider https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh
*/
export default function resizeImg(file, {
    size=1440,
    quality=.7,
    enlarge=false,
}={}){ return new Promise(resolve=>{

    if( !file || !file.type || !['image/jpeg', 'image/png'].includes(file.type) )
        return resolve(file)
        
    // Load the image
    var reader = new FileReader();
    
    reader.onload = function(readerEvent){
        var image = new Image();
        
        image.onload = async function(imageEvent){

            // Resize the image
            var canvas = document.createElement('canvas'),
                width = image.width,
                height = image.height;

            if( size != false ){
                if( width > height ){
                    if( width > size || enlarge){
                        height *= size / width;
                        width = size;
                    }
                }else{
                    if( height > size || enlarge ){
                        width *= size / height;
                        height = size;
                    }
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            let resizedFile = await new Promise(resolve=>{
                canvas.toBlob(blob=>{
                    // NOTE: not sure I need this to be a "File", blob.name may be enough
                    resolve(new File([blob], file.name, {type:file.type, lastModified:new Date()}))
                }, file.type, quality);
            })

            resolve(resizedFile)
        }
        
        image.src = readerEvent.target.result;
    }

    reader.readAsDataURL(file);

})}