"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginatedMedecins } from "./PaginatedMedecins";

import {
  fetchMedecins,
  fetchSpecialities,
  searchMedecinsByName,
} from "@/lib/api";

interface specialities {
  label: string;
  value: string;
}

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const {
    data: medecins,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medecins"],
    queryFn: fetchMedecins,
  });
  const { data: filteredMedecinsByName } = useQuery({
    queryKey: searchValue
      ? ["filteredMedecinsByName", searchValue]
      : ["filteredMedecinsByName"],
    queryFn: () => searchMedecinsByName(searchValue),
    enabled: !!searchValue,
  });
  const { data: specialities = [], isError: isSpecialitiesError } = useQuery({
    queryKey: ["specialities"],
    queryFn: fetchSpecialities,
  });
  // const { data: filteredMedecinsBySpeciality } = useQuery({
  //   queryKey: selected
  //     ? ["filteredMedecinsBySpeciality", selected]
  //     : ["filteredMedecinsBySpeciality"],
  //   queryFn: () => SearchMedecinsBySpeciality(selected),
  //   enabled: !!selected,
  // });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  // if (isSpecialitiesError) {
  //   return (
  //     <p>Une erreur est survenue lors de la récupération des spécialités</p>
  //   );
  // }

  if (isError) {
    return <p>Une erreur est survenue</p>;
  }

  return (
    <div>
      <div className="flex justify-center gap-4">
        <Input
          placeholder="Rechercher"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-auto max-w-xs border-2 border-black py-8"
        />
        <Button
          className="py-8"
          onClick={() => searchMedecinsByName(searchValue)}
        >
          Rechercher
        </Button>
        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between py-8">
              {selected
                ? specialities.find((s: specialities) => s.value === selected)
                    ?.label
                : "Sélectionner une spécialité"}
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Rechercher..." className="h-9" />
              <CommandList>
                <CommandEmpty>Aucune spécialité trouvée</CommandEmpty>
                <CommandGroup>
                  {specialities.map(
                    (speciality: specialities, index: number) => (
                      <CommandItem
                        key={index}
                        value={speciality.value}
                        onSelect={currentValue => {
                          console.log(currentValue);
                          setSelected(currentValue);
                          setOpen(false);
                        }}
                      >
                        {speciality.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            selected === speciality.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover> */}
      </div>
      <div className="mt-4 text-center text-lg">
        {!searchValue
          ? `Il y a ${medecins?.length} médecins`
          : `Il y a ${filteredMedecinsByName?.length} médecins`}
      </div>
      {!searchValue ? (
        <PaginatedMedecins medecins={medecins || []} />
      ) : (
        <PaginatedMedecins medecins={filteredMedecinsByName || []} />
        // <PaginatedMedecins medecins={filteredMedecinsBySpeciality || []} />
      )}
    </div>
  );
}
