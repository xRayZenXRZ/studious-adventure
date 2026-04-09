import { AppDataSource } from "@infrastructure/database/AppDataSource";//typeorm
import { app } from "./infrastructure/app";
import "reflect-metadata" //typeorm

AppDataSource.initialize().then(() => {
    console.log("Database connected");
    console.log(`Server running on port ${process.env.PORT}`);
}).catch((err) => {
    console.error("Can't connect database" + err);
    console.log(err)
    process.exit(1);
});

export default {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    fetch: app.fetch
}