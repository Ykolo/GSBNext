import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try{
    const medecins = await prisma.medecin.findMany();
    if (!medecins) {
      return NextResponse.json({success: false, error: 'Failed to fetch medecins'}, {status: 500});
    }
    return NextResponse.json({success: true, data: medecins}, {status: 200});
  }catch(e){
    console.error('Error getting medecins', e);
    return NextResponse.json({success: false, error: 'Failed to fetch medecins'}, {status: 500});
  }
};