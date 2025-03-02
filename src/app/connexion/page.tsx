import Footer from '../../components/Footer';
import FormConnexion from '../../components/Form/FormConnexion';
import Navbar from '../../components/Navbar';

const ConnexionPage = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-black p-4">
          <h1 className="text-2xl">Connexion</h1>
          <FormConnexion />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ConnexionPage;
