import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { MatchService } from "@application/services/MatchService";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";

//à revoir

const matchService = new MatchService(AppDataSource.getRepository(Match))

export default class GetMatchsByStageHandler {
    async handle(c: Context<{}, "/:stage">) {
        const { stage } = c.req.param();
        try {
            const data = await matchService.findByStage(stage.toUpperCase());

            return c.json({ "success": true, "message": `Matchs at stage ${stage}`, data });
        } catch (e) {
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message })
            throw e;
        }
    }
}
