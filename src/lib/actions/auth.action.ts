"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { generateToken } from "../jwt";
import prisma from "../prisma";

interface CustomeJWTPayload {
  login: string;
  password: string;
}

const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
};

export const login = async (login: string, password: string) => {
  try {
    const visiteur = await prisma.visiteur.findFirst({
      where: { login },
    });
    const cleanedPassword = visiteur && visiteur.mdp?.replace(/ /g, "");
    const token = generateToken({ login, password });
    if (!visiteur) {
      return { success: false, error: "Utilisateur inexistant" };
    }
    if (cleanedPassword != password) {
      return { success: false, error: "Mot de passe incorrect" };
    }
    await setAuthToken(token);
    return { success: true };
  } catch (e: any) {
    console.error("Error login", e);
    return { success: false, error: "Erreur de connexion" + e.message };
  }
};

export const getUser = async () => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("auth_token");
  if (!tokenCookie || !tokenCookie.value) {
    console.error("No token found");
    return "No token found";
  }
  const token = tokenCookie.value;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomeJWTPayload;
    return { decoded };
  } catch (e) {
    console.error("Error getting user", e);
    return "Failed to get user";
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", "", { expires: new Date(0) });
};
