'use client';

import { fetchMedecin, fetchRapportsByMedecin } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { rapportType } from "../types/rapport";

interface DetailMedecinProps {
  medecinId: number;
}

const DetailMedecin = ({ medecinId }: DetailMedecinProps) => {
  const { data: medecin, isLoading, isError } = useQuery({
    queryKey: ['medecin', medecinId],
    queryFn: () => fetchMedecin(medecinId)
  });

  const { data: rapports, isError: isRapportsError } = useQuery({
    queryKey: ['rapports', medecinId],
    queryFn: () => fetchRapportsByMedecin(medecinId),
    initialData: [] as rapportType[],
  });

  const rapportsList = Array.isArray(rapports) ? rapports : [];

  return (
    isLoading ? <p>Chargement...</p> :
      isError ? <p>Une erreur est survenue</p> :
        !medecin ? <p>Aucun medecin trouvé</p> :
          <div className="w-full mr-4">
            <div className="ml-8 mt-4 p-4">
              <h1 className="text-2xl">Détails du médecin:</h1>
              <p>-{medecin.nom} {medecin.prenom}</p>
              <p>-{medecin.adresse}</p>
            </div>
            <div className="ml-8 mt-4 p-4">
              <h1 className="text-2xl">Rapport(s):</h1>
              <div className="mt-8 flex flex-wrap justify-between w-full">
                <table className="border-collapse w-full mr-4">
                  <thead>
                    <tr className="text-center border-b-2 border-black">
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Date</th>
                      <th>Bilan</th>
                      <th>Motif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !isRapportsError && rapportsList.map((rapport: rapportType) => {
                        return (
                          <tr key={rapport.id} className="text-center border-b-2 border-gray-300">
                            <td>{rapport.visiteur?.nom || 'N/A'} </td>
                            <td>{rapport.visiteur?.prenom || 'N/A'} </td>
                            <td>{rapport.date ? new Date(rapport.date).toLocaleDateString() : 'Non définie'}</td>
                            <td>{rapport.bilan}</td>
                            <td>{rapport.motif}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className=" mt-8">
                <h1 className="text-2xl">Ajout un rapport de visite:</h1>
                <form className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="nom" className="text-lg ml-4">Nom:</label>
                      <input type="text" name="nom" placeholder="Nom" className="w-full border-2 border-black rounded-4xl py-2 pl-4"/>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="prenom" className="text-lg ml-4">Prénom:</label>
                      <input type="text" name="prenom" placeholder="Prénom" className="w-full border-2 border-black rounded-4xl py-2 pl-4"/>
                    </div>
                  </div>
                  <label htmlFor="date" className="text-lg ml-4">Date:</label>
                  <input type="date" name="date" placeholder="Date" className="w-full border-2 border-black rounded-4xl py-2 px-4"/>
                  <label htmlFor="motif" className="text-lg ml-4">Motif:</label>
                  <textarea name="motif" id="motif" className="w-full border-2 border-black rounded-2xl py-2 pl-4 h-16"></textarea>
                  <label htmlFor="bilan" className="text-lg ml-4">Bilan:</label>
                  <input type="text" name="bilan" placeholder="Bilan" className="w-full border-2 border-black rounded-4xl py-2 pl-4"/>
                  <button type="submit" className="bg-black text-white rounded-4xl p-2 mt-4">Envoyer</button>
                </form>
              </div>
            </div>
          </div>
  );
};

export default DetailMedecin;