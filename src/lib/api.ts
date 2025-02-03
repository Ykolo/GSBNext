export const fetchMedecins = async () => {
  const response = await fetch('/api/medecins');
  const data = await response.json();
  return data.data;
}

export const searchMedecins = async (search: string) => {
  const response = await fetch(`/api/medecins/search?nom=${encodeURIComponent(search)}`);
  const data = await response.json();
  return data.data;
}

export const fetchMedecin = async (id: number) => {
  const response = await fetch(`/api/medecin/${id}`);
  const data = await response.json();
  return data.data;
}

export const fetchRapportsByMedecin = async (idMedecin: number) => {
  const response = await fetch(`/api/rapports/${idMedecin}`)
  const data = await response.json();
  return data.data;
}