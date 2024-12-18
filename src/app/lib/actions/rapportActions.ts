'use server';

import { PrismaClient } from '@prisma/client';
import { rapportSchema } from '../../types/rapport';

const prisma = new PrismaClient();

export const getRapports = async () => {
  try {
    const response = await prisma.rapport.findMany();
    const parsedResponse = rapportSchema.array().parse(response);
    return parsedResponse;
  }catch(e){
    console.error('Error getting rapports', e);
    throw new Error('Failed to fetch rapports');
  }
};

export const getRapport = async (id: number) => {
  try{
    const response = await prisma.rapport.findUnique({
      where: {id}
    });
    const parsedResponse = rapportSchema.parse(response);
    return parsedResponse;
  }catch(e){
    console.error('Error getting rapport', e);
    throw new Error('Failed to fetch rapport');
  }
};

export const getRapportsByDate = async (date: Date) => {
  try{
    const response = await prisma.rapport.findMany({
      where: {date}
    });
    const parsedResponse = rapportSchema.array().parse(response);
    return parsedResponse;
  }catch(e){
    console.error('Error getting rapports by date', e);
    throw new Error('Failed to fetch rapports by date');
  }
};

export const updateRapport = async(id: number, motif: string, bilan: string) => {
  try{
    const response = await prisma.rapport.update({
      where: {id},
      data: {
        motif,
        bilan
      }
    });
    const parsedResponse = rapportSchema.parse(response);
    return parsedResponse;
  }catch(e){
    console.error('Error updating rapport', e);
    throw new Error('Failed to update rapport');
  }
};

export const createRapport = async (idMedecin: number, idVisiteur: string, bilan: string, motif: string, date: Date, medicaments: [{idMedicament: string, qte: number}]) => {
  try{ 
    const response = await prisma.rapport.create({
      data: {
        idmedecin: idMedecin,
        idvisiteur: idVisiteur,
        bilan,
        motif,
        date,
      }
    });
    const idRapport = response.id;
    if(medicaments.length > 0 ){
      medicaments.map(async(medicament) =>{
        await prisma.offrir.create({
          data:{
            idrapport: idRapport,
            idmedicament: medicament.idMedicament,
            quantite: medicament.qte,
          }
        });
      });
    }
  }catch(e){
    console.error('Error creating rapport', e);
    throw new Error('Failed to create rapport');
  }
};