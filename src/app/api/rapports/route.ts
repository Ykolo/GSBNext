import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { rapportSchema } from '../../../types/rapport';

export const GET = async (): Promise<NextResponse> => {
  try {
    const rapports = await prisma.rapport.findMany();
    if (!rapports) {
      return NextResponse.json({success: false, error: 'Failed to fetch rapports'}, { status: 500 });
    }
    const parsedRapports = rapportSchema.array().parse(rapports);
    return NextResponse.json({success: true, data: parsedRapports}, { status: 200 });
  } catch (e) {
    console.error('Error getting rapports', e);
    return NextResponse.json({success:false, error: 'Failed to fetch rapports' }, { status: 500 });
  }
};