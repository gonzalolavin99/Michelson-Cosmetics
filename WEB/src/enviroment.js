const envURLs = {
    
    backendLocal: 'http://localhost:3000/',
    backendProd: 'http://35.183.244.41/',
    invalidEnvironment: "revisar.url.environment",

}

const env = () => {
  
    let url;
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "production") {
      console.log('hola prod')
      url = envURLs.backendProd;
    
    } else {
      console.log('hola local')
      url = envURLs.backendLocal;
    }
    return  url
  };


export const apiUrl = () => env();