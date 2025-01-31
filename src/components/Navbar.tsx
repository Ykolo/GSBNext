import Link from "next/link";
import { LuUser } from "react-icons/lu";

export const Navbar = () => {
  return (
    <div className="m-8 p-4 text-xl font-bold">
      <ul className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <li className="text-3xl">GSB</li>
          <li>Liste des médecins</li>
          <li>Mes visites</li>
        </div>
        <li>
          <Link href={"/connexion"}>
            <div className="flex items-center cursor-pointer border-2 border-black rounded-full p-2 hover:bg-black hover:text-white">
              <LuUser size={32} />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};