import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import books from "../data/books.json";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList"; // Se hai implementato anche questo

// Se usi un BASE_URL comune, ricorda di importarlo, oppure definiscilo nel componente
import { BASE_URL, headers } from "./apiConfig";

const BookDetails = () => {
  const { asin } = useParams();
  const book = books.find((b) => b.asin === asin);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funzione per recuperare i commenti dal server
  const fetchComments = async () => {
    if (!asin) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${asin}`, { headers });
      if (!response.ok) throw new Error("Errore nel recupero dei commenti");
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effettua il fetch dei commenti quando cambia l'asin
  useEffect(() => {
    fetchComments();
  }, [asin]);

  if (!book) {
    return <h2>Libro non trovato</h2>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.img} alt={book.title} style={{ width: "200px" }} />
      <p>
        <strong>Autore:</strong> {book.author}
      </p>
      <p>
        <strong>Prezzo:</strong> {book.price}€
      </p>
      <p>
        <strong>Descrizione:</strong> {book.description}
      </p>

      {/* Sezione per i commenti */}
      <div>
        <h2>Commenti</h2>
        {loading && <p>Caricamento commenti...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* Lista dei commenti */}
        <CommentsList
          comments={comments}
          onCommentDeleted={fetchComments}
          onCommentEdited={fetchComments}
        />
        {/* Form per aggiungere un nuovo commento */}
        <AddComment bookId={asin} onCommentAdded={fetchComments} />
      </div>
    </div>
  );
};

export default BookDetails;
