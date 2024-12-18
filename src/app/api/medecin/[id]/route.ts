import { NextResponse } from 'next/server';
import { getMedecin } from '../../../lib/actions/medecinActions';

export const GET = async (request:Request, { params }: {params:  { id: string }}) => {
  const { id }= await params;
  try{
    const response = await getMedecin(parseInt(id));
    return NextResponse.json(response, {status: 200});
  }catch(e){
    console.error('Error getting medecin', e);
    return NextResponse.json({error: 'Failed to fetch medecin'}, {status: 500});
  }
};