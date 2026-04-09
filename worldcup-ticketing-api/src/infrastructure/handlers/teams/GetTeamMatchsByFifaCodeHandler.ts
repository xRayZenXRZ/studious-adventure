import { MatchService } from "@application/services/MatchService";
import { TeamService } from "@application/services/TeamService";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { Match } from "@domain/entities/Match";
import { Team } from "@domain/entities/Team";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const teamService = new TeamService(AppDataSource.getRepository(Team));
const matchService = new MatchService(AppDataSource.getRepository(Match));

export default class GetTeamMatchsByFifaCodeHandler {
    async handle(c: Context<{}, "/:fifacode/matchs">) {

        const fifacode = c.req.param("fifaCode")

        try {

            const team = await teamService.findByFifaCode(String(fifacode).toUpperCase());

            const data = await matchService.findByTeamCode(new FifaCode(String(fifacode).toUpperCase()));

            return c.json({ "success": true, "message": `Matchs for team ${team.code}`, "data": data });
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message })
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message })
            throw e;
        }
    }
}