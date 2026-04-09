import { Hono } from "hono";
import GetStadiumsHandler from "@infrastructure/handlers/stadiums/GetStadiumsHandler";
import GetStadiumsMatchsHandler from "@infrastructure/handlers/stadiums/GetStadiumMatchsHandler";
import GetStadiumByNameHandler from "@infrastructure/handlers/stadiums/GetStadiumByNameHandler";


export const stadiumsRouter = new Hono();

stadiumsRouter.get("/:name/matchs", (c) => new GetStadiumsMatchsHandler().handle(c));
stadiumsRouter.get("/:name", (c) => new GetStadiumByNameHandler().handle(c));
stadiumsRouter.get("/", (c) => new GetStadiumsHandler().handle(c));