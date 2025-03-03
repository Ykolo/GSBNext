"use client";

import { fetchMedecins, searchMedecins } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PaginatedMedecins } from "./PaginatedMedecins";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: medecins,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medecins"],
    queryFn: fetchMedecins,
  });
  const { data: filteredMedecins } = useQuery({
    queryKey: ["filteredMedecins", searchValue],
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
        <Input
          placeholder="Rechercher"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-auto max-w-xs border-2 border-black py-8"
        />
        <Button className="py-8" onClick={() => searchMedecins(searchValue)}>
          Rechercher
        </Button>
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
