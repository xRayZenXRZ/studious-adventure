import { CityService } from "@application/services/CityService";
import { MatchService } from "@application/services/MatchService";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const cityService = new CityService(AppDataSource.getRepository(City));
const matchService = new MatchService(AppDataSource.getRepository(Match));

export default class GetCityMatchsHandler {
    async handle(c: Context<{}, "/:name/matchs">) {
        const { name } = c.req.param();
        try {

            const city = await cityService.findByName(name);

            const data = await matchService.findByCityName(name);

            return c.json({ "success": true, "message": `Matchs in ${name}`, "data": data });

        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}

