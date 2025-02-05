'use client';

import { fetchMedecins, searchMedecins } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PaginatedMedecins } from './PaginatedMedecins';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const {
    data: medecins,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['medecins'],
    queryFn: fetchMedecins,
  });
  const { data: filteredMedecins } = useQuery({
    queryKey: ['filteredMedecins', searchValue],
    queryFn: () => searchMedecins(searchValue),
    enabled: searchValue.length > 0,
  });

  return isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      Loading...
    </div>
  ) : isError ? (
    <p>Une erreur est survenue</p>
  ) : (
    <div>
      <div className="flex justify-center gap-4">
        <input
          type="text"
          placeholder="Rechercher"
          className="rounded-lg border-2 border-black p-4 shadow-sm focus:shadow-lg"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <button
          className="rounded-lg border-2 border-black bg-black p-4 text-white shadow-sm hover:bg-white hover:text-black hover:shadow-xl"
          onClick={() => searchMedecins(searchValue)}
        >
          Rechercher
        </button>
        <div></div>
      </div>
      {!searchValue ? (
        <p className="mt-4 text-center text-lg">
          Il y a {medecins?.length} médecins
        </p>
      ) : (
        <p className="mt-4 text-center text-lg">
          Il y a {filteredMedecins?.length} médecins
        </p>
      )}
      {!searchValue ? (
        <PaginatedMedecins medecins={medecins || []} />
      ) : (
        <PaginatedMedecins medecins={filteredMedecins || []} />
      )}
    </div>
  );
};
export default Search;
