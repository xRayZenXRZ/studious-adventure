import CreateTicketHandler from "@infrastructure/handlers/tickets/CreateTicketHandler";
import GetTicketsByEmailHandler from "@infrastructure/handlers/tickets/GetTicketsByEmailHandler";
import { Hono } from "hono";

export const ticketsRouter = new Hono();

ticketsRouter.post("/", async (c) => new CreateTicketHandler().handle(c));
ticketsRouter.get("/:email", async (c) => new GetTicketsByEmailHandler().handle(c));
