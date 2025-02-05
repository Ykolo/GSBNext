'use client';

import { fetchMedecin, fetchRapportsByMedecin } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { rapportType } from '../types/rapport';

interface DetailMedecinProps {
  medecinId: number;
}

const DetailMedecin = ({ medecinId }: DetailMedecinProps) => {
  const {
    data: medecin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['medecin', medecinId],
    queryFn: () => fetchMedecin(medecinId),
  });

  const { data: rapports, isError: isRapportsError } = useQuery({
    queryKey: ['rapports', medecinId],
    queryFn: () => fetchRapportsByMedecin(medecinId),
    initialData: [] as rapportType[],
  });

  const rapportsList = Array.isArray(rapports) ? rapports : [];

  return isLoading ? (
    <p>Chargement...</p>
  ) : isError ? (
    <p>Une erreur est survenue</p>
  ) : !medecin ? (
    <p>Aucun medecin trouvé</p>
  ) : (
    <div className="mr-4 w-full">
      <div className="mt-4 ml-8 p-4">
        <h1 className="text-2xl">Détails du médecin:</h1>
        <p>
          -{medecin.nom} {medecin.prenom}
        </p>
        <p>-{medecin.adresse}</p>
      </div>
      <div className="mt-4 ml-8 p-4">
        <h1 className="text-2xl">Rapport(s):</h1>
        <div className="mt-8 flex w-full flex-wrap justify-between">
          <table className="mr-4 w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black text-center">
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date</th>
                <th>Bilan</th>
                <th>Motif</th>
              </tr>
            </thead>
            <tbody>
              {!isRapportsError &&
                rapportsList.map((rapport: rapportType) => {
                  return (
                    <tr
                      key={rapport.id}
                      className="border-b-2 border-gray-300 text-center"
                    >
                      <td>{rapport.visiteur?.nom || 'N/A'} </td>
                      <td>{rapport.visiteur?.prenom || 'N/A'} </td>
                      <td>
                        {rapport.date
                          ? new Date(rapport.date).toLocaleDateString()
                          : 'Non définie'}
                      </td>
                      <td>{rapport.bilan}</td>
                      <td>{rapport.motif}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl">Ajout un rapport de visite:</h1>
          <form className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="nom" className="ml-4 text-lg">
                  Nom:
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  className="w-full rounded-4xl border-2 border-black py-2 pl-4"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="prenom" className="ml-4 text-lg">
                  Prénom:
                </label>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  className="w-full rounded-4xl border-2 border-black py-2 pl-4"
                />
              </div>
            </div>
            <label htmlFor="date" className="ml-4 text-lg">
              Date:
            </label>
            <input
              type="date"
              name="date"
              placeholder="Date"
              className="w-full rounded-4xl border-2 border-black px-4 py-2"
            />
            <label htmlFor="bilan" className="ml-4 text-lg">
              Bilan:
            </label>
            <textarea
              name="bilan"
              id="bilan"
              className="h-16 w-full rounded-2xl border-2 border-black py-2 pl-4"
              placeholder="Bilan"
            ></textarea>
            <label htmlFor="motif" className="ml-4 text-lg">
              Motif:
            </label>
            <input
              type="text"
              name="motif"
              placeholder="Motif"
              className="w-full rounded-4xl border-2 border-black py-2 pl-4"
            />
            <button
              type="submit"
              className="mt-4 rounded-4xl bg-black p-2 text-white"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailMedecin;
