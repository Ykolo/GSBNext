import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { medecinSchema } from '../../../../types/medecin';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nom = searchParams.get('nom') || '';

    const medecin = await prisma.medecin.findMany({
      where: {
        nom: {
          contains: nom,
          mode: 'insensitive'
        }
      }
    });
    if (!medecin) {
      return NextResponse.json({
        success: false,
        error: 'No medecins found'
      }, { status: 404 });
    }
    const parsedMedecin = medecinSchema.array().parse(medecin);
    return NextResponse.json(parsedMedecin, { status: 200 });

  } catch (e) {
    console.error('Error searching medecins:', e);
    return NextResponse.json({
      success: false,
      error: 'Failed to search medecins'
    }, { status: 500 });
  }
}
