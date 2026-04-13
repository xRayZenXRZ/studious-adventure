import { StadiumService } from "@application/services/StadiumService";
import { Stadium } from "@domain/entities/Stadium";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";

const stadiumService = new StadiumService(AppDataSource.getRepository(Stadium));

export default class GetStadiumsHandler {
    async handle(c: Context) {
        const cityName = c.req.query("city[name]");
        const cityCountry = c.req.query("city[country]");
        const countryCode = c.req.query("country[code]");
        const countryName = c.req.query("country[name]");

        let data;

        if (countryCode) {
            data = await stadiumService.findAll({ city: countryCode });
        } else if (countryName) {
            data = await stadiumService.findAll({ city: countryName });
        } else if (cityName) {
            data = await stadiumService.findAll({ name: cityName })
        } else {
            data = await stadiumService.findAll();
        }

        const message = cityName ? `Stadiums filtered by city[name]: ${cityName}` : cityCountry ? `Stadiums filtered by city[country]: ${cityCountry}` : countryCode ? `Stadiums filtered by country[code]: ${countryCode}` : countryName ? `Stadiums filtered by country[name]: ${countryName}` : "All stadiums";

        return c.json({ "success": true, "message": message, "data": data });
    }
}
