import { TeamService } from "@application/services/TeamService";
import { Team } from "@domain/entities/Team";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const teamService = new TeamService(AppDataSource.getRepository(Team));

export default class GetTeamsHandler {
    async handle(c: Context) {
        const { name } = c.req.query();
        const { code } = c.req.query();
        const { sort } = c.req.query();
        try {

            let data = await teamService.findAll({ name, code })

            if (sort) {
                data = await teamService.sortByName(sort);
            }

            const message = name ? `Teams filtered by name: ${name}` : "All teams";

            return c.json({ "success": true, "message": message, "data": data }, 200);

        } catch (e) {
            if (e instanceof ValidationError) throw new HTTPException(400, { message: e.message })
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message })
            throw e;
        }
    }
}
