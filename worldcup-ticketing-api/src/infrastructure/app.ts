import { Hono } from 'hono';
import { matchsRouter } from './routes/matchs';
import { home_healthRouter } from './routes/home_health';
import { teamsRouter } from './routes/teams';
import { citiesRouter } from './routes/cities';
import { stadiumsRouter } from './routes/stadiums';
import { countriesRouter } from './routes/countries';
import { ticketsRouter } from './routes/tickets';

//Handling Exceptions import : 
import { HTTPException } from 'hono/http-exception';


export const app = new Hono()

app.route("/", home_healthRouter);

app.route("/matchs", matchsRouter);

app.route("/teams", teamsRouter);

app.route("/cities", citiesRouter);

app.route("/stadiums", stadiumsRouter);

app.route("/countries", countriesRouter);

app.route("/tickets", ticketsRouter);

app.onError((err, c) => {
    if (err instanceof HTTPException) return c.json({ "success": false, "error": err.message }, err.status);

    console.log(err)

    return c.json({ 'error': 'Internal Server Error' }, 500)
});