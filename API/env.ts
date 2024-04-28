const envURLs = {
    //Conexion Local
    hostLocal: 'localhost',
    portLocal:5432,
    userNameLocal:'postgres',
    passLocal:'1423',
    databaseLocal: 'jrmichelson',

    //Conexion Production
    hostProd: 'ls-fd0fede4d688ea8a58b43a62ca31bd363bbd9918.cve2q220mboh.ca-central-1.rds.amazonaws.com',
    portProd:5432,
    userProd:'jrmichelsondbadmin',
    passProd:'12345678',
    databaseProd: 'dbjrmichelson'
 

}

export interface DbConectionSetting {
    host: string;
    port: number;
    user: string;
    pass: string;
    databaseName: string;
}

const env = () => {
  
    let conectiondb: DbConectionSetting;
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "production") {
        console.log("hola prod");
         conectiondb  = {
            host: envURLs.hostProd,
            port: envURLs.portProd,
            user: envURLs.userProd,
            pass: envURLs.passProd,
            databaseName: envURLs.databaseProd
        } 
     
      
    } else {
        console.log("hola local");
        conectiondb  = {
            host: envURLs.hostLocal,
            port: envURLs.portLocal,
            user: envURLs.userNameLocal,
            pass: envURLs.passLocal,
            databaseName: envURLs.databaseLocal
        } 
    }
    return  conectiondb;
  };


export const conectiondb = () : DbConectionSetting => env();