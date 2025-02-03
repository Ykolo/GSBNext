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
      <div>
        <div className="m-8 p-4">
          <h1>Détails du médecin:</h1>
            <p>-{medecin.nom}  + {medecin.prenom}</p>
            <p>-{medecin.adresse}</p>
        </div>
        <div className="m-8 p-4">
          <h1>Rapports</h1>
        </div>
      </div>
    </div>
  );
};

export default MedecinPage;