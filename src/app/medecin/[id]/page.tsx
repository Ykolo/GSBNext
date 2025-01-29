'use client';

import { getMedecin } from "@/lib/actions/medecinActions";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { Navbar } from "../../../components/Navbar";

const MedecinPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);

  const { data: medecin, isLoading, isError } = useQuery({
    queryKey: ['medecin', resolvedParams.id],
    queryFn: () => getMedecin(parseInt(resolvedParams.id)),
  });

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Une erreur est survenue</p>;
  if (!medecin) return <p>Aucun medecin trouvé</p>;

  return(
      <div>
        <Navbar />
          <div className="flex flex-col items-center justify-center">
            <p>Voici le medecin {medecin.nom} </p>
          </div>
      </div>
  );
};
export default MedecinPage;