import { GetHealthHandler } from "@infrastructure/handlers/home/GetHealthHandler";
import { GetHomeHandler } from "@infrastructure/handlers/home/GetHomeHandler";
import { Hono } from "hono";

export const home_healthRouter = new Hono();

home_healthRouter.get("/", (c) => new GetHomeHandler().handle(c));
home_healthRouter.get("/health", (c) => new GetHealthHandler().handle(c));
