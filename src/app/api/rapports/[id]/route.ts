import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { rapportSchema } from '../../../../types/rapport';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const idMedecin = Number(id);
    if (isNaN(idMedecin)) {
      return NextResponse.json({ message: 'ID médecin invalide' }, { status: 400 });
    }
    const rapports = await prisma.rapport.findMany({
      where: {
        idmedecin: idMedecin 
      },
      include: {
        visiteur: {
          select: {
            id: true,
            nom: true,
            prenom: true
          }
        }
      }
    });

    if (rapports.length === 0) {
      return NextResponse.json({ message: 'Aucun rapport trouvé' }, { status: 404 });
    }
    const parsedRapports = rapportSchema.array().parse(rapports);

    return NextResponse.json(parsedRapports, { status: 200 });
  } catch (error: any) {
    console.error('Erreur API GET rapports:', error);
    return NextResponse.json(
      { message: 'Erreur serveur', error: error.message },
      { status: 500 }
    );
  }
}
