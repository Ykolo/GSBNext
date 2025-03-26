"use client";
import { useRouter } from "next/navigation";
import { logout } from "../lib/actions/auth.action";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return <Button onClick={handleLogout}> Déconnexion </Button>;
};
export default LogoutButton;
