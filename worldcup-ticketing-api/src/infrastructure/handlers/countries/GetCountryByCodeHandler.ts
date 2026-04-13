import { CountryService } from "@application/services/CountryService";
import { Country } from "@domain/entities/Country";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const countryService = new CountryService(AppDataSource.getRepository(Country));

export default class GetCountryByCodeHandler {
    async handle(c: Context<{}, "/:code">) {
        const { code } = c.req.param();
        try {
            const data = await countryService.findByCode(code);

            return c.json({ "success": true, "message": `Country ${data.name}`, data }, 200);
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message });
            throw e;
        }
    }
}
