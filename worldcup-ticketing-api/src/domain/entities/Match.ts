import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team";
import { Stadium } from "./Stadium";
import { MatchStatus } from "./enums/MatchStatus";
import { MatchStage } from "./enums/MatchStage";

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => Team, { eager: true, nullable: false })
    @JoinColumn({ name: "homeTeamId" })
    public homeTeam!: Team;

    @ManyToOne(() => Team, { eager: true, nullable: false })
    @JoinColumn({ name: "awayTeamId" })
    public awayTeam!: Team;

    @Column({ default: 0 })
    public homeScore!: number;

    @Column({ default: 0 })
    public awayScore!: number;

    @Column({ type: "int", nullable: true, default: null })
    public homeScoreExtraTime!: number | null;

    @Column({ type: "int", nullable: true, default: null })
    public awayScoreExtraTime!: number | null;

    @Column({ type: "int", nullable: true, default: null })
    public homeScoreShootOut!: number | null;

    @Column({ type: "int", nullable: true, default: null })
    public awayScoreShootOut!: number | null;

    @ManyToOne(() => Stadium, { eager: true, nullable: false })
    @JoinColumn()
    public stadium!: Stadium;

    @Column({ type: "enum", enum: MatchStatus })
    public status!: MatchStatus;

    @Column({ type: "enum", enum: MatchStage })
    public stage!: MatchStage;

    @Column()
    public date!: Date;

    public constructor(
        homeTeam?: Team, awayTeam?: Team,
        homeScore: number = 0, awayScore: number = 0,
        homeScoreExtraTime: number | null = null, awayScoreExtraTime: number | null = null,
        homeScoreShootOut: number | null = null, awayScoreShootOut: number | null = null,
        stadium?: Stadium, status?: MatchStatus, stage?: MatchStage, date?: Date
    ) {
        if (homeTeam && awayTeam) {
            if (this.id! < 0) throw new Error("id > 0")
            if (homeTeam.name === awayTeam.name) throw new Error("homeTeam ≠ awayTeam");
            if (homeScore < 0) throw new Error("homeScore >= 0");
            if (awayScore < 0) throw new Error("awayScore >= 0");
        }
        this.homeTeam = homeTeam!;
        this.awayTeam = awayTeam!;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.homeScoreExtraTime = homeScoreExtraTime;
        this.awayScoreExtraTime = awayScoreExtraTime;
        this.homeScoreShootOut = homeScoreShootOut;
        this.awayScoreShootOut = awayScoreShootOut;
        this.stadium = stadium!;
        this.status = status!;
        this.stage = stage!;
        this.date = date!;
    }

    public isDraw(): boolean { return this.homeScore === this.awayScore; }

    public winner(): Team | null {
        if (this.isDraw()) return null;
        return this.homeScore > this.awayScore ? this.homeTeam : this.awayTeam;
    }
}
//sans TypeORM :
/*
import { Team } from "./Team";
import { Stadium } from "./Stadium";
import { MatchStatus } from "./enums/MatchStatus";
import { MatchStage } from "./enums/MatchStage";

export class Match {
    //constructor 
    public constructor(public id: number, public homeTeam: Team, public awayTeam: Team, public homeScore: number = 0, public awayScore: number = 0, public homeScoreExtraTime: number | null, public awayScoreExtraTime: number | null, public homeScoreShootOut: number | null, public awayScoreShootOut: number | null, public stadium: Stadium, public status: MatchStatus, public stage: MatchStage, public date: Date) {
        if (id < 0) throw new Error("id > 0");
        if (homeTeam == awayTeam) throw new Error("homeTeam.name ≠ awayTeam.name");
        if (homeScore < 0) throw new Error("homeScore >= 0");
        if (awayScore < 0) throw new Error("awayScore >= 0");
    }

    //method
    public isDraw(): boolean { return this.homeScore == this.awayScore; }

    public winner(): Team | null {
        if (this.isDraw()) return null;
        if (this.homeScore > this.awayScore) { return this.homeTeam; }
        if (this.homeScore < this.awayScore) { return this.awayTeam; }
        return null;
    }

}
    */