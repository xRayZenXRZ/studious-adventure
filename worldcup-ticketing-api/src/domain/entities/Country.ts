import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

const nomDisponibles: Record<string, "us" | "me" | "ca"> = { "USA": "us", "Mexico": "me", "Canada": "ca", };

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    public id?: number;
    @Column()
    public name!: "USA" | "Mexico" | "Canada";

    @Column()
    public code!: "us" | "me" | "ca";

    public constructor(name?: "USA" | "Mexico" | "Canada", code?: "us" | "me" | "ca") {
        if (name && code) {
            if (nomDisponibles[name] !== code) { throw new Error(`Combinaison invalide : "${name}" ne correspond pas au code "${code}"`); }
            this.name = name;
            this.code = code;
        }
    }
}