import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { Ticket } from "@domain/entities/Ticket";
import { DataSource } from "typeorm";
import "reflect-metadata" //typeorm

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "worldcup_ticketing",
    password: "root",
    database: "worldcup_ticketing",
    synchronize: true,
    logging: false,
    entities: [City, Country, FifaCode, Match, Stadium, Team, Ticket]
})