"use client"

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMedecinByNom, getMedecins } from "../lib/actions/medecinActions";
import { PaginatedMedecins } from "./PaginatedMedecins";

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: medecins, isLoading, isError } = useQuery({
    queryKey: ['medecins'],
    queryFn: getMedecins
  })
  const { data: filteredMedecins, isLoading: isLoadingFiltered, isError: isErrorFiltered} = useQuery({
    queryKey: ['filteredMedecins', searchValue],
    queryFn: () => getMedecinByNom(searchValue),
    enabled: searchValue.length > 0
  })
  return (
    isLoading ? <div className="h-full w-full flex justify-center items-center">Loading...</div> :
      isError ? <p>Une erreur est survenue</p> :
        <div>
          <div className='flex justify-center gap-4'>
            <input 
              type="text" 
              placeholder="Rechercher" 
              className="rounded-lg border-2 border-black p-4"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              />
            <button 
              className="rounded-lg border border-black bg-black p-4 text-white hover:bg-white hover:text-black"
              >
              Rechercher
            </button>
            <div>
            </div>
          </div>
          {
            !searchValue ?
            <p className="text-center mt-4 text-lg">Il y a {medecins?.length} médecins</p>:
            <p className="text-center mt-4 text-lg">Il y a {filteredMedecins?.length} médecins</p>
          }
          {
            !searchValue ? 
            <PaginatedMedecins medecins={medecins || []} />:
            <PaginatedMedecins medecins={filteredMedecins || []} />
          }
        </div>
  )
}
export default Search;