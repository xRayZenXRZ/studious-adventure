import { ValueTransformer } from "typeorm";

export class FifaCode {

    readonly value: string;

    public constructor(value: string) {
        if (!/^[A-Z]{3}$/.test(value)) {
            throw new Error(`FifaCode invalide : "${value}" (doit être 3 lettres majuscules)`);
        }
        this.value = value
    }

    public equals(other: FifaCode): boolean { return this.value === other.value; }

    public toString(): string { return this.value; }
}

export const FifaCodeTransformer: ValueTransformer = {
    to: (value: FifaCode | string) => value instanceof FifaCode ? value.value : value,
    from: (value: string) => new FifaCode(value),
};


/*import { Entity, PrimaryColumn } from "typeorm";


export class FifaCode {

    public value: string

    public constructor(value: string) {

        if (!/^[A-Z]{3}$/.test(value)) { throw new Error(`FifaCode invalide : "${value}" (doit être 3 lettres majuscules)`); }

        this.value = value;

    }

    //methode
    public equals(other: FifaCode): boolean { return this.value === other.value; }

    public toString(): string { return this.value; }
}*/