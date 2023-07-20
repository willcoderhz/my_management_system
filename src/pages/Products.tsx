import React, { useState, useEffect } from 'react';
import './Products.css';

interface Product {
  id: number; 
  name: string;
  type: string;
  description: string;
  price: number;
  stock: number;
  image_path: string; 
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://production-management-a2a43e9e1fb5.herokuapp.com/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const deleteProduct = async (id: number) => {
    try {
      await fetch(`https://production-management-a2a43e9e1fb5.herokuapp.com/api/products/${id}`, { method: 'DELETE' }); 
      fetchProducts(); 
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="products-container">
      <h1>Products List</h1>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <img src={`https://production-management-a2a43e9e1fb5.herokuapp.com/api/${product.image_path}`} alt={product.name} /> 
          <p>{product.description}</p>
          <p>{`Price: $${product.price}`}</p>
          <p>{`Stock: ${product.stock}`}</p>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
  
};

export default Products;
