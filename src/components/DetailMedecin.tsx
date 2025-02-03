'use client';

import { fetchMedecin } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface DetailMedecinProps {
  medecinId: number;
}

const DetailMedecin = ({ medecinId }: DetailMedecinProps) => {
  const { data: medecin, isLoading, isError } = useQuery({
    queryKey: ['medecin', medecinId],
    queryFn: () => fetchMedecin(medecinId)
  });

  return (
    isLoading ? <p>Chargement...</p> :
    isError ? <p>Une erreur est survenue</p> :
    !medecin ? <p>Aucun medecin trouvé</p> :
    <div>
      <div>
        <div className="ml-8 mt-4 p-4">
          <h1>Détails du médecin:</h1>
            <p>-{medecin.nom}  + {medecin.prenom}</p>
            <p>-{medecin.adresse}</p>
        </div>
        <div className="ml-8 mt-4 p-4">
          <h1>Rapport(s):</h1>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Date</th>
                <th>Bilan</th>
                <th>Motif</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailMedecin;