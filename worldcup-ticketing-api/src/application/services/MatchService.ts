import { MatchStage } from "@domain/entities/enums/MatchStage";
import { MatchStatus } from "@domain/entities/enums/MatchStatus";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { Equal, ILike, Raw, Repository } from "typeorm";


type MatchFilters = {
    homeTeam?: string;
    awayTeam?: string;
    homeScore?: number;
    awayScore?: number;
    homeScoreExtraTime?: number;
    awayScoreExtraTime?: number;
    homeScoreShootOut?: number;
    awayScoreShootOut?: number;
    stadium?: string;
    status?: string;
    stage?: string
    date?: string
}

export class MatchService {
    private readonly matchRepository: Repository<Match>;

    constructor(matchRepository: Repository<Match>) {
        this.matchRepository = matchRepository;
    }

    async findAll({ homeTeam, awayTeam, stage, date }: MatchFilters = {}): Promise<Match[]> {

        if (stage) {

            if (!(stage.toUpperCase() in MatchStage)) throw new ValidationError(`Invalid stage: "${stage}"`)

            const matches = await this.matchRepository.find({
                where: {
                    stage: ILike(stage as MatchStage)
                },
            });

            return matches;
        }
        //verifier si hometTeam ≠ awaTeam pour ajouter une condition

        if (homeTeam) {
            const TeamCode = new FifaCode(homeTeam)

            return this.findByTeamCode(TeamCode);
        }

        if (awayTeam) {
            const TeamCode = new FifaCode(awayTeam)

            return this.findByTeamCode(TeamCode);
        }

        if (date) {

            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new ValidationError(`Invalid date format`)

            const Matches = await this.matchRepository.find({
                where: {
                    date: Raw((alias) => `DATE(${alias}) = :date`, { date })
                },
            });

            return Matches;
        }

        const matches = await this.matchRepository.find({
            relations: {
                homeTeam: true,
                awayTeam: true,
            },
        });

        return matches;
    }

    async findById(id: number): Promise<Match> {

        const Match = await this.matchRepository.findOne({

            where: {
                id: ILike(id)
            }

        })

        if (!Match) throw new NotFoundError(`Match ${id} does not exist`);

        return Match
    }

    async findByStage(stage: string): Promise<Match[]> {

        if (!(stage.toUpperCase() in MatchStage)) throw new ValidationError(`Invalid stage: "${stage}"`)

        const Matches = await this.matchRepository.find({
            where: {
                stage: ILike(stage as MatchStage)
            }
        })

        return Matches
    }

    async findByStatus(status: string): Promise<Match[]> {

        if (!(status.toUpperCase() in MatchStatus)) throw new ValidationError(`Invalid status: "${status}"`)

        const Matches = await this.matchRepository.find({
            where: {
                status: ILike(status as MatchStatus)
            }
        })

        return Matches
    }

    async findByCityName(cityName: string): Promise<Match[]> {

        const Matches = await this.matchRepository.find({

            where: {
                stadium: {
                    city: {
                        name: ILike(cityName)
                    }
                }
            },

            relations: {
                stadium: true
            }

        })

        return Matches
    }

    async findByStadiumName(stadiumName: string): Promise<Match[]> {
        const Matches = await this.matchRepository.find({

            where: {
                stadium: {
                    name: ILike(stadiumName)
                }
            },

            relations: {
                stadium: true
            }

        })

        return Matches
    }

    async findByTeamCode(teamCode: FifaCode): Promise<Match[]> {
        const Matches = await this.matchRepository.find({

            where: [
                { homeTeam: { code: ILike(teamCode) } },
                { awayTeam: { code: ILike(teamCode) } },
            ],

            relations: {
                homeTeam: true,
                awayTeam: true
            }

        })

        return Matches
    }

    async findByTeamCodeAndStage(teamCode: FifaCode, stage: string): Promise<Match[]> {

        if (!(stage.toUpperCase() in MatchStage)) throw new ValidationError(`Invalid stage: "${stage}"`)

        const Matches = await this.matchRepository.find({

            where: [
                { stage: ILike(stage as MatchStage), homeTeam: { code: ILike(teamCode) } },
                { stage: ILike(stage as MatchStage), awayTeam: { code: ILike(teamCode) } },
            ],

            relations: {
                homeTeam: true,
                awayTeam: true,
            }

        })

        return Matches
    }
}