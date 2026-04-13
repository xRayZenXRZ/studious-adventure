import { MatchService } from "@application/services/MatchService";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";

import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const matchService = new MatchService(AppDataSource.getRepository(Match));

export default class GetMatchsByStatusHandler {
    async handle(c: Context<{}, "/:status">) {
        const { status } = c.req.param();
        try {
            const data = await matchService.findByStatus(status.toUpperCase());

            return c.json({ "success": true, "message": `Matchs with status ${status}`, data });
        } catch (e) {
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message })
            throw e;
        }
    }
}
