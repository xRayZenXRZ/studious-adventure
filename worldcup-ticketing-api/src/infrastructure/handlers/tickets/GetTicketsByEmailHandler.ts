import { TicketService } from "@application/services/TicketService";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";


const ticketService = new TicketService(AppDataSource.getRepository(Ticket), AppDataSource.getRepository(Match));

export default class GetTicketsByEmailHandler {

    async handle(c: Context<{}, "/:email">) {
        const { email } = c.req.param();
        try {

            const data = await ticketService.findByEmail(email);

            return c.json({ "success": true, "message": `Ticket de l'email : ${email}`, data })
        } catch (e) {
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message });
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }

    }
}