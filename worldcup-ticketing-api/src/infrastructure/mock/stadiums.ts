import { Stadium } from "@domain/entities/Stadium";
import { Cities } from "./cities";

export const Stadiums: Stadium[] = [
    new Stadium("Mercedes-Benz Stadium", Cities[0], 67382),   // 0  - Atlanta
    new Stadium("Gillette Stadium", Cities[1], 63815),         // 1  - Boston
    new Stadium("AT&T Stadium", Cities[2], 70122),             // 2  - Dallas
    new Stadium("NRB Stadium", Cities[3], 68311),              // 3  - Houston
    new Stadium("Arrowhead Stadium", Cities[4], 67513),        // 4  - Kansas City
    new Stadium("SoFi Stadium", Cities[5], 70000),             // 5  - Los Angeles
    new Stadium("Hard Rock Stadium", Cities[6], 65000),        // 6  - Miami
    new Stadium("MetLife Stadium", Cities[7], 75000),          // 7  - New York
    new Stadium("Lincoln Financial Field", Cities[8], 70909),  // 8  - Philadelphia
    new Stadium("Lumen Field", Cities[9], 69000),              // 9  - Seattle
    new Stadium("Levi's Stadium", Cities[10], 70909),          // 10 - San Francisco
    new Stadium("Estadio Akron", Cities[11], 44330),           // 11 - Guadalajara
    new Stadium("Estadio Azteca", Cities[12], 72766),          // 12 - Mexico City
    new Stadium("Monterrey Estadio BBVA", Cities[13], 50113),  // 13 - Monterrey
    new Stadium("Vancouver BC Place", Cities[14], 54000),      // 14 - Vancouver
    new Stadium("BMO Field", Cities[15], 45000),               // 15 - Toronto
];