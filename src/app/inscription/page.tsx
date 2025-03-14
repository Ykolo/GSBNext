import Footer from "@/components/Footer";
import FormInscription from "@/components/Form/FormInscription";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InscriptionPage = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-5">
        <Card className="w-full max-w-xl border-2 border-gray-400">
          <CardHeader>
            <CardTitle className="ml-4 text-2xl font-bold">
              Inscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormInscription />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
export default InscriptionPage;
