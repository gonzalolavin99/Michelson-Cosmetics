import { Person } from "@models/Person";
import { Purchase } from "@models/Purchase";
import { Ticket } from "@models/Ticket";
import { DataSource } from "typeorm";
import {env} from 'env';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env().conectiondb.host,
    port:  env().conectiondb.port,
    username:  env().conectiondb.user,
    password:  env().conectiondb.pass,
    database: env().conectiondb.databaseName,
    synchronize: true,
    logging: true,
    entities: [Ticket,Person,Purchase],
    subscribers: [],
    migrations: [],
    ssl: env().conectiondb.sslConfig
})