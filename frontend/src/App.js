import React from 'react';
import Container from "react-bootstrap/Container";

import ReadFromBlockchain from './components/read';
import WriteToBlockchain from './components/write';

const App = () => {
  return (
    <Container className="p-3">
      <h1 className="header">CanaCred: Social Key Recovery </h1>
      <ReadFromBlockchain />
      <WriteToBlockchain />
    </Container>
  );
};

export default App;