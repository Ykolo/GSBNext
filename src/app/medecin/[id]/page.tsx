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
      <div className="flex border-2 border-gray-300 mx-60 rounded-2xl">
        <DetailMedecin medecinId={parseInt(id)} />
      </div>
    </div>
  );
};

export default MedecinPage;