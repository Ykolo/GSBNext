import { z } from 'zod';

export const familleSchema = z.object({ 
  id: z.string().max(10), 
  libelle: z.string().max(80, {message: 'Too long'}),
});
export type familleType = z.infer<typeof familleSchema>;