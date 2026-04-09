import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Match } from "./Match";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Match, { eager: true, nullable: false })
    @JoinColumn()
    public match!: Match;

    @Column()
    public seat!: string;

    @Column()
    public firstname!: string;

    @Column()
    public lastname!: string;

    @Column({ unique: true })
    public email!: string;

    public constructor(match?: Match, seat?: string, firstname?: string, lastname?: string, email?: string) {
        if (match && seat && firstname && lastname && email) {
            if (this.id < 0) throw new Error("id > 0");
            if (seat.trim() === "") throw new Error("seat cannot be vide");
            this.match = match;
            this.seat = seat;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
        }
    }

    public toString(): string {
        return `Match ID : ${this.match.id} , Seat : ${this.seat} , customer : ${this.lastname} ${this.firstname} , email : ${this.email}`;
    }


}


/*import { Customer } from "./Customer";
import { Match } from "./Match";

export class Ticket {

    public constructor(public id: number, public match: Match, public seat: string, public customer: Customer) {

        if (id < 0) throw new Error(" id doit être > 0");

        if (seat === undefined) throw new Error("seat cannot not be vide");

    }

}
    */