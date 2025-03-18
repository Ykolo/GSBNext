import { z } from "zod";
import { offrirSchema } from "./offrir";

const visiteurSchema = z.object({
  nom: z.string().max(50, { message: "Too long" }).nullish(),
  prenom: z.string().max(50, { message: "Too long" }).nullish(),
});

export const rapportSchema = z.object({
  id: z.number().int(),
  date: z.date().nullish(),
  motif: z.string().max(100, { message: "Too long" }).nullish(),
  bilan: z.string().max(100, { message: "Too long" }).nullish(),
  idvisiteur: z.string().max(4),
  idmedecin: z.number().int(),
  offrir: z.array(z.lazy(() => offrirSchema)).nullish(),
  visiteur: visiteurSchema.nullish(),
});

export type rapportType = z.infer<typeof rapportSchema>;

export const rapportMedecinSchema = z.object({
  id: z.number().int(),
  nom: z.string().max(30, { message: "Too long" }).nullish(),
  prenom: z.string().max(30, { message: "Too long" }).nullish(),
  adresse: z.string().max(80, { message: "Too long" }).nullish(),
  tel: z.string().max(15, { message: "Too long" }).nullish(),
  specialitecomplementaire: z
    .string()
    .max(50, { message: "Too long" })
    .nullish(),
  departement: z.number().int().nullish(),
  rapport: z.array(z.lazy(() => rapportSchema)).nullish(),
});

export type rapportMedecinType = z.infer<typeof rapportMedecinSchema>;

// Nouveau schéma pour les médecins
export const medecinSchema = z.object({
  id: z.number().int(),
  nom: z.string().max(30, { message: "Too long" }).nullish(),
  prenom: z.string().max(30, { message: "Too long" }).nullish(),
  adresse: z.string().max(80, { message: "Too long" }).nullish(),
  tel: z.string().max(15, { message: "Too long" }).nullish(),
  specialitecomplementaire: z
    .string()
    .max(50, { message: "Too long" })
    .nullish(),
  departement: z.number().int().nullish(),
});

export type MedecinType = z.infer<typeof medecinSchema>;

// Nouveau schéma pour les rapports qui incluent les données du médecin
export const rapportWithMedecinSchema = rapportSchema.extend({
  medecin: medecinSchema.nullish(),
});

export type RapportWithMedecinType = z.infer<typeof rapportWithMedecinSchema>;
