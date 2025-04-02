import { describe, expect, it } from "vitest";

// Supposons que vous avez un utilitaire pour formater des dates dans votre application
// Importez ici la fonction ou le composant que vous souhaitez tester
// import { formatDate } from '../utils/dateUtils';

describe("Utilitaires de l'application", () => {
  it("devrait formater correctement une date", () => {
    // Vous pouvez remplacer ce test factice par un test réel avec vos fonctions
    const mockFormatDate = (date: Date): string => {
      return date.toLocaleDateString("fr-FR");
    };

    const testDate = new Date(2023, 0, 15); // 15 janvier 2023
    const result = mockFormatDate(testDate);

    expect(result).toBe("15/01/2023");
  });
});

describe("Utilitaires pour les rapports médicaux", () => {
  it("devrait formater correctement une date de rapport", () => {
    const formatDateRapport = (date: Date): string => {
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };

    const dateRapport = new Date(2023, 4, 8); // 8 mai 2023
    const result = formatDateRapport(dateRapport);

    expect(result).toBe("08 mai 2023");
  });

  it("devrait générer un identifiant unique pour un nouveau rapport", () => {
    const genererIdRapport = (
      prefix: string = "RAP",
      index: number = 1
    ): string => {
      const indexFormatted = index.toString().padStart(3, "0");
      return `${prefix}${indexFormatted}`;
    };

    const id1 = genererIdRapport("RAP", 1);
    const id2 = genererIdRapport("RAP", 12);

    expect(id1).toBe("RAP001");
    expect(id2).toBe("RAP012");
  });
});
