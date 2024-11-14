/*
    # readFile

    Read a file on the client (such as a text or csv)
*/
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