// src/components/Dessert.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { Link } from 'react-router-dom';
import { getDessertService } from '../service/ApiClient';
import useStore from '../store/useStore';

const Dessert = () => {
  const { dessert, setDessert } = useStore();

  const fetchDessert = async () => {
    try {
      const data = await getDessertService();
      if (data && data.results) {
        setDessert(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch dessert:', error);
    }
  };

  useEffect(() => {
    if (dessert.length === 0) {
      fetchDessert();
    }
  }, [dessert]);

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



