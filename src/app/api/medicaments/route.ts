import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { medicamentSchema } from '../../../types/medicament';

export const GET = async (): Promise<NextResponse> => {
  try{
    const medicaments = await prisma.medicament.findMany();
    if (!medicaments) {
      return NextResponse.json({success: false, error: 'Failed to fetch medicaments'}, {status: 500});
    }
    const parsedMedicaments = medicamentSchema.array().parse(medicaments);
    return NextResponse.json(parsedMedicaments, {status: 200});
  }catch(e){
    console.error('Error getting medicaments', e);
    return NextResponse.json({success:false, error: 'Failed to fetch medicaments'}, {status: 500});
  }
};