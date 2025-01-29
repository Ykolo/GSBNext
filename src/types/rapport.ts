import { z } from 'zod';
import { offrirSchema } from './offrir';

export const rapportSchema = z.object({
  id: z.number().int(),
  date: z.date().nullish(),
  motif: z.string().max(100, {message: 'Too long'}).nullish(),
  bilan: z.string().max(100, {message: 'Too long'}).nullish(),
  idvisiteur: z.string().max(4),
  idmedecin: z.number().int(),
  offrir: z.array(z.lazy(()=>offrirSchema)).nullish(),
});

export type rapportType = z.infer<typeof rapportSchema>;


