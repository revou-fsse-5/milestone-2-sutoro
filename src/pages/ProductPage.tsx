// src/pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; 

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto">
      <Navbar /> {/* Add Navbar component */}
      {product ? (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-center text-2xl font-bold mb-4">{product.title}</h1>
          <img className="block mx-auto w-1/2 h-1/2 object-cover rounded mb-4" src={product.images[0]} alt={product.title} />
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
