import { getMedicaments } from '@/lib/actions/medicamentActions';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try{
    const response = await getMedicaments();
    return NextResponse.json(response, {status: 200});
  }catch(e){
    console.error('Error getting medicaments', e);
    return NextResponse.json({error: 'Failed to fetch medicaments'}, {status: 500});
  }
};