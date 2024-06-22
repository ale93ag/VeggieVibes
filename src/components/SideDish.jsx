import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { Link } from 'react-router-dom';
import { getSideDishService } from '../service/ApiClient';
import useStore from '../store/useStore';

const SideDish = () => {
  const { sideDish, setSideDish } = useStore();

  const fetchSideDish = useCallback(async () => {
    try {
      const data = await getSideDishService();
      if (data && data.results) {
        setSideDish(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch side dish:', error);
    }
  }, [setSideDish]);

  useEffect(() => {
    if (sideDish.length === 0) {
      fetchSideDish();
    }
  }, [sideDish, fetchSideDish]);

  return (
    <Wrapper>
      <h3>Side Dish</h3>
      <Splide
        aria-label="Side Dish"
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {sideDish.map((item) => (
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

export default SideDish;



