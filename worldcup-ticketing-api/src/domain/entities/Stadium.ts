import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { City } from "./City";

@Entity()
export class Stadium {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name!: string;

    @ManyToOne(() => City, { eager: true, nullable: false })
    @JoinColumn()
    public city: City;

    @Column()
    public capacity: number;

    public constructor(name: string, city: City, capacity: number) {
        if (capacity < 0) throw new Error("Capacity > 0");
        this.name = name;
        this.city = city;
        this.capacity = capacity;
    }
}


/*import { City } from "./City";

export class Stadium {
    public constructor(public name: string, public city: City, public capacity: number) {
        if (capacity < 0) throw new Error("Capacity > 0");
    }

}
    */