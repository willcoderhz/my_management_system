import React from 'react';
import './Products.css'; // Import the CSS file

interface Product {
  name: string;
  type: string;
  description: string;
  price: number;
  stock: number;
  image: string; // URL of the product image
}

const Products = () => {
  // This would come from the server in a real application
  const products: Product[] = [
    {
      name: 'Product 1',
      type: 'Type 1',
      description: 'This is product 1',
      price: 10.0,
      stock: 50,
      image: 'url_to_product_image'
    },
    // Add more products as needed
  ];

  return (
    <div className="products-container">
      <h1>Products</h1>
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>{`Price: $${product.price}`}</p>
          <p>{`Stock: ${product.stock}`}</p>
          <button>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
