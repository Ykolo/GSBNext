import { describe, expect, it } from "vitest";

// Modèle type pour un rapport de visite médicale
type RapportVisite = {
  id: string;
  date: Date;
  medecin: {
    id: string;
    nom: string;
    prenom: string;
    specialite: string;
  };
  motif: string;
  bilan: string;
  medicaments: Array<{
    id: string;
    nom: string;
    quantite: number;
  }>;
  estConfidentiel: boolean;
};

// Fonction utilitaire à tester - filtre les rapports par médecin
const filtrerRapportsParMedecin = (
  rapports: RapportVisite[],
  medecinId: string
): RapportVisite[] => {
  return rapports.filter(rapport => rapport.medecin.id === medecinId);
};

// Fonction utilitaire à tester - compte les médicaments présentés
const compterMedicamentsPresentes = (rapports: RapportVisite[]): number => {
  return rapports.reduce(
    (total, rapport) => total + rapport.medicaments.length,
    0
  );
};

describe("Gestion des rapports de visite médicale", () => {
  // Jeu de données pour les tests
  const rapportsTest: RapportVisite[] = [
    {
      id: "R001",
      date: new Date(2023, 3, 15),
      medecin: {
        id: "M001",
        nom: "Dupont",
        prenom: "Jean",
        specialite: "Cardiologie",
      },
      motif: "Présentation nouveau médicament",
      bilan: "Le médecin est intéressé par les nouveaux traitements",
      medicaments: [
        { id: "MED001", nom: "Cardiolex", quantite: 2 },
        { id: "MED002", nom: "Tensiofort", quantite: 1 },
      ],
      estConfidentiel: false,
    },
    {
      id: "R002",
      date: new Date(2023, 3, 16),
      medecin: {
        id: "M002",
        nom: "Martin",
        prenom: "Sophie",
        specialite: "Pédiatrie",
      },
      motif: "Suivi régulier",
      bilan: "Discussion sur les antibiotiques pédiatriques",
      medicaments: [{ id: "MED003", nom: "PediCare", quantite: 3 }],
      estConfidentiel: false,
    },
    {
      id: "R003",
      date: new Date(2023, 3, 17),
      medecin: {
        id: "M001",
        nom: "Dupont",
        prenom: "Jean",
        specialite: "Cardiologie",
      },
      motif: "Actualisation gamme",
      bilan: "Le médecin souhaite davantage d'informations",
      medicaments: [{ id: "MED004", nom: "CardioPlus", quantite: 1 }],
      estConfidentiel: true,
    },
  ];

  it("devrait filtrer correctement les rapports par médecin", () => {
    // Act
    const rapportsDupont = filtrerRapportsParMedecin(rapportsTest, "M001");

    // Assert
    expect(rapportsDupont.length).toBe(2);
    expect(rapportsDupont[0].medecin.nom).toBe("Dupont");
    expect(rapportsDupont[1].medecin.nom).toBe("Dupont");
  });

  it("devrait compter correctement le nombre de médicaments présentés", () => {
    // Act
    const totalMedicaments = compterMedicamentsPresentes(rapportsTest);

    // Assert
    expect(totalMedicaments).toBe(4); // 2 + 1 + 1 médicaments au total
  });

  it("devrait retourner un tableau vide si aucun rapport ne correspond au médecin", () => {
    // Act
    const rapportsInconnu = filtrerRapportsParMedecin(rapportsTest, "M999");

    // Assert
    expect(rapportsInconnu).toHaveLength(0);
  });
});
