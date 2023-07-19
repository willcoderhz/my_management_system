import React, { useState, useEffect } from 'react';
import './Products.css';

interface Product {
  id: number; // 注意，你需要 id 以便你知道要删除哪个产品
  name: string;
  type: string;
  description: string;
  price: number;
  stock: number;
  image_path: string; // 添加这一行
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://production-management-a2a43e9e1fb5.herokuapp.com/products'); // 修改了这里
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  const deleteProduct = async (id: number) => {
    try {
      await fetch(`https://production-management-a2a43e9e1fb5.herokuapp.com/products/${id}`, { method: 'DELETE' }); // 修改了这里
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
          <img src={`https://production-management-a2a43e9e1fb5.herokuapp.com/${product.image_path}`} alt={product.name} /> // 修改了这里
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
