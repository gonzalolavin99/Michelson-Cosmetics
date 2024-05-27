const nodemailer = require("nodemailer");
const envURLs = {
  //Conexion Local
  hostLocal: "localhost",
  portLocal: 5432,
  userNameLocal: "postgres",
  passLocal: "1423",
  databaseLocal: "jrmichelson",
  sslDbConfigLocal: false,
  apiKhipuLocal: "http://localhost:5185/",
  urlPaymentSuccessLocal: "http://localhost:5173/compra-exitosa",
  urlPaymentCancelLocal: "http://localhost:5173/compra-fallida",
  secretKeyLocal: "debJrMichelson",

  //Conexion Production
  hostProd:"ls-fd0fede4d688ea8a58b43a62ca31bd363bbd9918.cve2q220mboh.ca-central-1.rds.amazonaws.com",
  portProd: 5432,
  userProd: "jrmichelsondbadmin",
  passProd: "12345678",
  databaseProd: "dbjrmichelson",
  sslDbConfigProd: { rejectUnauthorized: false, requestCert: true },
  apiKhipuProd: "http://3.145.103.55/Khipu/",
  urlPaymentSuccessProd: "https://jrmichelson.cl/compra-exitosa",
  urlPaymentCanceProd: "https://jrmichelson.cl/compra-fallida",
  secretKeyProd: "pr0dS3rver4WSJrm1chelson",

  //Compartido
  urlPaymentNotify: "http://3.145.103.55/Khipu/notifyPurchase"
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
      sslConfig: envURLs.sslDbConfigProd,
    };
    conectionKhipu = {
      urlApi: envURLs.apiKhipuProd,
      urlPaymentCancel: envURLs.urlPaymentCanceProd,
      urlPaymentSuccess: envURLs.urlPaymentSuccessProd,
      urlPaymentNotify: envURLs.urlPaymentNotify,
    };

    env = { conectiondb, conectionKhipu, secretKey:envURLs.secretKeyProd, isLocal: false };
  } else {
    console.log("hola local");
    conectiondb = {
      host: envURLs.hostLocal,
      port: envURLs.portLocal,
      user: envURLs.userNameLocal,
      pass: envURLs.passLocal,
      databaseName: envURLs.databaseLocal,
      sslConfig: envURLs.sslDbConfigLocal,
    };
    conectionKhipu = {
      urlApi: envURLs.apiKhipuLocal,
      urlPaymentCancel: envURLs.urlPaymentCancelLocal,
      urlPaymentSuccess: envURLs.urlPaymentSuccessLocal,
      urlPaymentNotify: envURLs.urlPaymentNotify,
    };
    env = { conectiondb, conectionKhipu, secretKey:envURLs.secretKeyLocal, isLocal: true };
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

export const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "AKIAU6GD2ARQHORZ3YOX",
    pass: "BLjsRq1PxFrnbT8ThuPZHIf0l/7GehOkqj/b5T95D2LZ",
  },
});
