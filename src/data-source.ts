import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Role } from "./entity/Role"
import { Status } from "./entity/Status"
import { TransactionType } from "./entity/TransactionType"
import { Wallet } from "./entity/Wallet"
import { Transaction } from "./entity/Transaction"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Role, Status, Wallet, TransactionType, Transaction],
    migrations: [],
    subscribers: [],
})
