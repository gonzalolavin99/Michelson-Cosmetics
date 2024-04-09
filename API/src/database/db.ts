
import { Person } from "@models/Person";
import { Purchase } from "@models/Purchase";
import { Ticket } from "@models/Ticket";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Ticket,Person,Purchase],
    subscribers: [],
    migrations: [],
})