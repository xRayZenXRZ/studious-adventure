import { Stadium } from "@domain/entities/Stadium";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ILike, Repository } from "typeorm";

type StadiumFilters = {
    name?: string;
    capacity?: number;
    city?: string
}

export class StadiumService {

    private readonly stadiumRepository: Repository<Stadium>;


    constructor(stadiumRepository: Repository<Stadium>) {

        this.stadiumRepository = stadiumRepository;

    }

    async findAll({ name, capacity, city }: StadiumFilters = {}): Promise<Stadium[]> {

        //Stadium Filtered By Name
        if (name) {
            const stadiums = await this.stadiumRepository.find({
                select: {
                    name: true,
                    city: true,
                    capacity: true,
                },

                where: {
                    city: {
                        name: ILike(name),
                    }
                },

                relations: {
                    city: true
                },

                order: {
                    name: "ASC"
                }
            })

            return stadiums;
        }

        //Stadiums Filtered By City
        if (city) {
            const stadiums = await this.stadiumRepository.find({
                select: {
                    name: true,
                    city: true,
                    capacity: true,
                },

                where: [
                    { city: { country: { name: ILike(city as "USA" | "Mexico" | "Canada"), }, }, },
                    { city: { country: { code: ILike(city as "us" | "me" | "ca"), }, }, },
                ],

                relations: {
                    city: true
                },

                order: {
                    name: "ASC"
                }
            })
            return stadiums;
        }

        //Stadiums Filtered By Capacity
        if (capacity) {
            const stadiums = await this.stadiumRepository.find({
                select: {
                    name: true,
                    city: true,
                    capacity: true,
                },

                where: {
                    capacity: capacity
                },

                relations: {
                    city: true
                },

                order: {
                    capacity: "ASC"
                }
            })

            return stadiums
        }

        const stadiums = await this.stadiumRepository.find({

            relations: {
                city: true
            },

            order: {
                name: "ASC"
            }

        })

        return stadiums;
    }

    async findByName(name: string): Promise<Stadium> {

        const stadium = await this.stadiumRepository.findOne({

            where: {
                name: ILike(name)
            }

        })

        if (!stadium) throw new NotFoundError(`Stadium "${name}" does not exist`);

        return stadium
    }

}
