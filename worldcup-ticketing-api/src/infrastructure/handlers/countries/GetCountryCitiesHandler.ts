import { CityService } from "@application/services/CityService";
import { CountryService } from "@application/services/CountryService";
import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const cityService = new CityService(AppDataSource.getRepository(City))
const countryService = new CountryService(AppDataSource.getRepository(Country))

export default class GetCountryCitiesHandler {
    async handle(c: Context<{}, "/:code/cities">) {
        const { code } = c.req.param();
        try {

            const country = await countryService.findByCode(code);

            const data = await cityService.findAll({ country: country.code });

            return c.json({ "success": true, "message": `Cities in ${country.name}`, data });
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message })
        }
    }
}