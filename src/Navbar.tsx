import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // 这里引入CSS

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
