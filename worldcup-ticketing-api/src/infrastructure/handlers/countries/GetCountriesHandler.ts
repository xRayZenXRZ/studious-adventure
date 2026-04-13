import { CountryService } from "@application/services/CountryService";
import { Country } from "@domain/entities/Country";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const countryService = new CountryService(AppDataSource.getRepository(Country));

export default class GetCountriesHandler {
    async handle(c: Context) {
        const { name } = c.req.query();
        const { code } = c.req.query()
        try {
            const data = await countryService.findAll({ name, code });

            const message = name ? `Countries filtered by name: ${name}` : code ? `Countries filtered by code: ${code}` : 'All countries';

            return c.json({ "success": true, "message": message, data });
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}