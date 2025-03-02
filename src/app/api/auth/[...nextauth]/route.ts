import argon2 from "argon2";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";

interface Credentials {
  login: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Name & Password",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          return null;
        }

        try {
          const paddedLogin = credentials.login.padEnd(20);
          const user = await prisma.visiteur.findFirst({
            where: { login: paddedLogin },
          });

          if (!user || !user.mdp) {
            return null;
          }

          const userInfo = {
            id: user.id,
            email: user.login?.trim() || "",
            name: user.nom?.trim() || "",
          };

          const storedPassword = user.mdp.trim();
          const providedPassword = credentials.password;

          // Simple text comparison first
          if (storedPassword === providedPassword) {
            // Silently try to update to hash if plain text matches
            try {
              const newHash = await argon2.hash(providedPassword);
              await prisma.visiteur.update({
                where: { id: user.id },
                data: { mdp: newHash },
              });
            } catch {
              // Ignore update errors, just continue with auth
            }
            return userInfo;
          }

          // Try argon2 verify for hashed passwords
          if (storedPassword.startsWith("$")) {
            try {
              const isValid = await argon2.verify(
                storedPassword,
                providedPassword
              );
              if (isValid) {
                return userInfo;
              }
            } catch {
              // Ignore verify errors, authentication will fail
            }
          }

          return null;
        } catch {
          // Return null for any errors to avoid exposing details
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
