import { CityService } from "@application/services/CityService";
import { City } from "@domain/entities/City";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";


const cityService = new CityService(AppDataSource.getRepository(City));

export default class GetCityByNameHandler {
    async handle(c: Context) {
        const { name } = c.req.query();
        try {

            const data = await cityService.findAll({ name });

            const message = name ? `Cities filtered by name: ${name}` : 'All cities';

            return c.json({ "success": true, "message": message, data }, 200);
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}
