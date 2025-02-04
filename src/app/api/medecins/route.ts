import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { medecinSchema } from '../../../types/medecin';

export const GET = async (): Promise<NextResponse> => {
  try{
    const medecin = await prisma.medecin.findMany(
      {
        orderBy: {
          nom: 'asc'
        }
      }
    );
    if (!medecin) {
      return NextResponse.json({success: false, error: 'Failed to fetch medecins'}, {status: 500});
    }
    const parsedMedecin = medecinSchema.array().parse(medecin)
    return NextResponse.json(parsedMedecin, {status: 200});
  }catch(e){
    console.error('Error getting medecins', e);
    return NextResponse.json({success: false, error: 'Failed to fetch medecins'}, {status: 500});
  }
};