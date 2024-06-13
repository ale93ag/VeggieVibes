import React, { useEffect, useState } from 'react';
import { getSideDishService } from '../service/recipes.service';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../UI/Card';
import Gradient from '../UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';

const SideDish = () => {
  const [sideDish, setSideDish] = useState([]);

  useEffect(() => {
    const fetchSideDish = async () => {
      const localData = getLocalStorageData('sideDish');
      if (localData) {
        setSideDish(localData);
      } else {
        const data = await getSideDishService();
        if (data && data.results) {
          setSideDish(data.results);
          setLocalStorageData('sideDish', data.results, 60); // Imposto 60 minuti di scadenza
        }
      }
    };

    fetchSideDish();
  }, []);

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
