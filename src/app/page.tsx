'use client';
import { MedecinCard } from '@/components/Medecin';
import { Navbar } from '@/components/Navbar';
import { getMedecins } from '@/lib/actions/medecinActions';
import { medecinType } from '@/types/medecin';
import { useQuery } from '@tanstack/react-query';
import Footer from '../components/Footer';

const Page = () => {
  const {data: medecins, isLoading, isError} = useQuery({
    queryKey: ['medecins'],
    queryFn: getMedecins
  });

  return (
    isLoading ? <p>Chargement...</p> :
    isError ? <p>Une erreur est survenue</p> :
    <div className="h-screen">
      <Navbar />
      <div className='flex justify-center gap-4'>
          <input type="text" placeholder="Rechercher" className="rounded-lg border-2 border-black p-4 " /> 
          <button className="rounded-lg border border-black bg-black p-4 text-white hover:bg-white hover:text-black">Rechercher</button>
      </div>
        <section className='mt-16 flex items-center justify-center'>
          <div className='mx-40 grid grid-cols-3 gap-8'>
            {medecins?.map((medecin: medecinType, index: number) => (
              index <= 11 && <MedecinCard key={medecin.id} medecin={medecin} />
            ))}
          </div>
        </section>
        <Footer />
    </div>
  );
};

export default Page;