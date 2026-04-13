import { Context } from "hono";
import { CreateTicketSchema } from "./CreateTicketSchema";
import { HTTPException } from "hono/http-exception";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { TicketService } from "@application/services/TicketService";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { ConflictError } from "@domain/errors/ConflictError";
import { ValidationError } from "@domain/errors/ValidationError";

const ticketService = new TicketService(AppDataSource.getRepository(Ticket), AppDataSource.getRepository(Match));

export default class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json();
        try {
            const res = CreateTicketSchema.safeParse(body);

            if (!res.success) throw new HTTPException(400, { message: "Can't create ticket (wrong or missing values)" });

            const data = await ticketService.order(
                res.data.matchId,
                res.data.seat,
                res.data.customer
            );

            return c.json({ success: true, message: "Ticket created", data }, 201);
        } catch (e) {
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message });
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            if (e instanceof ConflictError) throw new HTTPException(409, { message: e.message });
            throw e;
        }
    }
}
