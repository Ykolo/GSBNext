import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface Props {
  params: Promise<{
    id: string;
  }>
}
export const GET = async (_request:Request, context: Props): Promise<Response> => {
  try{
    const { id } = await context.params;
    const rapport = await prisma.rapport.findUnique({
      where:{
        id: parseInt(id)
      }
    });
    if(!rapport){
      return NextResponse.json({success: false, error: 'Rapport introuvable'}, {status: 404});
    }
    return NextResponse.json({success: true, data: rapport}, {status: 200});
  }catch(e){
    console.error('Error getting rapport', e);
    return NextResponse.json({success:false, error: 'Failed to fetch rapport'}, {status: 500});
  }
};