import { Country } from "@domain/entities/Country";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { type FindOptionsWhere, ILike, type Repository } from "typeorm";

type CountryFilters = {
    name?: string;
    code?: string;
};

export class CountryService {

    private readonly countryRepository: Repository<Country>;

    constructor(countryRepository: Repository<Country>) {
        this.countryRepository = countryRepository;
    }


    async findAll({ name, code }: CountryFilters = {}): Promise<Country[]> {
        if (name) {

            const countryFilteredByName = await this.countryRepository.find({

                where: {
                    name: ILike(name as Country["name"])
                },

            });

            return countryFilteredByName;
        }

        if (code) {

            const countryFilteredByCode = await this.countryRepository.find({

                where: {

                    code: ILike(code as Country["code"])

                },

            });

            return countryFilteredByCode;
        }

        return this.countryRepository.find({

            order: { name: "ASC" }

        });
    }

    async findByCode(code: string): Promise<Country> {

        const country = await this.countryRepository.findOne({

            where: {
                code: ILike(code as Country["code"])
            },

        });

        if (!country) throw new NotFoundError(`Country "${code}" does not exist`);

        return country;
    }
}