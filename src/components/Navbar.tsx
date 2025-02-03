import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="m-8 p-4 text-xl font-bold">
      <ul className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <li className="text-3xl">GSB</li>
          <li>Liste des médecins</li>
          <li>Mes visites</li>
        </div>
        <div className="flex items-center gap-5">
          <li>
            <Link
              href={"/connexion"}
              className="border-2 border-black px-2 rounded-2xl py-3 shadow-sm hover:shadow-lg hover:bg-slate-100"> 
              Connexion
            </Link>
          </li>
          <li>
            <Link
              href={"/inscription"}
              className="border-2 border-black px-2 rounded-2xl text-white bg-black py-3 hover:bg-slate-800">
              Inscription
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};