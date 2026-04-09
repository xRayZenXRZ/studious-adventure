import { Hono } from "hono";
import GetCountriesHandler from "@infrastructure/handlers/countries/GetCountriesHandler";
import GetCountryByCodeHandler from "@infrastructure/handlers/countries/GetCountryByCodeHandler";
import GetCountryCitiesHandler from "@infrastructure/handlers/countries/GetCountryCitiesHandler";


export const countriesRouter = new Hono();

countriesRouter.get("/", (c) => new GetCountriesHandler().handle(c));
countriesRouter.get("/:code", (c) => new GetCountryByCodeHandler().handle(c));
countriesRouter.get("/:code/cities", (c) => new GetCountryCitiesHandler().handle(c));