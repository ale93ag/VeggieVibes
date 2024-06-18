import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../loader/Loader";
import { searchRecipesService } from "../../service/recipes.service";
import Card from "../../Menu/UI/Card";
import Gradient from "../../Menu/UI/Gradient";

//VeggieVibes\src\pages\views\SearchResults.jsx
const SearchResults = () => {
  const { searchValue } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Stato per il loader

  useEffect(() => {
      const fetchResults = async () => {
          try {
              const data = await searchRecipesService(searchValue);
              setResults(data.results);
              setLoading(false); // Imposta lo stato del loader a false dopo aver ottenuto i risultati di ricerca
          } catch (error) {
              console.error('Errore nel recupero dei risultati di ricerca:', error);
              setLoading(false); // Assicura che il loader sia nascosto in caso di errore
          }
      };
      fetchResults();
  }, [searchValue]);

  return (
      <Grid>
          {loading ? (
              <Loader text="Caricamento risultati..." /> // Mostra il loader durante il caricamento dei risultati
          ) : (
              results.map((item) => (
                  <Card key={item.id}>
                      <Link to={`/detail/${item.id}`}>
                          <img src={item.image} alt={item.title} />
                          <Gradient />
                          <p>{item.title}</p>
                      </Link>
                  </Card>
              ))
          )}
      </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

export default SearchResults;