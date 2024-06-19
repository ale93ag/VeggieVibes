import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { getLocalStorageData, setLocalStorageData } from '../service/localStorage';
import { Link } from 'react-router-dom';
import { getMainCourseService } from '../service/ApiClient';

const MainCourse = () => {
  const [mainCourse, setMainCourse] = useState([]);

  // Definizione della funzione fetchMainCourse all'esterno di useEffect
  const fetchMainCourse = async () => {
    try {
      const localData = getLocalStorageData('mainCourse');
      if (localData) {
        setMainCourse(localData);
      } else {
        const data = await getMainCourseService();
        if (data && data.results) {
          setMainCourse(data.results);
          setLocalStorageData('mainCourse', data.results, 60); // Cache for 1 hour (60 minutes)
        }
      }
    } catch (error) {
      console.error('Failed to fetch main course:', error);
    }
  };

  useEffect(() => {
    fetchMainCourse(); // Chiamata della funzione fetchMainCourse dentro useEffect
  }, []);

  return (
    <Wrapper>
      <h3>Main Course</h3>
      <Splide
        aria-label="Main Course"
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}
      >
        {mainCourse.map((item) => (
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

export default MainCourse;


