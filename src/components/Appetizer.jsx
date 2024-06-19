// VeggieVibes\src\components\Appetizer.jsx

import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';
import { getAppetizerService } from '../service/ApiClient';


const Appetizer = () => {
  const [appetizers, setAppetizers] = useState([]);

  // Definizione della funzione fetchAppetizers all'esterno di useEffect
  const fetchAppetizers = async () => {
    try {
      const localData = getLocalStorageData('appetizers');
      if (localData) {
        setAppetizers(localData);
      } else {
        const data = await getAppetizerService();
        if (data && data.results) {
          setAppetizers(data.results);
          setLocalStorageData('appetizers', data.results, 60); // Cache for 1 hour (60 minutes)
        }
      }
    } catch (error) {
      console.error('Failed to fetch appetizers:', error);
    }
  };

  useEffect(() => {
    fetchAppetizers(); // Chiamata della funzione fetchAppetizers dentro useEffect
  }, []);

  return (
    <Wrapper>
      <h3>Appetizers</h3>
      <Splide
        aria-label="Appetizers"
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {appetizers.map((appetizer) => (
          <SplideSlide key={appetizer.id}>
            <Card>
              <Link to={`/detail/${appetizer.id}`}>
                <img src={appetizer.image} alt={appetizer.title} />
                <Gradient />
                <p>{appetizer.title}</p>
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

