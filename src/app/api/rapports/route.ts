import { NextResponse } from 'next/server';
import { getRapports } from '../../lib/actions/rapportActions';

export const GET = async () => {
 try{
  const response = await getRapports();
  const data = await response.json();
  return NextResponse.json(data, {status: 200});
 }catch(e){
  console.error('Error getting rapports', e);
  return NextResponse.json({error: 'Failed to fetch rapports'}, {status: 500});
 }
};