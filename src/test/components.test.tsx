import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

// Supposons que vous avez un composant Header dans votre application
// import Header from '../components/Header';

describe("Composants de l'application", () => {
  it("devrait afficher correctement le composant Header", () => {
    // Ce test est un exemple, adaptez-le à vos composants réels
    const MockHeader = () => <header>GSB Application</header>;

    render(<MockHeader />);

    expect(screen.getByText("GSB Application")).toBeDefined();
  });
});

describe("Composants de rapports médicaux", () => {
  it("devrait afficher correctement le résumé d'un rapport médical", () => {
    // Création d'un composant fictif pour simuler un résumé de rapport
    const ResumeRapport = ({
      rapport,
    }: {
      rapport: { medecin: string; date: string; motif: string };
    }) => (
      <div>
        <h3>Rapport: Dr. {rapport.medecin}</h3>
        <p>Date: {rapport.date}</p>
        <p>Motif: {rapport.motif}</p>
      </div>
    );

    const rapportTest = {
      medecin: "Dupont",
      date: "15/04/2023",
      motif: "Présentation nouveau médicament",
    };

    render(<ResumeRapport rapport={rapportTest} />);

    expect(screen.getByText(/Dr\. Dupont/i)).toBeDefined();
    expect(screen.getByText(/Date: 15\/04\/2023/i)).toBeDefined();
    expect(
      screen.getByText(/Motif: Présentation nouveau médicament/i)
    ).toBeDefined();
  });

  it("devrait permettre de filtrer les rapports par date", async () => {
    const user = userEvent.setup();

    // Création d'un composant fictif de filtre par date
    const FiltreDateRapports = ({
      onDateChange,
    }: {
      onDateChange: (date: string) => void;
    }) => (
      <div>
        <label htmlFor="date-filtre">Filtrer par date</label>
        <input
          id="date-filtre"
          type="date"
          onChange={e => onDateChange(e.target.value)}
        />
      </div>
    );

    // Mock de la fonction de callback pour le changement de date
    let dateSelectionnee = "";
    const handleDateChange = (date: string) => {
      dateSelectionnee = date;
    };

    render(<FiltreDateRapports onDateChange={handleDateChange} />);

    // Simuler la sélection d'une date
    const dateInput = screen.getByLabelText(/Filtrer par date/i);
    await user.type(dateInput, "2023-05-10");

    expect(dateSelectionnee).toBe("2023-05-10");
  });
});
