import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { medecinType } from "@/types/medecin";
import Link from "next/link";
import { LuHouse, LuPhone } from "react-icons/lu";

export const MedecinCard = ({ medecin }: { medecin: medecinType }) => {
  return (
    <Card className="w-full max-w-sm border border-black shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Dr. {medecin.prenom} {medecin.nom}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {medecin.specialitecomplementaire && (
          <p className="text-sm text-gray-700">
            {medecin.specialitecomplementaire}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-800">
          <LuHouse size={18} className="text-gray-600" />
          <p className="truncate">{medecin.adresse}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-800">
          <LuPhone size={18} className="text-gray-600" />
          <p className="truncate">{medecin.tel}</p>
        </div>
        <Link href={`/medecin/${medecin.id}`} passHref>
          <Button className="w-full" variant={"outline"}>
            Organiser une visite
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
