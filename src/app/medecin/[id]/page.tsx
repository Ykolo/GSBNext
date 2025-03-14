import DetailMedecin from "../../../components/DetailMedecin";
import Navbar from "../../../components/Navbar";

interface Params {
  id: string;
}
const MedecinPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div>
      <Navbar />
      <main className="mx-60">
        <DetailMedecin medecinID={parseInt(id)} />
      </main>
    </div>
  );
};

export default MedecinPage;
