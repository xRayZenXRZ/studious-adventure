import CreateTicketHandler from "@infrastructure/handlers/tickets/CreateTicketHandler";
import GetTicketsByEmailHandler from "@infrastructure/handlers/tickets/GetTicketsByEmailHandler";
import GetTicketsSoldSeatsByMatch from "@infrastructure/handlers/tickets/GetTicketsSoldSeatsByMatch";
import { Hono } from "hono";

export const ticketsRouter = new Hono();

ticketsRouter.post("/", async (c) => new CreateTicketHandler().handle(c));
ticketsRouter.get("/:email", async (c) => new GetTicketsByEmailHandler().handle(c));
ticketsRouter.get("/seats/:matchId", async (c) => new GetTicketsSoldSeatsByMatch().handle(c));
