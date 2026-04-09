import { z } from "zod";

export const CreateTicketSchema = z.object({
    matchId: z.int("input non entier").positive("Entier non positive "),
    seat: z.string("input non chaîne de caractère").min(1, "chaine de caractère null").max(10, "chaine de caractère depassant"),
    customer: z.object({
        firstname: z.string("input non chaîne de caractère").min(1, "chaine de caractère null"),
        lastname: z.string("input non chaîne de caractère").min(1, "chaine de caractère null"),
        email: z.email("non email"),
    }),
});