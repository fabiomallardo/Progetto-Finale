import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import books from "../data/books.json";
import SingleBook from "./SingleBook";

const AllTheBooks = ({ searchQuery = "" }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <Row className="g-3">
      {books
        .filter((book) =>
          book.title.toLowerCase().includes((searchQuery || "").toLowerCase())
        )
        .map((book) => {
          console.log("📚 Rendering SingleBook:", book.title, "ASIN:", book.asin); // 🔍 DEBUG corretto
          return (
            <Col key={book.asin} sm={6} md={4} lg={3}>
              <SingleBook
                book={book}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
              />
            </Col>
          );
        })}
    </Row>
  );
};

export default AllTheBooks;
