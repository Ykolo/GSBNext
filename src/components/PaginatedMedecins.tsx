'use client';
import { medecinType } from '@/types/medecin';
import { useEffect, useState } from 'react';
import { MedecinCard } from './Medecin';

type Props = {
  medecins: medecinType[];
};

export const PaginatedMedecins = ({ medecins }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const itemsPerPage = 12;
  const totalPages = Math.ceil(medecins.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedecins = medecins.slice(startIndex, endIndex);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputPage);
      if (value >= 1 && value <= totalPages) {
        setCurrentPage(value);
      } else {
        setInputPage(currentPage.toString());
      }
    }
  };

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  return (
    <div className='min-h-screen'>
      <section className='mt-16 flex items-center justify-center'>
        <div className='mx-40 grid grid-cols-3 gap-8'>
          {currentMedecins.map((medecin: medecinType) => (
            <MedecinCard key={medecin.id} medecin={medecin} />
          ))}
        </div>
      </section>
      
      <div className="flex flex-col items-center gap-4 my-8">
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-black disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2">
            Page {currentPage} sur {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-black disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>Aller à la page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={handlePageInput}
            onKeyDown={handlePageSubmit}
            className="w-16 px-2 py-1 border border-black rounded-lg text-center"
          />
        </div>
      </div>
    </div>
  );
};
