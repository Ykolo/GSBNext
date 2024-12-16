import { NextResponse } from 'next/server';
import { getMedicaments } from '../../lib/actions/medicamentActions';

export const GET = async () => {
  try{
    const response = await getMedicaments();
    const data = await response.json();
    return NextResponse.json(data, {status: 200});
  }catch(e){
    console.error('Error getting medicaments', e);
    return NextResponse.json({error: 'Failed to fetch medicaments'}, {status: 500});
  }
};