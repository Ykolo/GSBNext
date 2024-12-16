import { NextResponse } from 'next/server';
import { getMedecins } from '../../lib/actions/medecinActions';

export const GET = async () => {
  try{
    const response = await getMedecins();
    const data = await response.json();
    return NextResponse.json(data, {status: 200});
  }catch(e){
    console.error('Error getting medecins', e);
    return NextResponse.json({error: 'Failed to fetch medecins'}, {status: 500});
  }
};