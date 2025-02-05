import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { medecinSchema } from '../../../../types/medecin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const medecin = await prisma.medecin.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!medecin) {
      return NextResponse.json(
        { message: 'Médecin non trouvé' },
        { status: 404 }
      );
    }
    const parsedMedecin = medecinSchema.parse(medecin);
    return NextResponse.json(parsedMedecin, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
