import React from 'react';
import { Alert } from 'react-bootstrap';

const Welcome = () => (
  <div className="text-center my-4">
    <Alert variant="primary">
      <h1>Welcome to EpiBooks</h1>
      <p>Discover your next favorite book!</p>
    </Alert>
  </div>
);

export default Welcome;
