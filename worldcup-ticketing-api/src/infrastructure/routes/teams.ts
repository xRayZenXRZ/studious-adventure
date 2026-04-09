import GetTeamByFifaCodeHandler from "@infrastructure/handlers/teams/GetTeamByFifaCodeHandler";
import GetTeamMatchsByFifaCodeHandler from "@infrastructure/handlers/teams/GetTeamMatchsByFifaCodeHandler";
import GetTeamMatchsByStageHandler from "@infrastructure/handlers/teams/GetTeamMatchsByStageHandler";
import GetTeamsHandler from "@infrastructure/handlers/teams/GetTeamHandler";
import { Hono } from "hono";

export const teamsRouter = new Hono();

teamsRouter.get("/", (c) => new GetTeamsHandler().handle(c));
teamsRouter.get("/:fifaCode", (c) => new GetTeamByFifaCodeHandler().handle(c));
teamsRouter.get("/:fifaCode/matchs", (c) => new GetTeamMatchsByFifaCodeHandler().handle(c));
teamsRouter.get("/:fifaCode/matchs/:stage", (c) => new GetTeamMatchsByStageHandler().handle(c));