
export default (file, format='Text')=>{

    return new Promise((resolve, reject)=>{

        var reader = new FileReader();

        reader.onload = e=>{
            resolve(reader.result)
        }

        if( reader['readAs'+format] ) 
            reader['readAs'+format](file)
        else
            reject('Invalid format requested')
    
    })

}