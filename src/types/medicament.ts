import { z } from 'zod';
import { familleSchema } from './famille';
import { offrirSchema } from './offrir';

export const medicamentSchema = z.object({
  id: z.string().max(30),
  nomcommercial: z.string().max(80, { message: 'Too long' }),
  idfamille: z.string().max(10),
  composition: z.string().max(255, { message: 'Too long' }),
  effets: z.string().max(255, { message: 'Too long' }),
  contreindications: z.string().max(255, { message: 'Too long' }),
  famille: z.lazy(() => familleSchema).nullish(),
  offrir: z.array(z.lazy(() => offrirSchema)).nullish(),
});
export type medicamentType = z.infer<typeof medicamentSchema>;
