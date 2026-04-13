import { City } from "@domain/entities/City";
import { Country } from "@domain/entities/Country";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { type FindOptionsWhere, ILike, type Repository } from "typeorm";

type CityFilters = {
    name?: string;
    country?: string;
};



export class CityService {

    private readonly cityRepository: Repository<City>;

    constructor(cityRepository: Repository<City>) {

        this.cityRepository = cityRepository;

    }

    async findAll({ name, country }: CityFilters = {}): Promise<City[]> {

        // Cities Filtered By Name
        if (name) {

            const cities = await this.cityRepository.find({

                select: {
                    name: true,
                    country: true,
                },

                where: {
                    name: ILike(name)
                },

                relations: {
                    country: true
                },

            })

            return cities;
        }

        // Cities Filtered By Country Code
        if (country) {
            return this.findByCountryCode(country)
        }

        const cities = await this.cityRepository.find({

            select: {
                name: true,
                country: true,
            },

            relations: {
                country: true
            },

            order: {
                name: "ASC"
            }

        })

        return cities;
    }

    async findByName(name: string): Promise<City> {

        const city = await this.cityRepository.findOne({
            where: {
                name: ILike(name)
            }
        });

        if (!city) throw new NotFoundError(`City "${name}" does not exist`);

        return city;
    }

    async findByCountryCode(countryCode: string): Promise<City[]> {

        const cities = await this.cityRepository.find({

            where: {
                country: {
                    code: ILike(countryCode as Country["code"])
                }
            },

            relations: {
                country: true
            },

            order: {
                country: {
                    code: "ASC"
                }
            }

        });

        if (cities.length === 0) throw new NotFoundError(`Country "${countryCode}" does not exist`);

        return cities;
    }

}