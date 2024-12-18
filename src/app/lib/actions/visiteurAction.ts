'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVisiteur = async (login: string, mdp: string) =>{
  try{
    const response = await prisma.visiteur.findFirst({
      where: {
        login,
        mdp
      }
    });
    return response;
  }catch(e){
    console.error('Error getting visiteur', e);
    throw new Error('Failed to fetch visiteur');
  }
};