import { Hono } from "hono";
import GetCityHandler from "@infrastructure/handlers/cities/GetCityHandler";
import GetCityMatchsHandler from "@infrastructure/handlers/cities/GetCityMatchsHandler";
import GetCityByNameHandler from "@infrastructure/handlers/cities/GetCityByNameHandler";


export const citiesRouter = new Hono();

citiesRouter.get("/", (c) => new GetCityHandler().handle(c));
citiesRouter.get("/:name/matchs", (c) => new GetCityMatchsHandler().handle(c))
citiesRouter.get("/:name", (c) => new GetCityByNameHandler().handle(c));
