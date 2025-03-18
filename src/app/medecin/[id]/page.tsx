import Footer from "@/components/Footer";
import DetailMedecin from "../../../components/DetailMedecin";
import Navbar from "../../../components/Navbar";

interface Params {
  id: string;
}
const MedecinPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-60 flex-1">
        <DetailMedecin medecinID={parseInt(id)} />
      </main>
      <Footer />
    </div>
  );
};

export default MedecinPage;
