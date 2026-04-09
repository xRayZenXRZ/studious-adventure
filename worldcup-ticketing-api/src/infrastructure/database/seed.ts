import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { Stadium } from "@domain/entities/Stadium";
import { Team } from "@domain/entities/Team";
import { Ticket } from "@domain/entities/Ticket";
import { AppDataSource } from "./AppDataSource";
import { Countries } from "@infrastructure/mock/countries";
import { Cities } from "@infrastructure/mock/cities";
import { Matchs } from "@infrastructure/mock/matchs";
import { Stadiums } from "@infrastructure/mock/stadiums";
import { Teams } from "@infrastructure/mock/teams";
import { tickets } from "@infrastructure/mock/tickets";
import "reflect-metadata";

export async function clear(): Promise<void> {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        await AppDataSource.dropDatabase();
        await AppDataSource.synchronize();

        console.log("Database cleared with success");
    } catch (error) {
        console.error(error);
        console.error("Can't clear database");
    }
}

export async function seed(): Promise<void> {
    try {
        await clear();

        // countries
        const countryRepository = AppDataSource.getRepository(Country);
        for (const country of Countries) {
            await countryRepository.save(
                countryRepository.create({ name: country.name, code: country.code })
            );
        }
        console.log("Countries inserted");

        // cities
        const cityRepository = AppDataSource.getRepository(City);
        for (const city of Cities) {
            const countryCity = await countryRepository.findOneBy({ name: city.country.name });
            await cityRepository.save(new City(countryCity!, city.name));
        }
        console.log("Cities inserted");

        // stadiums
        const stadiumRepository = AppDataSource.getRepository(Stadium);
        for (const stadium of Stadiums) {
            const cityStadium = await cityRepository.findOneBy({ name: stadium.city.name });
            await stadiumRepository.save(new Stadium(stadium.name, cityStadium!, stadium.capacity));
        }
        console.log("Stadiums inserted");

        // teams
        const teamRepository = AppDataSource.getRepository(Team);
        for (const team of Teams) {
            await teamRepository.save(new Team(team.name, team.code));
        }
        console.log("Teams inserted");

        // matches
        const matchRepository = AppDataSource.getRepository(Match);
        for (const match of Matchs) {
            const homeTeamMatch = await teamRepository.findOneBy({ name: match.homeTeam.name });
            const awayTeamMatch = await teamRepository.findOneBy({ name: match.awayTeam.name });
            const stadiumMatch = await stadiumRepository.findOneBy({ name: match.stadium.name });
            await matchRepository.save(
                new Match(
                    homeTeamMatch!, awayTeamMatch!,
                    match.homeScore, match.awayScore,
                    match.homeScoreExtraTime, match.awayScoreExtraTime,
                    match.homeScoreShootOut, match.awayScoreShootOut,
                    stadiumMatch!, match.status, match.stage, match.date
                )
            );
        }
        console.log("Matches inserted");

        // tickets
        const ticketRepository = AppDataSource.getRepository(Ticket);
        for (const ticket of tickets) {
            await ticketRepository.save(
                new Ticket(ticket.match, ticket.seat, ticket.firstname, ticket.lastname, ticket.email)
            );
        }
        console.log("Tickets inserted");

        console.log("Database seeded with success");
    } catch (error) {
        console.error(error);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();
