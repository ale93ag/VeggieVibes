// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Menu/Menu';
import Details from './pages/views/Details';
import Cuisine from './pages/views/Cuisine';
import Home from './pages/views/Home';
import SearchResults from './pages/views/SearchResults';


function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/search/:searchValue" element={<SearchResults />} /> {/* Nuova route per i risultati della ricerca */}
        <Route path="/detail/:id" element={<Details />} /> {/* Nuova route per i dettagli delle ricette */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

