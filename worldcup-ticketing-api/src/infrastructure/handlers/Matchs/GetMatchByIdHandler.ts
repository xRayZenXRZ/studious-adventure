import { MatchService } from "@application/services/MatchService";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const matchService = new MatchService(AppDataSource.getRepository(Match));

export default class GetMatchByIdHandler {
    async handle(c: Context<{}, "/:id">) {
        const { id } = c.req.param();
        try {

            const data = await matchService.findById(Number(id));

            return c.json({ "success": true, "message": `Match ${data.id}`, "data": data });
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}

