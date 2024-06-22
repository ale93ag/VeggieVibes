import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { Link } from 'react-router-dom';
import { getBreakfastService } from '../service/ApiClient';
import useStore from '../store/useStore';

const Breakfast = () => {
  const { breakfast, setBreakfast } = useStore();

  const fetchBreakfast = useCallback(async () => {
    try {
      const data = await getBreakfastService();
      if (data && data.results) {
        setBreakfast(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch breakfast:', error);
    }
  }, [setBreakfast]);

  useEffect(() => {
    if (breakfast.length === 0) {
      fetchBreakfast();
    }
  }, [breakfast, fetchBreakfast]);

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





