import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';
import { getSnackService } from '../service/ApiClient';

const Snack = () => {
  const [snack, setSnack] = useState([]);

  // Definizione della funzione fetchSnack al di fuori di useEffect per migliorare la leggibilità
  const fetchSnack = async () => {
    try {
      const localData = getLocalStorageData('snack');
      if (localData) {
        setSnack(localData);
      } else {
        const data = await getSnackService();
        if (data && data.results) {
          setSnack(data.results);
          setLocalStorageData('snack', data.results, 60); // Cache per 1 ora (60 minuti)
        }
      }
    } catch (error) {
      console.error('Errore nel recupero degli snack:', error);
    }
  };

  useEffect(() => {
    fetchSnack(); // Chiamata della funzione fetchSnack dentro useEffect
  }, []);

  return (
    <Wrapper>
      <h3>Snack</h3>
      <Splide
        aria-label="Snack"
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {snack.map((item) => (
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

export default Snack;

