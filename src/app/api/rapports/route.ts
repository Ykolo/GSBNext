import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const GET = async (): Promise<NextResponse> => {
  try {
    const rapports = await prisma.rapport.findMany();
    return NextResponse.json({success: true, data: rapports}, { status: 200 });
  } catch (e) {
    console.error('Error getting rapports', e);
    return NextResponse.json({success:false, error: 'Failed to fetch rapports' }, { status: 500 });
  }
};