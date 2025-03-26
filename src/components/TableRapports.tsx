"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteRapport } from "../lib/actions/rapportActions";
import { fetchRapportsByVisiteur } from "../lib/api";
import { RapportWithMedecinType } from "../types/rapport";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface TableRapportsProps {
  userID: string;
}

const TableRapports = ({ userID }: TableRapportsProps) => {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  const {
    data: rapports,
    isLoading: isRapportsLoading,
    isError: isRapportsError,
  } = useQuery({
    queryKey: ["rapports"],
    queryFn: () => fetchRapportsByVisiteur(userID),
  });

  const paginatedRapports = rapports
    ? rapports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : [];
  const pageCount = rapports ? Math.ceil(rapports.length / PAGE_SIZE) : 1;

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    console.log("Tentative de suppression du rapport ID:", selectedId);

    try {
      const response = await deleteRapport(selectedId);
      if (response?.error) {
        toast.error(
          `Erreur lors de la suppression du rapport ${response.error}`
        );
      } else {
        toast.success("Rapport supprimé avec succès !");
        window.location.reload();
      }
      setOpen(false);
    } catch (e: any) {
      console.error(e);
      toast.error("Erreur lors de la suppression du rapport");
    }
  };

  return (
    <div>
      <h1>Mes rapports</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Médecin</TableHead>
            <TableHead className="text-center">Motif</TableHead>
            <TableHead className="text-center">Bilan</TableHead>
            <TableHead className="w-10 text-center">Date</TableHead>
            <TableHead className="w-20 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isRapportsLoading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Chargement...
              </TableCell>
            </TableRow>
          )}

          {isRapportsError && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Erreur lors du chargement des rapports
              </TableCell>
            </TableRow>
          )}

          {paginatedRapports && paginatedRapports.length > 0 ? (
            paginatedRapports.map((rapport: RapportWithMedecinType) => (
              <TableRow key={rapport.id}>
                <TableCell className="break-words whitespace-normal">
                  {rapport.medecin
                    ? `${rapport.medecin.nom} ${rapport.medecin.prenom}`
                    : "N/A"}
                </TableCell>
                <TableCell className="break-words whitespace-normal">
                  {rapport.motif}
                </TableCell>
                <TableCell className="break-words whitespace-normal">
                  {rapport.bilan}
                </TableCell>
                <TableCell>{formatDate(rapport.date)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => router.push(`/update/${rapport.id}`)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                      setSelectedId(rapport.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Aucun rapport trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {rapports && rapports.length > PAGE_SIZE && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-default"
                }
              />
            </PaginationItem>
            <PaginationItem className="cursor-default px-4 text-sm">
              Page {page} sur {pageCount}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(prev => Math.min(prev + 1, pageCount))}
                className={
                  page === pageCount
                    ? "pointer-events-none opacity-50"
                    : "cursor-default"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le rapport ?</DialogTitle>
          </DialogHeader>
          <p>Êtes-vous sûr de vouloir supprimer ce rapport ?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableRapports;
