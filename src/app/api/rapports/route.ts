import { getRapports } from '@/lib/actions/rapportActions';
import { NextResponse } from 'next/server';

export const GET = async () => {
 try{
  const response = await getRapports();
  return NextResponse.json(response, {status: 200});
 }catch(e){
  console.error('Error getting rapports', e);
  return NextResponse.json({error: 'Failed to fetch rapports'}, {status: 500});
 }
};