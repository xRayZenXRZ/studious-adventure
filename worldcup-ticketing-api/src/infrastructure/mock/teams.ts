import { Team } from "@domain/entities/Team";
import { FifaCode } from "@domain/entities/value-objects/FifaCode";

export const Teams: Team[] = [
    // CONCACAF - Hosts
    new Team("Canada", new FifaCode("CAN")),      // 0
    new Team("États-Unis", new FifaCode("USA")),  // 1
    new Team("Mexique", new FifaCode("MEX")),     // 2

    // CAF
    new Team("Maroc", new FifaCode("MAR")),           // 3
    new Team("Tunisie", new FifaCode("TUN")),          // 4
    new Team("Égypte", new FifaCode("EGY")),           // 5
    new Team("Algérie", new FifaCode("ALG")),          // 6
    new Team("Ghana", new FifaCode("GHA")),            // 7
    new Team("Cap-Vert", new FifaCode("CPV")),         // 8
    new Team("Afrique du Sud", new FifaCode("RSA")),   // 9
    new Team("Côte d'Ivoire", new FifaCode("CIV")),   // 10
    new Team("Sénégal", new FifaCode("SEN")),         // 11

    // CONMEBOL
    new Team("Argentine", new FifaCode("ARG")),   // 12
    new Team("Brésil", new FifaCode("BRA")),      // 13
    new Team("Uruguay", new FifaCode("URU")),     // 14
    new Team("Équateur", new FifaCode("ECU")),    // 15
    new Team("Colombie", new FifaCode("COL")),    // 16
    new Team("Paraguay", new FifaCode("PAR")),    // 17

    // AFC
    new Team("Japon", new FifaCode("JPN")),            // 18
    new Team("Iran", new FifaCode("IRN")),             // 19
    new Team("Ouzbékistan", new FifaCode("UZB")),      // 20
    new Team("Jordanie", new FifaCode("JOR")),         // 21
    new Team("Corée du Sud", new FifaCode("KOR")),     // 22
    new Team("Australie", new FifaCode("AUS")),        // 23
    new Team("Qatar", new FifaCode("QAT")),            // 24
    new Team("Arabie saoudite", new FifaCode("KSA")),  // 25

    // OFC
    new Team("Nouvelle-Zélande", new FifaCode("NZL")), // 26

    // UEFA
    new Team("France", new FifaCode("FRA")),      // 27
    new Team("Angleterre", new FifaCode("ENG")),  // 28
    new Team("Croatie", new FifaCode("CRO")),     // 29
    new Team("Portugal", new FifaCode("POR")),    // 30
    new Team("Norvège", new FifaCode("NOR")),     // 31
    new Team("Allemagne", new FifaCode("GER")),   // 32
    new Team("Pays-Bas", new FifaCode("NED")),    // 33
    new Team("Espagne", new FifaCode("ESP")),     // 34
    new Team("Belgique", new FifaCode("BEL")),    // 35
    new Team("Suisse", new FifaCode("SUI")),      // 36
    new Team("Autriche", new FifaCode("AUT")),    // 37
    new Team("Écosse", new FifaCode("SCO")),      // 38

    // UEFA
    new Team("Albanie", new FifaCode("ALB")),              // 39
    new Team("Bosnie-Herzégovine", new FifaCode("BIH")),   // 40
    new Team("Danemark", new FifaCode("DEN")),             // 41
    new Team("Irlande", new FifaCode("IRL")),              // 42
    new Team("Irlande du Nord", new FifaCode("NIR")),      // 43
    new Team("Italie", new FifaCode("ITA")),               // 44
    new Team("Kosovo", new FifaCode("KOS")),               // 45
    new Team("Macédoine du Nord", new FifaCode("MKD")),    // 46
    new Team("Pays de Galles", new FifaCode("WAL")),       // 47
    new Team("Pologne", new FifaCode("POL")),              // 48
    new Team("Roumanie", new FifaCode("ROU")),             // 49
    new Team("Slovaquie", new FifaCode("SVK")),            // 50
    new Team("Suède", new FifaCode("SWE")),                // 51
    new Team("Tchéquie", new FifaCode("CZE")),             // 52
    new Team("Turquie", new FifaCode("TUR")),              // 53
    new Team("Ukraine", new FifaCode("UKR")),              // 54

    // Playoff
    new Team("Bolivie", new FifaCode("BOL")),                          // 55
    new Team("République démocratique du Congo", new FifaCode("COD")), // 56
    new Team("Irak", new FifaCode("IRQ")),                             // 57
    new Team("Nouvelle-Calédonie", new FifaCode("NCL")),               // 58
    new Team("Jamaïque", new FifaCode("JAM")),                         // 59
    new Team("Suriname", new FifaCode("SUR")),                         // 60
];