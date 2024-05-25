import "reflect-metadata"
import app from './app'
import { AppDataSource } from "@database/db";


const PORT = 3000;

async function main ()  {

  await AppDataSource.initialize();
 
  app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
  });
  
}

main();

