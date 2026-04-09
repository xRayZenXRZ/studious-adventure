import { TeamService } from "@application/services/TeamService";
import { Team } from "@domain/entities/Team";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";


const teamService = new TeamService(AppDataSource.getRepository(Team))

export default class GetTeamByFifaCodeHandler {

    async handle(c: Context<{}, "/:fifacode">) {

        const fifacode = c.req.param("fifaCode");

        try {

            const data = await teamService.findByFifaCode(String(fifacode).toUpperCase());

            return c.json({ "success": true, "message": `Team ${data.code}`, "data": data });
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message })
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message })
            throw e;
        }
    }
}