import { StadiumService } from "@application/services/StadiumService";
import { Stadium } from "@domain/entities/Stadium";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const stadiumService = new StadiumService(AppDataSource.getRepository(Stadium));

export default class GetStadiumByNameHandler {
    async handle(c: Context<{}, "/:name">) {
        const { name } = c.req.param();
        try {

            const data = await stadiumService.findByName(name);

            return c.json({ "success": true, "message": `Stadium ${name}`, data }, 200)
        } catch (e) {
            if (e instanceof NotFoundError) throw new HTTPException(404, { message: e.message })
            throw e;
        }
    }
}


/*
export default class GetStadiumByNameHandler {
    async handle(c: Context) {
        const nameParam = c.req.param("name");

        if (!nameParam) throw new HTTPException(400, { "message": " name is required" });

        const stadium = Stadiums.find((stadium) => stadium.name.toLowerCase() === nameParam.toLowerCase());

        if (!stadium) throw new HTTPException(404, { "message": `Stadium "${nameParam}" does not exist` });

        return c.json({ "success": true, "message": `Stadium ${nameParam}`, "data": stadium }, 200);
    }
}
*/