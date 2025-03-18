"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateRapport } from "../../lib/actions/rapportActions";
import { fetchRapportByID } from "../../lib/api";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

const updateRapportSchema = z.object({
  bilan: z.string().max(100, { message: "Too long" }).nullish(),
  motif: z.string().max(100, { message: "Too long" }).nullish(),
});

type UpdateRapportFormType = z.infer<typeof updateRapportSchema>;

const UpdateForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const {
    data: rapport,
    isLoading: isRapportLoading,
    isError: isRapportError,
  } = useQuery({
    queryKey: ["rapport", id],
    queryFn: () => fetchRapportByID(id),
  });

  const form = useForm<UpdateRapportFormType>({
    resolver: zodResolver(updateRapportSchema),
    defaultValues: {
      bilan: "",
      motif: "",
    },
  });

  useEffect(() => {
    if (rapport) {
      form.reset({
        bilan: rapport.bilan || "",
        motif: rapport.motif || "",
      });
    }
  }, [rapport, form]);

  const onSubmit = async (data: UpdateRapportFormType) => {
    console.log(data);
    try {
      const response = await updateRapport(
        rapport.id,
        data.motif ?? "",
        data.bilan ?? ""
      );
      if (!response || !response.id) {
        toast.error("Erreur lors de la modification du rapport");
      } else {
        toast.success("Rapport modifié avec succès");
        router.push("/dashboard");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Erreur lors de la modification du rapport");
    }
  };

  if (isRapportLoading) {
    return <div>Loading...</div>;
  }

  if (isRapportError) {
    return <div>Error loading rapport</div>;
  }

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="motif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motif</FormLabel>
                <FormControl>
                  <Input
                    id="motif"
                    placeholder="Motif"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bilan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bilan</FormLabel>
                <FormControl>
                  <Input
                    id="bilan"
                    placeholder="Bilan"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Envoyer</Button>
        </form>
      </FormProvider>
    </div>
  );
};
export default UpdateForm;
