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

  return (
    isLoading ? <p>Chargement...</p> :
    isError ? <p>Une erreur est survenue</p> :
    !medecin ? <p>Aucun medecin trouvé</p> :
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <p>Voici le medecin {medecin.nom} </p>
      </div>
    </div>
  );
};

export default MedecinPage;