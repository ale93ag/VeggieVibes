// VeggieVibes\src\Menu\SearchBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <Input 
        type="text" 
        value={searchQuery} 
        onChange={handleInputChange} 
        placeholder="Search for recipes..."
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Input = styled.input`
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff4500;
  }
`;

export default SearchBar;





