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

/*
export default class CreateTicketHandler {
    async handle(c: Context) {
        const body = await c.req.json();

        const res = CreateTicketSchema.safeParse(body);

        if (!res.success) throw new HTTPException(400, { "message": "Can't create ticket (wrong or missing values)" });

        const match = Matchs.find(match => match.id === res.data.matchId);

        if (!match) throw new HTTPException(404, { "message": `Match ${res.data.matchId} does not exist` });

        const ticketDoublon = tickets.find(ticket => ticket.match.id?.toString() === res.data.matchId.toString() && ticket.seat.toString() === res.data.seat.toString());

        if (ticketDoublon) throw new HTTPException(409, { "message": `Seat '${res.data.seat}' is already taken for match ${res.data.matchId}` });

        const newTicket = new Ticket((tickets.length + 1), match, res.data.seat, res.data.customer);

        tickets.push(newTicket);

        return c.json({ success: true, message: "Ticket created", data: newTicket }, 201);
    }
}
    */