
export default (file)=>{

    return new Promise(resolve=>{

        var reader = new FileReader();

        reader.onload = e=>{
            var text = reader.result;
            resolve(text)
        }

        reader.readAsText(file);
    
    })

}