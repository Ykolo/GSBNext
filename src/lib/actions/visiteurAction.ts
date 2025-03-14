"use server";

import { visiteurType } from "../../types/visiteur";
import prisma from "../prisma";

export const getVisiteur = async (login: string, mdp: string) => {
  try {
    const response = await prisma.visiteur.findFirst({
      where: {
        login,
        mdp,
      },
    });
    return response;
  } catch (e: any) {
    console.error("Error getting visiteur", e);
    return {
      success: false,
      error: "Erreur lors de la récupération de visiteur" + e.message,
    };
  }
};

export const createVisiteur = async (visiteur: visiteurType) => {
  try {
    const visiteurExist = await prisma.visiteur.findMany({
      where: {
        login: visiteur.login,
      },
    });
    if (visiteurExist && visiteurExist.length > 0) {
      return {
        success: false,
        error: "Un visiteur avec ce login existe déjà",
      };
    }
    const response = await prisma.visiteur.create({
      data: {
        id: visiteur.id,
        timespan: visiteur.timespan,
        nom: visiteur.nom,
        prenom: visiteur.prenom,
        login: visiteur.login,
        mdp: visiteur.mdp,
        adresse: visiteur.adresse,
        cp: visiteur.cp,
        ville: visiteur.ville,
        dateembauche: visiteur.dateembauche,
        ticket: visiteur.ticket,
        rapport:
          visiteur.rapport && visiteur.rapport.length > 0
            ? {
                create: visiteur.rapport.map(r => ({
                  date: r.date,
                  motif: r.motif,
                  bilan: r.bilan,
                  idmedecin: r.idmedecin,
                })),
              }
            : undefined,
      },
    });
    return { success: true, response };
  } catch (e: any) {
    console.error("Error creating visiteur", e);
    return {
      success: false,
      error: "Erreur lors de la creation de visiteur" + e.message,
    };
  }
};
