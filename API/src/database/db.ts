import { Person } from "@models/Person";
import { Purchase } from "@models/Purchase";
import { Ticket } from "@models/Ticket";
import { DataSource } from "typeorm";
import {conectiondb} from 'env';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: conectiondb().host,
    port:  conectiondb().port,
    username:  conectiondb().user,
    password:  conectiondb().pass,
    database:  conectiondb().databaseName,
    synchronize: true,
    logging: true,
    entities: [Ticket,Person,Purchase],
    subscribers: [],
    migrations: [],
    ssl:{rejectUnauthorized:false, requestCert:true}
})