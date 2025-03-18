import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="m-8 p-4 text-xl font-bold">
      <ul className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <li>
            <Link href={"/"}>
              <Button variant={"link"} className="text-3xl font-bold">
                GSB
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <Button variant={"link"}>Liste des médecins</Button>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard"}>
              <Button variant={"link"}>Dashboard</Button>
            </Link>
          </li>
        </div>
        <div className="flex items-center gap-5">
          {/* <ModeToogle /> */}
          <li>
            <Link href={"/connexion"}>
              <Button variant={"outline"} className="py-6">
                Connexion
              </Button>
            </Link>
          </li>
          <li>
            <Link href={"/inscription"}>
              <Button className="py-6">Inscription</Button>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};
export default Navbar;
