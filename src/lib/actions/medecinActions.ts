'use server';
import { medecinSchema } from '@/types/medecin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getMedecins = async () => {
  try {
    const response = await prisma.medecin.findMany({
      orderBy:{
        nom: 'asc'
      }
    });
    const parsedResponse = medecinSchema.array().parse(response);
    return parsedResponse;
  }catch(error){
    console.error('Error getting medecins', error);
    throw new Error('Failed to fetch medecins');
  }
};
export const getMedecin = async (id: number) => {
  try{
    const response = await prisma.medecin.findUnique({
      where: {id}
    });
    const parsedResponse = medecinSchema.parse(response);
    return parsedResponse;
  }catch(e){
    console.error('Error getting medecin', e);
    throw new Error('Failed to fetch medecin');
  }
};
export const updateMedecin = async (id: number, adresse: string, tel: string, specialite: string) =>{
  try{
    if (!id || !adresse || !tel || !specialite) {
      throw new Error('Missing required fields');
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
    return parsedResponse;
  }catch(error){
    console.error('Error updating medecin', error);
    throw new Error('Failed to update medecin');
  }
};
