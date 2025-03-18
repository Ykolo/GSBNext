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
import TableRapports from "../../components/TableRapports";

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
        <Card className="mx-10">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="mb-8 ml-4 text-2xl font-bold">
              Salut {user.decoded.login || ""}
            </h1>
            <TableRapports userID={user.decoded.id.toString()} />
          </CardContent>
          <CardFooter>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/");
              }}
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
