"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import router from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { labels } from "../../data/label";
import { logout } from "../../lib/actions/auth.action";
import { createVisiteur } from "../../lib/actions/visiteurAction";
import { fetchUser } from "../../lib/api";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignUpFormSchema = z.object({
  nom: z
    .string()
    .min(2, { message: "Le nom doit avoir au moins 2 caractères" }),
  prenom: z
    .string()
    .min(2, { message: "Le prénom doit avoir au moins 2 caractères" }),
  adresse: z.string().min(5, { message: "L'adresse doit être valide" }),
  ville: z
    .string()
    .min(2, { message: "La ville doit avoir au moins 2 caractères" }),
  cp: z
    .string()
    .regex(/^\d{5}$/, { message: "Le code postal doit contenir 5 chiffres" }),
  dateembauche: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Date invalide",
  }),

  login: z
    .string()
    .min(2, { message: "Le pseudo doit avoir au moins 2 caractères" }),
  password: z.string(),
});
type SignUpFormType = z.infer<typeof SignUpFormSchema>;

const FormInscription = () => {
  const [message, setMessage] = useState("");

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      adresse: "",
      ville: "",
      cp: "",
      login: "",
      password: "",
      dateembauche: "",
    },
  });
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    form.setValue("dateembauche", today);
  }, []);
  const onSubmit = async (data: SignUpFormType) => {
    console.log(data);
    const newVisiteur = {
      id: crypto.randomUUID().slice(0, 4),
      timespan: BigInt(Date.now()),
      nom: data.nom,
      prenom: data.prenom,
      adresse: data.adresse,
      ville: data.ville,
      cp: data.cp,
      login: data.login,
      mdp: data.password,
      rapport: [],
    };
    try {
      const response = await createVisiteur(newVisiteur);
      if (!response || response.error) {
        toast.error(
          response?.error || "Erreur lors de la création de visiteur"
        );
      }
      setMessage("Inscription réussie !");
      toast.success(message, { duration: 2000 });
    } catch (e: any) {
      console.error("Error creating visiteur", e);
      setMessage("Erreur lors de la création de visiteur" + e.message);
      toast.error(message, { duration: 2000 });
    }
  };
  if (user && typeof user === "object" && user.decoded && user.decoded.login) {
    return (
      <div className="flex flex-col gap-8">
        <p>Vous êtes déjà connecté </p>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
          <Button
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
          {labels
            .filter(({ id }) => id === "nom" || id === "prenom")
            .map(({ label, id, type = "text" }) => (
              <div className="flex w-full flex-col gap-2" key={id}>
                <FormField
                  control={form.control}
                  name={id as keyof SignUpFormType}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={id}>{label}</FormLabel>
                      <FormControl>
                        <Input
                          id={id}
                          type={type}
                          placeholder={label}
                          {...field}
                          value={field.value ?? ""}
                          onChange={e => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
        </div>
        {labels
          .filter(({ id }) => id !== "nom" && id !== "prenom")
          .map(({ label, id, type = "text" }) => (
            <FormField
              key={id}
              control={form.control}
              name={id as keyof SignUpFormType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={id}>{label}</FormLabel>
                  <FormControl>
                    <Input id={id} type={type} placeholder={label} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        <Button type="submit" variant={"default"}>
          Inscription
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormInscription;
