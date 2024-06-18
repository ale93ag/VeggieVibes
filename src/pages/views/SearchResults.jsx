import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../loader/Loader';
import { searchRecipesService } from '../../service/recipes.service';
import Card from '../../Menu/UI/Card';
import Gradient from '../../Menu/UI/Gradient';

const SearchResults = () => {
  const { searchValue } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [searchValue]);

  const fetchResults = async () => {
    try {
      const data = await searchRecipesService(searchValue);
      setResults(data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  return (
    <Grid>
      {loading ? (
        <Loader text="Loading results..." />
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
