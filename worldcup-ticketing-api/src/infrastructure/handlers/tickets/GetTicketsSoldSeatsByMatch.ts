import { MatchService } from "@application/services/MatchService";
import { TicketService } from "@application/services/TicketService";
import { Match } from "@domain/entities/Match";
import { Ticket } from "@domain/entities/Ticket";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const matchService = new MatchService(AppDataSource.getRepository(Match))
const ticketService = new TicketService(AppDataSource.getRepository(Ticket), AppDataSource.getRepository(Match));

export default class GetTicketsSoldSeatsByMatch {

    async handle(c: Context<{}, "/seats/:matchId">) {
        const { matchId } = c.req.param();
        try {

            const match = await matchService.findById(Number(matchId));

            const data = await ticketService.getSoldSeatsByMatch(Number(matchId));

            return c.json({ "success": true, "message": `Sold Seats of match ${matchId}`, data })
        } catch (e) {
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message });
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }

    }
}