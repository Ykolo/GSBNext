import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const spe = searchParams.get("spe") || "";
    const medecins = await prisma.medecin.findMany({
      where: {
        specialitecomplementaire: {
          contains: spe,
          mode: "insensitive",
        },
      },
    });
    if (!medecins) {
      return NextResponse.json(
        { success: false, error: "Aucun médecin trouvé" },
        { status: 404 }
      );
    }
    return NextResponse.json(medecins, { status: 200 });
  } catch (e) {
    console.error("Error getting medecins", e);
    return NextResponse.json(
      { success: false, error: "Failed to fetch medecins" },
      { status: 500 }
    );
  }
};
