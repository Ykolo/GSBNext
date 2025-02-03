import DetailMedecin from "../../../components/DetailMedecin";
import Navbar from "../../../components/Navbar";

interface Params {
  id: string;
}
const MedecinPage = async ({ params }: { params: Params }) => {
  return (
    <div>
      <Navbar />
      <div className="flex border-2 border-gray-300 m-20 rounded-2xl">
        <DetailMedecin medecinId={parseInt(params.id)} />
      </div>
    </div>
  );
};

export default MedecinPage;