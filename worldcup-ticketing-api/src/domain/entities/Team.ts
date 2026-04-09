import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { FifaCode, FifaCodeTransformer } from "@domain/value-objects/FifaCode";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name!: string;

    @Column({ type: "varchar", unique: true, length: 3, transformer: FifaCodeTransformer })
    public code!: FifaCode;

    public constructor(name?: string, code?: FifaCode) {
        if (name && code) {
            this.name = name;
            this.code = code;
        }
    }

    public equals(other: Team): boolean {
        return this.code.equals(other.code);
    }

    public toString(): string {
        return `${this.name} (${this.code.toString()})`;
    }
}

/*
import { FifaCode } from "./FifaCode";

export class Team {
    public constructor(public name: string, public code: FifaCode) {

    }

    public equals(other: Team): boolean {
        return this.code.equals(other.code);
    }

    public toString(): string {
        return `${this.name} (${this.code.toString()})`;
    }
}
*/