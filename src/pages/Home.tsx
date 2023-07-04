import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // 这里引入CSS

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Our Product Management System</h1>
      <p>
        This is the best place to manage all your products. You can add new products,
        view a list of all products, and update product details.
      </p>
      <p>
        Get started by logging in, or view our products.
      </p>
      <Link to="/login" className="link">Login</Link><br/>
      <Link to="/products" className="link">View Products</Link>
    </div>
  );
}

export default Home;

