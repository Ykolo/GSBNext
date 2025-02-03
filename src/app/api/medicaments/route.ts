import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try{
    const medicaments = await prisma.medicament.findMany();
    if (!medicaments) {
      return NextResponse.json({success: false, error: 'Failed to fetch medicaments'}, {status: 500});
    }
    return NextResponse.json({success: true, data: medicaments}, {status: 200});
  }catch(e){
    console.error('Error getting medicaments', e);
    return NextResponse.json({success:false, error: 'Failed to fetch medicaments'}, {status: 500});
  }
};