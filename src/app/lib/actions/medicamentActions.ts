'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { medicamentSchema } from '../../types/medicament';

const prisma = new PrismaClient();
export const getMedicaments = async () => {
  try{
    const response = await prisma.medicament.findMany();
    const parsedResponse = medicamentSchema.array().parse(response);
    return NextResponse.json(parsedResponse);
  }catch(e){
    console.error('Error getting medicaments', e);  
    return NextResponse.json({error: 'Failed to fetch medicaments'}, {status: 500});
  }
};