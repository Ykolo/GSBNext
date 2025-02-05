import { z } from 'zod';
import { rapportSchema } from './rapport';

export const medecinSchema = z.object({
  id: z.number().int(),
  nom: z.string().max(30, { message: 'Too long' }),
  prenom: z.string().max(30, { message: 'Too long' }),
  adresse: z.string().max(80, { message: 'Too long' }),
  tel: z.string().max(15, { message: 'Too long' }).nullish(),
  specialitecomplementaire: z
    .string()
    .max(50, { message: 'Too long' })
    .nullish(),
  departement: z.number().int(),
  rapport: z.array(z.lazy(() => rapportSchema)).nullish(),
});
export type medecinType = z.infer<typeof medecinSchema>;
