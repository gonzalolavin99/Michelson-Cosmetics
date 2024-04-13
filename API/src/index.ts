import "reflect-metadata"
import app from './app'
import { AppDataSource } from "@database/db";


const PORT = 3000;

async function main ()  {

  await AppDataSource.initialize();
  app.get("/test", (_, res) => {
    console.log("Hola mundoooo!");
    res.send("Hola mundoooo jeje!");
  });
  
  app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
  });
  
}

main();

