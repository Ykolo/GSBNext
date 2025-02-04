export const fetchMedecins = async () => {
  try {
    const response = await fetch('/api/medecins');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching medecins:', error);
    return [];
  }
}

export const searchMedecins = async (search: string) => {
  try {
    const response = await fetch(`/api/medecins/search?nom=${encodeURIComponent(search)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching medecins:', error);
    return [];
  }
}

export const fetchMedecin = async (id: number) => {
  try {
    const response = await fetch(`/api/medecin/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching medecin:', error);
    return null;
  }
}

export const fetchRapportsByMedecin = async (idMedecin: number) => {
  try {
    const response = await fetch(`/api/rapports/${idMedecin}`);
    const data = await response.json();
    return data || []; 
  } catch (error) {
    console.error('Error fetching rapports:', error);
    return [];
  }
}