'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

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
    return NextResponse.json({error: 'Failed to fetch visiteur'}, {status: 500});
  }
};