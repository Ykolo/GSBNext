"use server";

import argon2 from "argon2";
import prisma from "../prisma";

const generateVisiteurId = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
};
const padChar = (str: string | null | undefined, length: number) => {
  return str ? str.padEnd(length) : null;
};

export const resgisterUser = async (formData: FormData) => {
  try {
    const login = formData.get("login")?.toString();
    const password = formData.get("password")?.toString();
    const nom = formData.get("nom")?.toString();
    const prenom = formData.get("prenom")?.toString();
    const adresse = formData.get("adresse")?.toString();
    const ville = formData.get("ville")?.toString();
    const cp = formData.get("cp")?.toString();
    const date = formData.get("date")?.toString();

    if (!login || !password) {
      return { error: "Email ou mot de passe manquant" };
    }

    const existingUser = await prisma.visiteur.findFirst({
      where: { login: padChar(login, 20) },
    });

    if (existingUser) {
      return { error: "Cet email est déjà utilisé" };
    }

    const hashedPassword = await argon2.hash(password);

    const user = await prisma.visiteur.create({
      data: {
        id: generateVisiteurId(),
        login: padChar(login, 20),
        mdp: hashedPassword,
        nom: padChar(nom, 30),
        prenom: padChar(prenom, 30),
        adresse: padChar(adresse, 30),
        ville: padChar(ville, 30),
        cp: padChar(cp, 5),
        dateembauche: padChar(date, 10),
        timespan: BigInt(Date.now()),
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    return {
      error: `Erreur lors de la création du compte: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
    };
  }
};
