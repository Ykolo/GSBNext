import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="m-8 p-4 text-xl font-bold">
      <ul className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <li className="text-3xl">
            <Link href={'/'}>GSB</Link>
          </li>
          <li>
            <Link href={'/'}>Liste des médecins</Link>
          </li>
          <li>
            <Link href={'/visite'}>Mes visites</Link>
          </li>
        </div>
        <div className="flex items-center gap-5">
          <li>
            <Link
              href={'/connexion'}
              className="rounded-2xl border-2 border-black px-2 py-3 shadow-sm hover:bg-slate-100 hover:shadow-lg"
            >
              Connexion
            </Link>
          </li>
          <li>
            <Link
              href={'/inscription'}
              className="rounded-2xl border-2 border-black bg-black px-2 py-3 text-white hover:bg-slate-800"
            >
              Inscription
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};
export default Navbar;
