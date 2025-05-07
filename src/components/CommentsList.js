import React, { useState } from 'react';

const CommentsList = ({ comments, onCommentDeleted, onCommentEdited }) => {
  const [editingCommentId, setEditingCommentId] = useState(null); // Per sapere quale commento stiamo modificando
  const [editedComment, setEditedComment] = useState(''); // Per memorizzare il commento modificato
  const [editedRate, setEditedRate] = useState(1); // Per memorizzare il voto modificato

  // Funzione per gestire l'eliminazione di un commento
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`https://api.example.com/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Errore durante l\'eliminazione del commento');
      onCommentDeleted(); // Aggiorna la lista dei commenti
    } catch (err) {
      console.error(err.message);
    }
  };

  // Funzione per gestire la modifica di un commento
  const editComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.example.com/comments/${editingCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: editedComment, rate: editedRate }),
      });
      if (!response.ok) throw new Error('Errore durante la modifica del commento');
      setEditingCommentId(null); // Esci dalla modalità modifica
      onCommentEdited(); // Aggiorna la lista dei commenti
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>
          {editingCommentId === comment._id ? (
            // Modalità di modifica
            <form onSubmit={editComment}>
              <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                required
              />
              <select
                value={editedRate}
                onChange={(e) => setEditedRate(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <button type="submit">Salva</button>
              <button type="button" onClick={() => setEditingCommentId(null)}>
                Annulla
              </button>
            </form>
          ) : (
            // Visualizzazione normale
            <>
              <strong>{comment.author}:</strong> {comment.comment} (Rating: {comment.rate}/5)
              <button onClick={() => deleteComment(comment._id)}>Elimina</button>
              <button
                onClick={() => {
                  setEditingCommentId(comment._id);
                  setEditedComment(comment.comment);
                  setEditedRate(comment.rate);
                }}
              >
                Modifica
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
