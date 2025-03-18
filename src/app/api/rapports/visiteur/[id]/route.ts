import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "ID du visiteur non fourni" },
        { status: 400 }
      );
    }
    const idVisiteur = id;
    console.log("idVisiteur", idVisiteur);

    const rapports = await prisma.rapport.findMany({
      where: {
        idvisiteur: idVisiteur,
      },
      orderBy: { id: "asc" },
    });
    const medecins = await prisma.medecin.findMany({
      where: {
        id: {
          in: rapports.map(rapport => rapport.idmedecin),
        },
      },
    });
    const data = rapports.map(rapport => ({
      ...rapport,
      medecin: medecins.find(medecin => medecin.id === rapport.idmedecin),
    }));
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    console.error("Error getting rapports", e);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch rapports",
    });
  }
};
