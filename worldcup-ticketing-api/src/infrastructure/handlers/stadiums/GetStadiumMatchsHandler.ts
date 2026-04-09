import { MatchService } from "@application/services/MatchService";
import { StadiumService } from "@application/services/StadiumService";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Matchs } from "@infrastructure/mock/matchs";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const matchService = new MatchService(AppDataSource.getRepository(Match));
const stadiumService = new StadiumService(AppDataSource.getRepository(Stadium))

export default class GetStadiumsMatchsHandler {
    async handle(c: Context<{}, "/:name/matchs">) {
        const { name } = c.req.param();
        try {

            const stadium = await stadiumService.findByName(name.toLowerCase());

            const data = await matchService.findByStadiumName(name.toLowerCase());

            return c.json({ "success": true, "message": `Matchs at ${stadium.name}`, "data": data });

        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}

