import { Matchs } from "@infrastructure/mock/matchs";
import { Teams } from "@infrastructure/mock/teams";
import { MatchStage } from "@domain/entities/enums/MatchStage";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { MatchService } from "@application/services/MatchService";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { ValidationError } from "@domain/errors/ValidationError";

const matchService = new MatchService(AppDataSource.getRepository(Match));

export default class GetMatchHandler {
    async handle(c: Context<{}, "/:stage">) {
        const { stage } = c.req.param();
        const teamCode = c.req.query("team[code]");
        const dateQuery = c.req.query("date");
        try {

            const data = await matchService.findAll({ homeTeam: teamCode, awayTeam: teamCode, stage: stage, date: dateQuery });

            const message = teamCode ? `Matchs filtered by team[code]: ${teamCode}` : stage ? `Matchs filtered by stage: ${stage}` : dateQuery ? `Matchs filtered by date: ${dateQuery}` : "All matchs";

            return c.json({ success: true, message, data });
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message })
            throw e;
        }
    }
}