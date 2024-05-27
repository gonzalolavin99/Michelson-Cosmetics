const envURLs = {
  //Ambiente Prod
  backendProd: "https://api.jrmichelson.cl/",
  userApiProd: "admin",
  passApiProd: "jrApiMichelsonEnAmbienteProdPanConMermelada",

  //Ambiente Local
  backendLocal: "http://localhost:3000/",
  userApiLocal: "admin",
  passApiLocal: "jrMichelsonApi123AmbienteLocal",



  invalidEnvironment: "revisar.url.environment",
};

const env = () => {
  let apiConexion;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    console.log("hola prod");
    apiConexion =  {
      url : envURLs.backendProd,
      user: envURLs.userApiProd,
      pass: envURLs.passApiProd
    }
    
  } else {
    console.log("hola local");
    apiConexion =  {
      url : envURLs.backendLocal,
      user: envURLs.userApiLocal,
      pass: envURLs.passApiLocal
    }
  }
  return apiConexion;
};

export const apiConexion = () => env();
