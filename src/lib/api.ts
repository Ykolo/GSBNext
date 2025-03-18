export const fetchMedecins = async () => {
  try {
    const response = await fetch("/api/medecins");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching medecins:", error);
    return [];
  }
};

export const searchMedecinsByName = async (search: string) => {
  try {
    const response = await fetch(
      `/api/medecins/search?nom=${encodeURIComponent(search)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching medecins:", error);
    return [];
  }
};

export const fetchMedecin = async (id: number) => {
  try {
    const response = await fetch(`/api/medecin/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching medecin:", error);
    return null;
  }
};

export const fetchRapportsByMedecin = async (idMedecin: number) => {
  try {
    const response = await fetch(`/api/rapports/${idMedecin}`);
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching rapports:", error);
    return [];
  }
};

export const fetchSpecialities = async () => {
  try {
    const response = await fetch("/api/specialities");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching specialities:", error);
    return [];
  }
};
export const SearchMedecinsBySpeciality = async (speciality: string) => {
  try {
    const response = await fetch(
      `/api/medecins/search?spe=${encodeURIComponent(speciality)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching medecins:", error);
    return [];
  }
};
export const fetchUser = async () => {
  try {
    const response = await fetch("/api/auth/user");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};

export const fetchRapportsByVisiteur = async (idVisiteur: string) => {
  try {
    const response = await fetch(`/api/rapports/visiteur/${idVisiteur}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rapports by visiteur:", error);
    return [];
  }
};

export const fetchRapportByID = async (id: number) => {
  try {
    const response = await fetch(`/api/rapport/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rapport:", error);
    return [];
  }
};
