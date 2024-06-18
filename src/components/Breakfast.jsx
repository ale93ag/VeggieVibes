import React, { useEffect, useState } from 'react';
import { getBreakfastService } from '../service/recipes.service';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';

const Breakfast = () => {
  const [breakfast, setBreakfast] = useState([]);

  // Definizione della funzione fetchBreakfast all'esterno di useEffect
  const fetchBreakfast = async () => {
    try {
      const localData = getLocalStorageData('breakfast');
      if (localData) {
        setBreakfast(localData);
      } else {
        const data = await getBreakfastService();
        if (data && data.results) {
          setBreakfast(data.results);
          setLocalStorageData('breakfast', data.results, 60); // Cache for 1 hour (60 minutes)
        }
      }
    } catch (error) {
      console.error('Failed to fetch breakfast:', error);
    }
  };

  useEffect(() => {
    fetchBreakfast(); // Chiamata della funzione fetchBreakfast dentro useEffect
  }, []);

  return (
    <Wrapper>
      <h3>Breakfast</h3>
      <Splide
        aria-label="Breakfast"
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {breakfast.map((item) => (
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

export default Breakfast;

