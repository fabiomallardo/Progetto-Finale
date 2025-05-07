import React, { useContext } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { ThemeContext } from './ThemeContext';

const MyNav = ({ searchQuery = '', setSearchQuery }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar bg={theme} variant={theme} expand="lg">
      <Navbar.Brand href="#">EpiBooks</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Browse</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="text"
            placeholder="Cerca un libro..."
            className="me-2"
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)} // Ora non darà errore
          />
        </Form>
        <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
