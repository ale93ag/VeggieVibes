//VeggieVibes\src\components\Appetizer.jsx

import React, { useEffect, useState } from 'react';
import { getAppetizerService } from '../service/recipes.service';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';

const Appetizer = () => {
  const [appetizer, setAppetizer] = useState([]);

  useEffect(() => {
    const fetchAppetizer = async () => {
      const localData = getLocalStorageData('appetizer');
      if (localData) {
        setAppetizer(localData);
      } else {
        const data = await getAppetizerService();
        if (data && data.results) {
          setAppetizer(data.results);
          setLocalStorageData('appetizer', data.results, 60); // Imposto 60 minuti di scadenza
        }
      }
    };

    fetchAppetizer();
  }, []);

  return (
    <Wrapper>
      <h3>Appetizer</h3>
      <Splide
        aria-label="Appetizer"
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {appetizer.map((item) => (
          <SplideSlide key={item.id}>
            <Card>
              <Link to={`/detail/${item.id}`}>
                <img src={item.image} alt={item.title} />
                <Gradient />
                <p>{item.title}</p>
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
  text-align: center;

  h3 {
    font-size: 1.8rem;
  }
`;

export default Appetizer;
