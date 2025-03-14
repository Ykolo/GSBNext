"use client";

import { getUser, login } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const LoginFormSchema = z.object({
  login: z
    .string()
    .min(2, { message: "Le pseudo doit avoir au moins 2 caractères" }),
  password: z.string().min(2, { message: "Le mot de passe doit être valide" }),
});
type LoginFormType = z.infer<typeof LoginFormSchema>;

const FormConnexion = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (user && typeof user === "object" && user.login) {
    return (
      <div>
        <p>Vous êtes déjà connecté </p>
        <Button onClick={() => redirect("/dashboard")}>Dashboard</Button>
      </div>
    );
  }

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await login(data.login, data.password);
      if (!response || response.error) {
        toast.error(response?.error || "Identifiants incorrects.");
        return;
      }
      setMessage("Connexion réussie");
      toast.success(message, { duration: 2000 });
    } catch (error) {
      setMessage("Échec de la connexion");
      console.error(error);
      toast.error(message, { duration: 2000 });
    }
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
              <FormLabel htmlFor="login">Pseudo</FormLabel>
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
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  placeholder="Mot de passe"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Connexion</Button>
      </form>
    </FormProvider>
  );
};
export default FormConnexion;
