import React, { useState } from 'react';
import { BASE_URL, headers } from './apiConfig';

const AddComment = ({ bookId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(1);
  const [error, setError] = useState(null);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!bookId) return;
    setError(null);
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          comment,
          rate,
          elementId: bookId,
        }),
      });
      if (!response.ok) throw new Error('Errore nell\'invio del commento');
      onCommentAdded();
      setComment('');
      setRate(1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submitComment}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
      </div>
      <div>
        <label>Valutazione:</label>
        <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <button type="submit">Aggiungi Commento</button>
    </form>
  );
};

export default AddComment;
