// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios to make API requests
import ProductList from '../components/ProductList';
import Navbar from '../components/Navbar'; 

// Define the Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // State to hold products
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    // Fetch products from Platzi Fake Store API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data); // Update state with fetched products
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div>
      <Navbar /> 
      <div className="container mx-auto py-8">
        <ProductList products={products} /> {/* Pass products as props */}
      </div>
    </div>
  );
};

export default HomePage;
