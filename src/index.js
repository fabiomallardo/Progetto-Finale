import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './components/ThemeContext'; // Importa il ThemeProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider> {/* Avvolge tutta l'app nel contesto del tema */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
