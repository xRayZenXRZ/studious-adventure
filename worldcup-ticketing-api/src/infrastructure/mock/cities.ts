import { City } from "@domain/entities/City";
import { Countries } from "./countries";

export const Cities: City[] = [
    new City(Countries[0], "Atlanta"),       // 0  - USA
    new City(Countries[0], "Boston"),        // 1  - USA
    new City(Countries[0], "Dallas"),        // 2  - USA
    new City(Countries[0], "Houston"),       // 3  - USA
    new City(Countries[0], "Kansas City"),   // 4  - USA
    new City(Countries[0], "Los Angeles"),   // 5  - USA
    new City(Countries[0], "Miami"),         // 6  - USA
    new City(Countries[0], "New York"),      // 7  - USA
    new City(Countries[0], "Philadelphia"),  // 8  - USA
    new City(Countries[0], "Seattle"),       // 9  - USA
    new City(Countries[0], "San Francisco"), // 10 - USA
    new City(Countries[1], "Guadalajara"),   // 11 - Mexico
    new City(Countries[1], "Mexico City"),   // 12 - Mexico
    new City(Countries[1], "Monterrey"),     // 13 - Mexico
    new City(Countries[2], "Vancouver"),     // 14 - Canada
    new City(Countries[2], "Toronto"),      // 15 - Canada
];