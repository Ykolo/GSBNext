"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMedecin, fetchRapportsByMedecin } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { rapportType } from "../types/rapport";

interface DetailMedecinProps {
  medecinID: number;
}

const rapportSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  date: z.string().min(1, "Date requise"),
  bilan: z.string().min(1, "Bilan requis"),
  motif: z.string().min(1, "Motif requis"),
});

type RapportFormType = z.infer<typeof rapportSchema>;

const DetailMedecin = ({ medecinID: medecinID }: DetailMedecinProps) => {
  const {
    data: medecin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medecin", medecinID],
    queryFn: () => fetchMedecin(medecinID),
  });

  const { data: rapports, isError: isRapportsError } = useQuery({
    queryKey: ["rapports", medecinID],
    queryFn: () => fetchRapportsByMedecin(medecinID),
    initialData: [] as rapportType[],
  });

  const form = useForm<RapportFormType>({
    resolver: zodResolver(rapportSchema),
  });

  const onSubmit = (data: RapportFormType) => {
    console.log(data);
  };

  const rapportsList = Array.isArray(rapports) ? rapports : [];

  return (
    <Card className="mt-4 ml-8 w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Détails du médecin:
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Chargement...</p>
        ) : isError ? (
          <p>Une erreur est survenue</p>
        ) : !medecin ? (
          <p>Aucun médecin trouvé</p>
        ) : (
          <>
            <p>
              - {medecin.nom} {medecin.prenom}
            </p>
            <p>- {medecin.adresse}</p>
            <h2 className="mt-4 text-xl font-bold">Rapport(s)</h2>
            <Table className="text-base">
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Bilan</TableHead>
                  <TableHead>Motif</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isRapportsError &&
                  rapportsList.map((rapport: rapportType) => (
                    <TableRow key={rapport.id}>
                      <TableCell>{rapport.visiteur?.nom || "N/A"}</TableCell>
                      <TableCell>{rapport.visiteur?.prenom || "N/A"}</TableCell>
                      <TableCell>
                        {rapport.date
                          ? new Date(rapport.date).toLocaleDateString()
                          : "Non définie"}
                      </TableCell>
                      <TableCell>{rapport.bilan}</TableCell>
                      <TableCell>{rapport.motif}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <h2 className="mt-4 text-xl font-bold">
              Ajout d'un rapport de visite
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 flex flex-col gap-4"
              >
                {/* Nom et prénom sur la même ligne */}
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="nom" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="prénom" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Autres champs */}
                {["date", "bilan", "motif"].map(field => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof RapportFormType}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {field.name.charAt(0).toUpperCase() +
                            field.name.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={field.name} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" className="mt-4">
                  Envoyer
                </Button>
              </form>
            </Form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailMedecin;
