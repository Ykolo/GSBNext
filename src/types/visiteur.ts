import { z } from 'zod';
import { rapportSchema } from './rapport';

export const visiteurSchema = z.object({
  id: z.string(),
  nom: z.string().max(30, { message: 'Too long' }).nullish(),
  prenom: z.string().max(30, { message: 'Too long' }).nullish(),
  login: z.string().max(20, { message: 'Too long' }).nullish(),
  mdp: z.string().max(20, { message: 'Too long' }).nullish(),
  adresse: z.string().max(30, { message: 'Too long' }).nullish(),
  cp: z.string().length(5, { message: 'Must be 5 characters' }).nullish(),
  ville: z.string().max(30, { message: 'Too long' }).nullish(),
  dateembauche: z.date().nullish(),
  timespan: z.bigint(),
  ticket: z.string().nullish(),
  rapport: z.array(z.lazy(() => rapportSchema)).nullish(),
});
export type visiteurType = z.infer<typeof visiteurSchema>;
