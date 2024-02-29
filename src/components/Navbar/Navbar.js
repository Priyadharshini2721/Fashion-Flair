import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../cart/carcontext';

const Navbar = () => {
  const { cartItems } = useCart(); // Access the cartItems from the cart context
  const cartItemCount = cartItems.length; // Get the length of the cartItems array

  return (
    <nav className="navbar">
      <div className="left-menu">
        <Link to="/">
          <img width="15%" src={"/logo.jpg"} alt="Logo" />
        </Link>
      </div>
      <div className="right-menu">
        <div className="menu-item">
          <Link to="/home">Home</Link>
        </div>
        <div className="menu-item">
          <Link to="/men">Men</Link>
        </div>
        <div className="menu-item">
          <Link to="/women">Women</Link>
        </div>
        <div className="menu-item">
          <Link to="/account">Account</Link>
        </div>
        <div className="menu-item cart-link">
          <Link to="/cart">
            <img width="20px" src={"/cart.jpg"} alt="Cart" />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
