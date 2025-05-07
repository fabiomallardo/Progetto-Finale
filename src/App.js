import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import MyNav from "./components/MyNav";
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import BookDetails from "./components/BookDetails";
import MyFooter from "./components/MyFooter";
import "./App.css";

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <MyNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Welcome />
        <div className="container">
          <Routes>
            <Route path="/" element={<AllTheBooks searchQuery={searchQuery} />} />
            <Route path="/book/:asin" element={<BookDetails />} />
          </Routes>
        </div>
        <MyFooter />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent /> {}
    </ThemeProvider>
  );
}

export default App;
