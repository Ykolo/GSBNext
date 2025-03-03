"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const LoginFormSchema = z.object({
  login: z
    .string()
    .min(2, { message: "Le pseudo doit avoir au moins 2 caractères" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir 8 caractères" }),
});
type LoginFormType = z.infer<typeof LoginFormSchema>;

const FormConnexion = () => {
  const [message, setMessage] = useState("");

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });
  const onSubmit = (data: LoginFormType) => {
    console.log(data);
    setMessage("Connexion réussie");
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="login">Pseudo</Label>
              <FormControl>
                <Input id="login" placeholder="Pseudo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Mot de passe</Label>
              <FormControl>
                <Input id="password" placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Connexion</Button>
        {message && <p className="text-center text-green-500">{message}</p>}
      </form>
    </FormProvider>
  );
};
export default FormConnexion;
