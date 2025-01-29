'use server';

import { medicamentSchema } from '@/types/medicament';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getMedicaments = async () => {
  try{
    const response = await prisma.medicament.findMany();
    const parsedResponse = medicamentSchema.array().parse(response);
    return parsedResponse;
  }catch(e){
    console.error('Error getting medicaments', e);  
    throw new Error('Failed to fetch medicaments');
  }
};