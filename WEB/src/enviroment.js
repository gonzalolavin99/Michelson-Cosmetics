const envURLs = {
    
    backendLocal: 'http://localhost:3000/',
    backendProd: 'https://api.jrmichelson.cl/',
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