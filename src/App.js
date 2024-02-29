import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/home/home';
import Men from './components/products/men';
import Women from './components/products/women';
import Account from './components/account/auth';
import ClothingDetails from './components/details/ClothingDetails';
import Cart from './components/cart/cart';

const App = () => {
  const [selectedClothing, setSelectedClothing] = useState(null);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/men" element={<Men setSelectedClothing={setSelectedClothing} />} />
          <Route path="/women" element={<Women setSelectedClothing={setSelectedClothing} />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/clothing/:id"
            element={<ClothingDetails selectedClothing={selectedClothing} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
