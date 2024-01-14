import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './Detail';
import FavoriteCharacters from './FavoriteCharacters';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path='/detail' element={<Detail/>} />
          <Route path='/favorite' element={<FavoriteCharacters/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
