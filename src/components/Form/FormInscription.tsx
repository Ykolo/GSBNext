"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { labels } from "../../data/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
  data: z.string().refine(
    date => {
      !isNaN(Date.parse(date));
    },
    { message: "Date Invalide" }
  ),
  login: z
    .string()
    .min(2, { message: "Le pseudo doit avoir au moins 2 caractères" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir 8 caractères" }),
});
type SignUpFormType = z.infer<typeof SignUpFormSchema>;

const FormInscription = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const onSubmit = (data: SignUpFormType) => {
    console.log(data);
    setMessage("Form submitted!");
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {labels.map(({ label, id, type = "text" }) => {
        return (
          <div className="flex flex-col gap-2" key={id}>
            <Label htmlFor={id} className="ml-4">
              {label}
            </Label>
            <Input
              type={type}
              id={id}
              {...register(id as keyof SignUpFormType)}
              placeholder={label}
            />
            {errors[id as keyof SignUpFormType] && (
              <p className="ml-4 text-sm text-red-500">
                {errors[id as keyof SignUpFormType]?.message as string}
              </p>
            )}
          </div>
        );
      })}
      <Button type="submit" variant={"default"}>
        Inscription
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};
export default FormInscription;
