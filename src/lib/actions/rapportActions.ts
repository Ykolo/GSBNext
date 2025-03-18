"use server";

import { rapportSchema } from "@/types/rapport";
import prisma from "../prisma";

export const getRapports = async () => {
  try {
    const response = await prisma.rapport.findMany();
    const parsedResponse = rapportSchema.array().parse(response);
    return parsedResponse;
  } catch (e) {
    console.error("Error getting rapports", e);
    throw new Error("Failed to fetch rapports");
  }
};

export const getRapport = async (id: number) => {
  try {
    const response = await prisma.rapport.findUnique({
      where: { id },
    });
    const parsedResponse = rapportSchema.parse(response);
    return parsedResponse;
  } catch (e) {
    console.error("Error getting rapport", e);
    throw new Error("Failed to fetch rapport");
  }
};

export const getRapportsByDate = async (date: Date) => {
  try {
    const response = await prisma.rapport.findMany({
      where: { date },
    });
    const parsedResponse = rapportSchema.array().parse(response);
    return parsedResponse;
  } catch (e) {
    console.error("Error getting rapports by date", e);
    throw new Error("Failed to fetch rapports by date");
  }
};

export const updateRapport = async (
  id: number,
  motif?: string,
  bilan?: string
) => {
  try {
    const response = await prisma.rapport.update({
      where: { id },
      data: {
        motif,
        bilan,
      },
    });
    const parsedResponse = rapportSchema.parse(response);
    return parsedResponse;
  } catch (e: any) {
    console.error("Error updating rapport", e.message);
    throw new Error("Failed to update rapport");
  }
};

export const createRapport = async (
  idMedecin: number,
  idVisiteur: string,
  bilan: string,
  motif: string,
  date: Date,
  medicaments?: [{ idMedicament: string; qte: number }]
) => {
  try {
    const lastRapport = await prisma.rapport.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const nextId = lastRapport ? lastRapport.id + 1 : 1;

    const response = await prisma.rapport.create({
      data: {
        id: nextId,
        idmedecin: idMedecin,
        idvisiteur: idVisiteur,
        bilan,
        motif,
        date,
      },
    });

    const idRapport = response.id;

    if (medicaments && medicaments.length > 0) {
      await Promise.all(
        medicaments.map(medicament =>
          prisma.offrir.create({
            data: {
              idrapport: idRapport,
              idmedicament: medicament.idMedicament,
              quantite: medicament.qte,
            },
          })
        )
      );
    }

    const parsedResponse = rapportSchema.parse(response);
    return { success: true, parsedResponse };
  } catch (e: any) {
    console.error("Error creating rapport", e);
    if (e.code === "P2002") {
      console.log("Attempting to recover from ID collision...");
      throw new Error(`ID collision detected. Please try again.`);
    }
    throw new Error(`Failed to create rapport: ${e.message}`);
  }
};

export const deleteRapport = async (id: number) => {
  try {
    console.log("📌 Tentative de suppression du rapport ID :", id);

    const rapport = await prisma.rapport.findUnique({
      where: { id },
      include: { offrir: true },
    });

    if (!rapport) {
      console.warn(`🚨 Rapport ${id} introuvable`);
      return { error: "Le rapport n'existe pas." };
    }

    if (rapport.offrir.length > 0) {
      await prisma.offrir.deleteMany({
        where: { idrapport: id },
      });
      console.log(`✅ Offres liées au rapport ${id} supprimées`);
    }

    await prisma.rapport.delete({
      where: { id },
    });

    console.log(`✅ Rapport ${id} supprimé avec succès`);
    return { success: true };
  } catch (e: any) {
    console.error("🚨 Erreur lors de la suppression :", e);
    return { error: `Échec de la suppression : ${e.message}` };
  }
};
