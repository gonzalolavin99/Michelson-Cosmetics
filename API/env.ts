const envURLs = {
  //Conexion Local
  hostLocal: "localhost",
  portLocal: 5432,
  userNameLocal: "postgres",
  passLocal: "1423",
  databaseLocal: "jrmichelson",
  sslDbConfigLocal: false,

  apiKhipuLocal: "http://3.145.103.55/Khipu/",
  urlPaymentSuccessLocal: "http://localhost:5173/compra-exitosa",
  urlPaymentCancelLocal: "http://localhost:5173/compra-fallida",
  urlPaymentNotify:"http://3.145.103.55/Khipu/notifyPurchase",
  

  //Conexion Production
  hostProd:
    "ls-fd0fede4d688ea8a58b43a62ca31bd363bbd9918.cve2q220mboh.ca-central-1.rds.amazonaws.com",
  portProd: 5432,
  userProd: "jrmichelsondbadmin",
  passProd: "12345678",
  databaseProd: "dbjrmichelson",
  apiKhipuProd: "http://3.145.103.55/Khipu/",
  sslDbConfigProd: {},
  urlPaymentSuccessProd: "",
  urlPaymentCanceProd: "",
};

const getEnv = () => {
  let conectiondb: DbConectionSetting;
  let conectionKhipu: ConnectionKhipu;
  let env;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    console.log("hola prod");
    conectiondb = {
      host: envURLs.hostProd,
      port: envURLs.portProd,
      user: envURLs.userProd,
      pass: envURLs.passProd,
      databaseName: envURLs.databaseProd,
      sslConfig: envURLs.sslDbConfigProd
    };
    conectionKhipu = {
      urlApi: envURLs.apiKhipuProd,
      urlPaymentCancel: envURLs.urlPaymentCancelLocal,
      urlPaymentSuccess: envURLs.urlPaymentSuccessLocal,
      urlPaymentNotify: envURLs.urlPaymentNotify
    };

    env = { conectiondb, conectionKhipu };
  } else {
    console.log("hola local");
    conectiondb = {
      host: envURLs.hostLocal,
      port: envURLs.portLocal,
      user: envURLs.userNameLocal,
      pass: envURLs.passLocal,
      databaseName: envURLs.databaseLocal,
      sslConfig: envURLs.sslDbConfigLocal
    };
    conectionKhipu = {
      urlApi: envURLs.apiKhipuLocal,
      urlPaymentCancel: envURLs.urlPaymentCancelLocal,
      urlPaymentSuccess: envURLs.urlPaymentSuccessLocal,
      urlPaymentNotify: envURLs.urlPaymentNotify
    };
    env = { conectiondb, conectionKhipu };
  }
  return env;
};

export const env = () => getEnv();

export interface DbConectionSetting {
  host: string;
  port: number;
  user: string;
  pass: string;
  databaseName: string;
  sslConfig: {} | boolean;
}

export interface ConnectionKhipu {
  urlApi: string;
  urlPaymentSuccess: string;
  urlPaymentCancel: string;
  urlPaymentNotify: string;
}
