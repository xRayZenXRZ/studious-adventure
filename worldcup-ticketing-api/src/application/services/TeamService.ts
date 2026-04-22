import { Team } from "@domain/entities/Team";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";
import { ILike, Repository } from "typeorm";

type TeamFilters = {
    name?: string;
    code?: string;
}

export class TeamService {

    private readonly teamRepository: Repository<Team>;

    constructor(teamRepository: Repository<Team>) {

        this.teamRepository = teamRepository;

    }

    async findAll({ name, code }: TeamFilters = {}): Promise<Team[]> {

        //Teams Filtered By Name
        if (name) {
            const teams = await this.teamRepository.find({

                where: {
                    name: ILike(name)
                },

                order: {
                    name: "ASC"
                }

            })

            return teams;
        }

        //Teams Filtered by Code
        if (code) {

            if (!(/^[A-Z]{3}$/).test(code)) throw new ValidationError(`Invalid FIFA code: "${code}"`);

            const teams = await this.teamRepository.find({

                where: {
                    code: ILike(code)
                },

            })

            if (teams.length === 0) throw new NotFoundError(`FifaCode "${code}" does not exist`);

            return teams;
        }

        const teams = await this.teamRepository.find({
            order: {
                name: "ASC"
            }
        })

        return teams;
    }

    async findByFifaCode(code: string): Promise<Team> {

        if (!(/^[A-Z]{3}$/).test(code)) throw new ValidationError(`Invalid FIFA code: "${code}"`);

        const team = await this.teamRepository.findOne({

            where: {
                code: ILike(code)
            },

            order: {
                code: "ASC"
            }

        })

        if (!team) throw new NotFoundError(`FifaCode "${code}" does not exist`);

        return team;
    }

    async sortByName(sort: string): Promise<Team[]> {

        if (sort !== "name" && sort !== "-name") throw new ValidationError(`Invalid sort value: ${sort}`);

        let teams = await this.teamRepository.find({})

        if (sort === "-name") {
            teams.sort().reverse()
        } else {
            teams.sort()
        }
        /*
        if (sort === "-name") {
            data = data.sort((a, b) => b.name.localeCompare(a.name));
          } else {
            // /teams or ?sort=name → ascending by default
            data = data.sort((a, b) => a.name.localeCompare(b.name));
        } 
        */
        return teams
    }
}