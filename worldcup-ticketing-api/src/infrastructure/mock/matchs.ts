import { Match } from "@domain/entities/Match";
import { Stadiums } from "./stadiums";
import { Teams } from "./teams";
import { MatchStage } from "@domain/entities/enums/MatchStage";
import { MatchStatus } from "@domain/entities/enums/MatchStatus";

export const Matchs: Match[] = [
    new Match(Teams[0], Teams[5], 0, 0, null, null, null, null, Stadiums[0], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-11")),
    new Match(Teams[3], Teams[4], 0, 0, null, null, null, null, Stadiums[1], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-11")),
    new Match(Teams[1], Teams[2], 0, 0, null, null, null, null, Stadiums[2], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-12")),
    new Match(Teams[27], Teams[11], 0, 0, null, null, null, null, Stadiums[7], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-12")),
    new Match(Teams[12], Teams[6], 0, 0, null, null, null, null, Stadiums[3], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-13")),
    new Match(Teams[13], Teams[3], 0, 0, null, null, null, null, Stadiums[12], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-13")),
    new Match(Teams[32], Teams[15], 0, 0, null, null, null, null, Stadiums[4], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-14")),
    new Match(Teams[34], Teams[14], 0, 0, null, null, null, null, Stadiums[6], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-14")),
    new Match(Teams[28], Teams[29], 0, 0, null, null, null, null, Stadiums[2], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-15")),
    new Match(Teams[33], Teams[18], 0, 0, null, null, null, null, Stadiums[5], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-15")),
    new Match(Teams[30], Teams[16], 0, 0, null, null, null, null, Stadiums[8], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-16")),
    new Match(Teams[35], Teams[5], 0, 0, null, null, null, null, Stadiums[14], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-16")),
    new Match(Teams[37], Teams[21], 0, 0, null, null, null, null, Stadiums[9], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-17")),
    new Match(Teams[25], Teams[8], 0, 0, null, null, null, null, Stadiums[11], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-17")),
    new Match(Teams[22], Teams[9], 0, 0, null, null, null, null, Stadiums[13], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-18")),
    new Match(Teams[19], Teams[26], 0, 0, null, null, null, null, Stadiums[5], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-18")),
    new Match(Teams[36], Teams[24], 0, 0, null, null, null, null, Stadiums[10], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-19")),
    new Match(Teams[38], Teams[4], 0, 0, null, null, null, null, Stadiums[1], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-19")),
    new Match(Teams[31], Teams[17], 0, 0, null, null, null, null, Stadiums[7], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-20")),
    new Match(Teams[10], Teams[7], 0, 0, null, null, null, null, Stadiums[0], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-20")),
    new Match(Teams[20], Teams[23], 0, 0, null, null, null, null, Stadiums[3], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-21")),
    new Match(Teams[2], Teams[22], 0, 0, null, null, null, null, Stadiums[11], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-21")),
    new Match(Teams[27], Teams[31], 0, 0, null, null, null, null, Stadiums[7], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-22")),
    new Match(Teams[12], Teams[37], 0, 0, null, null, null, null, Stadiums[2], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-22")),
    new Match(Teams[34], Teams[25], 0, 0, null, null, null, null, Stadiums[6], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-23")),
    new Match(Teams[33], Teams[4], 0, 0, null, null, null, null, Stadiums[5], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-23")),
    new Match(Teams[13], Teams[38], 0, 0, null, null, null, null, Stadiums[12], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-24")),
    new Match(Teams[28], Teams[7], 0, 0, null, null, null, null, Stadiums[1], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-24")),
    new Match(Teams[35], Teams[19], 0, 0, null, null, null, null, Stadiums[14], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-25")),
    new Match(Teams[32], Teams[10], 0, 0, null, null, null, null, Stadiums[4], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-25")),
    new Match(Teams[30], Teams[20], 0, 0, null, null, null, null, Stadiums[8], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-26")),
    new Match(Teams[36], Teams[0], 0, 0, null, null, null, null, Stadiums[14], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-26")),
    new Match(Teams[1], Teams[23], 0, 0, null, null, null, null, Stadiums[9], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-27")),
    new Match(Teams[6], Teams[21], 0, 0, null, null, null, null, Stadiums[3], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-27")),
    new Match(Teams[14], Teams[8], 0, 0, null, null, null, null, Stadiums[6], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-27")),
    new Match(Teams[29], Teams[16], 0, 0, null, null, null, null, Stadiums[15], MatchStatus.SCHEDULED, MatchStage.GROUP, new Date("2026-06-27")),
];