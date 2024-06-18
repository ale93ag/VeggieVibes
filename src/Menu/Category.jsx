// VeggieVibes\src\Menu\Category.jsx
import React from 'react';
import styled from 'styled-components';
import { IoHome } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import Flag from 'react-flagkit';

const Category = ({ setSearchQuery }) => {
  const handleHomeClick = () => {
    setSearchQuery(''); // Resetta il campo di ricerca
  };

  return (
    <List>
      <StyledNavLink to="/" onClick={handleHomeClick}><StyledIcon as={IoHome} /></StyledNavLink>
      <StyledNavLink to="/cuisine/American"><StyledFlag country="US" /></StyledNavLink>
      <StyledNavLink to="/cuisine/French"><StyledFlag country="FR" /></StyledNavLink>
      <StyledNavLink to="/cuisine/Spanish"><StyledFlag country="ES" /></StyledNavLink>
      <StyledNavLink to="/cuisine/Italian"><StyledFlag country="IT" /></StyledNavLink>
      <StyledNavLink to="/cuisine/Indian"><StyledFlag country="IN" /></StyledNavLink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const StyledNavLink = styled(NavLink)`
  margin: 0 1rem; /* Aggiunge margine sinistro e destro */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFlag = styled(Flag)`
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Category;






