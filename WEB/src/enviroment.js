const envURLs = {
    
    backendLocal: 'http://localhost:3000/',
    invalidEnvironment: "revisar.url.environment",

}

const env = () => {
  
    let url;
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "production") {
  
      if (process.env.REACT_APP_ENVIRONMENT === "production") {
        url = envURLs.invalidEnvironment;
      } else if (process.env.REACT_APP_ENVIRONMENT === "qa") {
        url = envURLs.invalidEnvironment;
      } else {
        url = envURLs.invalidEnvironment;
      }
    } else if (process.env.NODE_ENV === "development") {
      url = envURLs.backendLocal;
    } else {
      url = envURLs.invalidEnvironment;
    }
    return  url
  };


export const apiUrl = () => env();