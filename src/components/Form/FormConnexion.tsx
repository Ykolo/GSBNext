"use client";

import { login, logout } from "@/lib/actions/auth.action";
import { fetchUser } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

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

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await login(data.login, data.password);
      if (!response || response.error) {
        toast.error(response?.error || "Identifiants incorrects.");
        return;
      }
      toast.success("Connexion réussie", { duration: 2000 });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Échec de la connexion", { duration: 2000 });
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
