// src/components/Snack.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { Link } from 'react-router-dom';
import { getSnackService } from '../service/ApiClient';
import useStore from '../store/useStore';

const Snack = () => {
  const { snack, setSnack } = useStore();

  const fetchSnack = async () => {
    try {
      const data = await getSnackService();
      if (data && data.results) {
        setSnack(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch snack:', error);
    }
  };

  useEffect(() => {
    if (snack.length === 0) {
      fetchSnack();
    }
  }, [snack]);

  return (
    <Wrapper>
      <h3>Snacks</h3>
      <Splide
        aria-label="Snacks"
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


