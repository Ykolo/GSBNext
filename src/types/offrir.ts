import { z } from 'zod';

export const offrirSchema = z.object({
  idrapport: z.number().int(),
  idmedicament: z.string(),
  quantite: z.number().int().nullish(),

});
export type offrirType = z.infer<typeof offrirSchema>;