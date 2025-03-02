"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormConnexion = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const router = useRouter();
  if (session) {
    return (
      <div>
        <p>Bienvenue {session?.user?.name}</p>
        <button onClick={() => signOut()}>Déconnexion</button>
      </div>
    );
  }
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      login: formData.get("login")?.toString(),
      password: formData.get("password")?.toString(),
      redirect: false,
    });
    if (response?.error) {
      setMessage("Connexion échouée");
    } else {
      router.push("/");
    }
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="ml-4">
          Pseudo
        </label>
        <input
          type="text"
          id="login"
          name="login"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Pseudo"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="ml-4">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Mot de passe"
        />
      </div>
      <button
        type="submit"
        className="rounded-4xl bg-black p-2 text-white hover:bg-gray-700"
      >
        Connexion
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};
export default FormConnexion;
