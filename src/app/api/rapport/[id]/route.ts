import { NextResponse } from 'next/server';
import { getRapport } from '../../../lib/actions/rapportActions';

export const GET = async (request:Request, { params }: {params:  { id: string }}) => {
  const { id }= await params;
  try{
    const response = await getRapport(parseInt(id));
    return NextResponse.json(response, {status: 200});
  }catch(e){
    console.error('Error getting rapport', e);
    return NextResponse.json({error: 'Failed to fetch rapport'}, {status: 500});
  }
};