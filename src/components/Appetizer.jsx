import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { Link } from 'react-router-dom';
import { getAppetizerService } from '../service/ApiClient';
import useStore from '../store/useStore';

const Appetizer = () => {
  const { appetizers, setAppetizers } = useStore();

  const fetchAppetizers = useCallback(async () => {
    try {
      const data = await getAppetizerService();
      if (data && data.results) {
        setAppetizers(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch appetizers:', error);
    }
  }, [setAppetizers]);

  useEffect(() => {
    if (appetizers.length === 0) {
      fetchAppetizers();
    }
  }, [appetizers, fetchAppetizers]);

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

