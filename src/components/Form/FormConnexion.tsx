const FormConnexion = () => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="ml-4">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="rounded-4xl border-2 border-black p-2"
          placeholder="Email"
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
          className="rounded-4xl border-2 border-black p-2"
          placeholder="Mot de passe"
        />
      </div>
      <button
        type="submit"
        className="rounded-4xl bg-black p-2 text-white hover:bg-gray-700"
      >
        Connexion
      </button>
    </form>
  );
};
export default FormConnexion;
