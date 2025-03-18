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
import { fetchMedecin, fetchRapportsByMedecin, fetchUser } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createRapport } from "../lib/actions/rapportActions";
import { rapportType } from "../types/rapport";

interface DetailMedecinProps {
  medecinID: number;
}
const rapportSchema = z.object({
  date: z.string().min(1, "Date requise"),
  bilan: z.string().min(1, "Bilan requis"),
  motif: z.string().min(1, "Motif requis"),
});

type RapportFormType = z.infer<typeof rapportSchema>;

const labels = [
  { label: "Date", id: "date", type: "date" },
  { label: "Motif", id: "motif", type: "text" },
  { label: "Bilan", id: "bilan", type: "text" },
];

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

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  // Initialize query client at component level
  const queryClient = useQueryClient();

  const form = useForm<RapportFormType>({
    resolver: zodResolver(rapportSchema),
  });

  const onSubmit = async (data: RapportFormType) => {
    try {
      const dateObj = new Date(data.date);
      await createRapport(
        medecin.id,
        user.decoded.id,
        data.bilan,
        data.motif,
        dateObj
      );
      toast.success("Rapport créé avec succès");
      form.reset();

      queryClient.invalidateQueries({ queryKey: ["rapports", medecinID] });
    } catch (e: any) {
      console.error(e);
      toast.error(`Erreur lors de la création du rapport: ${e.message}`);
    }
  };

  const rapportsList = Array.isArray(rapports) ? rapports : [];

  return (
    <Card className="w-full">
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
            {user && user.decoded && user.decoded.login && (
              <div>
                <h2 className="mt-4 text-xl font-bold">
                  Ajout d'un rapport de visite
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-4 flex flex-col gap-4"
                  >
                    {labels.map(({ label, id, type = "text" }) => (
                      <FormField
                        key={id}
                        control={form.control}
                        name={id as keyof RapportFormType}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type={type}
                                placeholder={id}
                                value={field.value ?? ""}
                              />
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
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailMedecin;
