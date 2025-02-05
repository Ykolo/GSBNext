import { medecinType } from '@/types/medecin';
import Link from 'next/link';
import { LuHouse, LuPhone } from 'react-icons/lu';

export const MedecinCard = ({ medecin }: { medecin: medecinType }) => {
  return (
    <div className="flex flex-col justify-center gap-2 rounded-lg border-2 border-black p-4">
      <div>
        <p className="text-xl font-bold">
          Dr. {medecin.prenom} {medecin.nom}
        </p>
      </div>
      <p>{medecin.specialitecomplementaire}</p>
      <div className="flex gap-2">
        <LuHouse size={20} />
        <p>{medecin.adresse}</p>
      </div>
      <div className="flex gap-2">
        <LuPhone size={20} />
        <p>{medecin.tel}</p>
      </div>
      <Link href={`/medecin/${medecin.id}`} prefetch={true}>
        Organiser une visite
      </Link>
    </div>
  );
};
