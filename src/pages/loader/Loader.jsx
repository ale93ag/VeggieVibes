// Loader.jsx
import React from 'react';
import styled from 'styled-components';

const Loader = ({ text = 'Caricamento in corso...' }) => (
  <LoaderWrapper>
    <p>{text}</p>
  </LoaderWrapper>
);

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px; /* Altezza arbitraria, puoi personalizzare secondo necessità */
`;

export default Loader;

