import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from '../Menu/UI/Card';
import Gradient from '../Menu/UI/Gradient';
import { Link } from 'react-router-dom';
import { getMainCourseService } from '../service/ApiClient';
import useStore from '../store/useStore';

const MainCourse = () => {
  const { mainCourse, setMainCourse } = useStore();

  const fetchMainCourse = useCallback(async () => {
    try {
      const data = await getMainCourseService();
      if (data && data.results) {
        setMainCourse(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch main course:', error);
    }
  }, [setMainCourse]);

  useEffect(() => {
    if (mainCourse.length === 0) {
      fetchMainCourse();
    }
  }, [mainCourse, fetchMainCourse]);

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
