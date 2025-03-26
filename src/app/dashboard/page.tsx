import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";
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
            <CardTitle className="text-2xl font-bold">
              Salut {user.decoded.login || ""}
              <div className="flex items-center justify-end gap-2">
                <LogoutButton />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TableRapports userID={user.decoded.id.toString()} />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
