import { Navbar } from '@/components/Navbar';
import Footer from '../components/Footer';
import Search from '../components/Search';

const Page = async () => {
  return (
    <div className="h-screen">
      <Navbar />
      <Search />
      <Footer />
    </div>
  );
};

export default Page;