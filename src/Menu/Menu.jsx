// VeggieVibes\src\Menu\Menu.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Category from './Category';
import styled from 'styled-components';
import Card from './UI/Card';
import Gradient from './UI/Gradient';

const Menu = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Stato per il valore della ricerca
  const location = useLocation();

  useEffect(() => {
    // Pulisco i risultati della ricerca quando l'URL cambia (cambio categoria o navigazione home)
    setSearchResults([]);
  }, [location.pathname]); // Aggiorna solo quando cambia l'URL

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Category setSearchQuery={setSearchQuery} />
      <SearchBar onSearch={handleSearchResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {searchResults.length > 0 ? (
        <Grid>
          {searchResults.map((item) => (
            <Card key={item.id}>
              <img src={item.image} alt={item.title} />
              <Gradient />
              <p>{item.title}</p>
            </Card>
          ))}
        </Grid>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

export default Menu;






