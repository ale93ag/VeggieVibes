//VeggieVibes\src\pages\views\Home.jsx

import React from 'react';
import Appetizer from '../../components/Appetizer';
import MainCourse from '../../components/MainCourse';
import Breakfast from '../../components/Breakfast';
import SideDish from '../../components/SideDish';
import Snack from '../../components/Snack';
import Dessert from '../../components/Dessert';


const Home = () => {
  return (
    <div>
      <MainCourse />
      <Breakfast />
      <SideDish />
      <Appetizer />
      <Snack />
      <Dessert />
    </div>
  );
};

export default Home;


