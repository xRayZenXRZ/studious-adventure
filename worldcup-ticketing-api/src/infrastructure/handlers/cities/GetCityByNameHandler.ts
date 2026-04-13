import { CityService } from "@application/services/CityService";
import { City } from "@domain/entities/City";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const cityService = new CityService(AppDataSource.getRepository(City));

export default class GetCityByNameHandler {
    async handle(c: Context<{}, "/:name">) {
        const { name } = c.req.param();
        try {

            const data = await cityService.findByName(name);

            return c.json({ "success": true, "message": `City ${name}`, data }, 200);
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}

/*
export default class GetCityByNameHandler {
    async handle(c: Context) {
        const nameParam = c.req.param("name");

        if (!nameParam) throw new HTTPException(400, { "message": "name is vide" });

        let cities = Cities

        const city = cities.find(city => city.name.toLowerCase().includes(nameParam.toLowerCase()));

        if (!city) throw new HTTPException(404, { "message": `City "${nameParam}" does not exist` });

        return c.json({ "success": true, "message": `City ${nameParam}`, "data": city });
    }
}
*/