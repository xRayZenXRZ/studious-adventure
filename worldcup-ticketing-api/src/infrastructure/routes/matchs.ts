import GetMatchByIdHandler from "@infrastructure/handlers/Matchs/GetMatchByIdHandler";
import GetMatchHandler from "@infrastructure/handlers/Matchs/GetMatchHandler";
import { Hono } from "hono";
import GetMatchsByStageHandler from "@infrastructure/handlers/Matchs/GetMatchsByStageHandler";
import GetMatchsByStatusHandler from "@infrastructure/handlers/Matchs/GetMatchsByStatusHandler";


export const matchsRouter = new Hono();

matchsRouter.get("/", (c) => new GetMatchHandler().handle(c));
matchsRouter.get("/:id", (c) => new GetMatchByIdHandler().handle(c));
matchsRouter.get("/stages/:stage", (c) => new GetMatchsByStageHandler().handle(c));
matchsRouter.get("/status/:status", (c) => new GetMatchsByStatusHandler().handle(c));


