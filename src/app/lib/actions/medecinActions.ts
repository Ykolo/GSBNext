'use server';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { medecinSchema } from '../../types/medecin';

const prisma = new PrismaClient();
export const getMedecins = async () => {
  try {
    const response = await prisma.medecin.findMany();
    const parsedResponse = medecinSchema.array().parse(response);
    return NextResponse.json(parsedResponse);
  }catch(error){
    console.error('Error getting medecins', error);
    return NextResponse.json({error: 'Failed to fetch medecins'}, {status: 500});
  }
};
export const getMedecin = async (id: number) => {
  try{
    const response = await prisma.medecin.findUnique({
      where: {id}
    });
    const parsedResponse = medecinSchema.parse(response);
    return NextResponse.json(parsedResponse);
  }catch(e){
    console.error('Error getting medecin', e);
    return NextResponse.json({error: 'Failed to fetch medecin'}, {status: 500});
  }
};
export const updateMedecin = async (id: number, adresse: string, tel: string, specialite: string) =>{
  try{
    if (!id || !adresse || !tel || !specialite) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }
    const response = await prisma.medecin.update({
      where: {id},
      data:{
        adresse,
        tel,
        specialitecomplementaire: specialite
      }
    });
    const parsedResponse = medecinSchema.parse(response);
    return NextResponse.json(parsedResponse);

  }catch(error){
    console.error('Error updating medecin', error);
    return NextResponse.json({error: 'Failed to update medecin'}, {status: 500});
  }
};
