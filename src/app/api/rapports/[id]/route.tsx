import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { rapportSchema } from "../../../../types/rapport";

interface Props {
  params: Promise<{
    id:string;
  }>
}
export const GET = async (_request: NextRequest, context: Props): Promise<NextResponse> => {
  try{
    const { id } = await context.params;
    const rapports = prisma.rapport.findMany({
      where: {
        idmedecin: parseInt(id)
      }
    })
    if(!rapports){
      return NextResponse.json({success: false, error: 'Rapport introuvable'}, { status: 404 });
    }
    const parsedRapports = rapportSchema.array().parse(rapports)
    return NextResponse.json({success: true, data: parsedRapports}, { status: 200 });
  }catch(e){
    console.error('Error getting rapports', e);
    return NextResponse.json({success:false, error: 'Failed to fetch rapports' }, { status: 500 });
  }
}