import React, { useEffect, useState } from 'react';
import { getSnackService } from '../service/recipes.service';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../UI/Card';
import Gradient from '../UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';

const Snack = () => {
  const [snack, setSnack] = useState([]);

  useEffect(() => {
    const fetchSnack = async () => {
      const localData = getLocalStorageData('snack');
      if (localData) {
        setSnack(localData);
      } else {
        const data = await getSnackService();
        if (data && data.results) {
          setSnack(data.results);
          setLocalStorageData('snack', data.results, 60); // Imposto 60 minuti di scadenza
        }
      }
    };

    fetchSnack();
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
