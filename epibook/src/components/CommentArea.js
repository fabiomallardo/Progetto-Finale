import React, { useState, useEffect } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';
import { BASE_URL, headers } from './apiConfig';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Definizione della funzione fetchComments
  const fetchComments = async () => {
    if (!bookId) return; // Se non c'è un libro selezionato, non fare la fetch
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${bookId}`, { headers });
      if (!response.ok) throw new Error('Errore nel recupero dei commenti');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(); // Recupera i commenti quando cambia bookId
  }, [bookId]);

  return (
    <div>
      {loading && <p>Caricamento...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CommentsList
        comments={comments}
        onCommentDeleted={fetchComments} // Ora la funzione è definita correttamente
      />
      <AddComment bookId={bookId} onCommentAdded={fetchComments} />
    </div>
  );
};

export default CommentArea;
