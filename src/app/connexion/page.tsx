import Footer from "@/components/Footer";
import FormConnexion from "@/components/Form/FormConnexion";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConnexionPage = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-5">
        <Card className="w-full max-w-md border-2 border-gray-400">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <FormConnexion />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ConnexionPage;
