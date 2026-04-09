import { TeamService } from "@application/services/TeamService";
import { Team } from "@domain/entities/Team";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const teamService = new TeamService(AppDataSource.getRepository(Team));

export default class GetTeamsHandler {
    async handle(c: Context) {
        const { name } = c.req.query();
        const { code } = c.req.query();
        try {
            const data = await teamService.findAll({ name, code })

            const message = name ? `Teams filtered by name: ${name}` : "All teams";

            return c.json({ "success": true, "message": message, "data": data }, 200);

        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message })
            throw e;
        }
    }
}

/*
export default class GetTeamsHandler {
    async handle(c: Context) {
        const sortParam = c.req.query("sort");
        const nameParam = c.req.query("name");

        if (sortParam !== undefined && sortParam !== "name" && sortParam !== "-name") throw new HTTPException(400, { "message": `Invalid sort value: ${sortParam}` });

        let teams = Teams;

        if (nameParam) {
            teams = teams.filter(team => team.name.toLowerCase().includes(nameParam.toLowerCase()));
        }

        if (sortParam === "-name") {
            teams.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortParam === "name") {
            teams.sort((a, b) => a.name.localeCompare(b.name));
        }

        const message = nameParam ? `Teams filtered by name: ${nameParam}` : "All teams";

        return c.json({ "success": true, "message": message, "data": teams }, 200);
    }
}
*/