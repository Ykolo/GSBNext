import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  context: Props
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    
    const medecin = await prisma.medecin.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!medecin) {
      return NextResponse.json({ 
        success: false, 
        error: 'Medecin not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true, 
      data: medecin
    }, { status: 200 });

  } catch(e) {
    console.error('Error getting medecin', e);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch medecin' 
    }, { status: 500 });
  }
}