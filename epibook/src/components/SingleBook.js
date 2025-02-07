import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleBook = ({ book }) => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  // 🔍 Debug: Stampa i libri quando vengono renderizzati
  console.log("🛠 Pulsante 'Dettagli' creato per:", book.title, "ASIN:", book.asin);

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div
        className="card"
        style={{
          cursor: "pointer",
          border: selected ? "3px solid red" : "1px solid #ccc",
          width: "300%", 
          minHeight: "450px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          textAlign: "center",
        }}
        onClick={() => setSelected(!selected)}
      >
        <img
          src={book.img}
          className="card-img-top"
          alt={book.title}
          style={{
            height: "250px",
            width: "100%", 
            objectFit: "cover",
          }}
        />
        <div
          className="card-body"
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h5 className="card-title">{book.title}</h5>
        </div>
        <button
  className="btn btn-primary"
  data-testid={`details-button-${book.asin}`}
  onClick={(e) => {
    e.stopPropagation();
    console.log("🛠 Click su Dettagli di:", book.title, "ASIN:", book.asin);
    navigate(`/book/${book.asin}`);
  }}
>
  Dettagli
</button>

      </div>
    </div>
  );
};

export default SingleBook;
