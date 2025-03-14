import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser, logout } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await getUser();
  console.log("user", user);

  if (typeof user === "string") {
    redirect("/connexion");
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center">
        <Card className="mx-60">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome {user.decoded.login || ""}</p>
          </CardContent>
          <CardFooter>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/");
              }}
              method="POST"
            >
              <Button type="submit">Déconnexion</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
