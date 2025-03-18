import Footer from "@/components/Footer";
import UpdateForm from "@/components/Form/UpdateForm";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpdatePage = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <Card className="mx-auto w-1/2 flex-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Modifier le rapport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateForm id={id} />
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};
export default UpdatePage;
