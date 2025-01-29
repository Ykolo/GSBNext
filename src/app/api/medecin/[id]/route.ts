import { getMedecin } from '@/lib/actions/medecinActions';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  context: Props
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const response = await getMedecin(parseInt(id));
    return NextResponse.json(response, { status: 200 });
  } catch(e) {
    console.error('Error getting medecin', e);
    return NextResponse.json({ error: 'Failed to fetch medecin' }, { status: 500 });
  }
}