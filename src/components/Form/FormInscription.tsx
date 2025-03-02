"use client";

import { useState } from "react";
import { resgisterUser } from "../../lib/actions/authAction";

const FormInscription = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await resgisterUser(formData);
    setMessage(result.error || "Inscription reussie");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="nom" className="ml-4">
          Nom
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Nom"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="prenom" className="ml-4">
          Prénom
        </label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Prénom"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="adresse" className="ml-4">
          Adresse
        </label>
        <input
          type="text"
          id="adresse"
          name="adresse"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Adresse"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ville" className="ml-4">
          Ville
        </label>
        <input
          type="text"
          id="ville"
          name="ville"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Ville"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="cp" className="ml-4">
          Code postal
        </label>
        <input
          type="text"
          id="cp"
          name="cp"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Code postal"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="ml-4">
          Date de naissance
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="rounded-4xl border-2 border-black p-2 pl-4"
          placeholder="Date de naissance"
        />
      </div>
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
        Inscription
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
export default FormInscription;
