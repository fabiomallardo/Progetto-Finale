import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "./components/ThemeContext";
import App from "./App";
import "@testing-library/jest-dom";


global.fetch = jest.fn();
beforeEach(() => {
  fetch.mockClear();
  console.log("📡 Mock API reset, chiamate fetch:", fetch.mock.calls.length);

  fetch.mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            asin: "123456",
            title: "Il Signore degli Anelli",
            img: "https://www.lafeltrinelli.it/images/9788858790311_0_0_536_0_75.jpg",
          },
        ]),
    })
  );
});




const renderWithProviders = (ui) =>
  render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );

describe("EpiBooks App", () => {
  
  test("Rende correttamente Navbar, Welcome e Footer", () => {
    renderWithProviders(<App />);
    expect(screen.getByText("EpiBooks")).toBeInTheDocument();
    expect(screen.getByText("Welcome to EpiBooks")).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  test("Mostra tutti i libri inizialmente", async () => {
    renderWithProviders(<App />);

   
    await waitFor(() => {
      const books = screen.queryAllByRole("heading", { level: 5 });
      expect(books.length).toBeGreaterThan(0);
    });
    
  });

  test("Filtra i libri in base alla ricerca", async () => {
    renderWithProviders(<App />);
    const searchInput = screen.getByPlaceholderText("Cerca un libro...");

    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

    await waitFor(() => {
      expect(screen.getByText("Harry Potter e la Pietra Filosofale")).toBeInTheDocument();
      expect(screen.queryByText("Il Signore degli Anelli")).not.toBeInTheDocument();
    });
  });

  test("Cambia tema quando si clicca sul bottone Dark Mode", () => {
    renderWithProviders(<App />);
    const themeToggleBtn = screen.getByText("🌙 Dark Mode");

    fireEvent.click(themeToggleBtn);

    expect(document.body.className).toBe("dark");
  });

  test("Naviga alla pagina dei dettagli di un libro", async () => {
    renderWithProviders(<App />);

   
    const detailsButton = await screen.findByTestId("details-button-123456");
    fireEvent.click(detailsButton);



   
    await waitFor(() => {
      expect(screen.getByText(/Autore:/i)).toBeInTheDocument();
    });
  });

  test("Gestisce i commenti (mock API)", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ _id: "1", comment: "Ottimo libro!", rate: 5 }]),
      })
    );
  
    renderWithProviders(<App />);
  
  

    await waitFor(() => {
      const books = screen.queryAllByRole("heading", { level: 5 });
    });
  });
  
});
