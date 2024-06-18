import React, { useEffect, useState } from 'react';
import { getDessertService } from '../service/recipes.service';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';

const Dessert = () => {
  const [dessert, setDessert] = useState([]);

  // Definizione della funzione fetchDessert all'esterno di useEffect
  const fetchDessert = async () => {
    try {
      const localData = getLocalStorageData('dessert');
      if (localData) {
        setDessert(localData);
      } else {
        const data = await getDessertService();
        if (data && data.results) {
          setDessert(data.results);
          setLocalStorageData('dessert', data.results, 60); // Cache for 1 hour (60 minutes)
        }
      }
    } catch (error) {
      console.error('Failed to fetch dessert:', error);
    }
  };

  useEffect(() => {
    fetchDessert(); // Chiamata della funzione fetchDessert dentro useEffect
  }, []);

  return (
    <Wrapper>
      <h3>Dessert</h3>
      <Splide
        aria-label="Dessert"
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {dessert.map((item) => (
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

export default Dessert;




