import DetailMedecin from '../../../components/DetailMedecin';
import Navbar from '../../../components/Navbar';

interface Params {
  id: string;
}
const MedecinPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div>
      <Navbar />
      <div className="mx-60 flex rounded-2xl border-2 border-gray-300">
        <DetailMedecin medecinId={parseInt(id)} />
      </div>
    </div>
  );
};

export default MedecinPage;
