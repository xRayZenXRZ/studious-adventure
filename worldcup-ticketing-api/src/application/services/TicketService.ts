import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { ILike, Repository } from "typeorm";
import { MatchService } from "./MatchService";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ConflictError } from "@domain/errors/ConflictError";
import { ValidationError } from "@domain/errors/ValidationError";


const matchService = new MatchService(AppDataSource.getRepository(Match));

export class TicketService {
    private readonly ticketRepository: Repository<Ticket>;

    private readonly matchRepository: Repository<Match>;

    constructor(ticketRepository: Repository<Ticket>, matchRepository: Repository<Match>) {

        this.ticketRepository = ticketRepository;

        this.matchRepository = matchRepository;
    }

    async order(matchId: number, seat: string, customer: { firstname: string, lastname: string, email: string }): Promise<Ticket> {

        // à revoir 
        const match = await this.matchRepository.findOne({
            where: {
                id: matchId
            }
        });

        if (!match) throw new NotFoundError(`Match ${matchId} does not exist`);

        const existing = await this.ticketRepository.findOne({
            where: {
                match: {
                    id: matchId
                },
                seat
            }
        });

        if (existing) throw new ConflictError(`Seat '${seat}' is already taken for match ${matchId}`);

        const ticket = this.ticketRepository.create({
            match,
            seat,
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
        });

        return this.ticketRepository.save(ticket);
    }

    async getSoldSeatsByMatch(matchId: number): Promise<string[]> {

        let soldSeats: string[] = [];

        const seats = await this.ticketRepository.find({
            where: {
                match: {
                    id: ILike(matchId)
                }
            },

            relations: {
                match: true
            }
        })

        seats.forEach(ticket => soldSeats.push(`Match Id : ${ticket.id} , Solded Seat : ${ticket.seat}`));

        return soldSeats;
    }

    async findByEmail(email: string): Promise<Ticket[]> {

        if (!(email.includes("@"))) throw new ValidationError(`Invalide email ${email} `);

        const mails = await this.ticketRepository.find({
            where: {
                email: ILike(email)
            },
        })

        if (mails.length === 0) throw new NotFoundError(`Ticket for email ${email} does not exist`);

        return mails
    }
}