// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import ProductList from '../components/ProductList';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { id: number; name: string };
}

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        // Fetch products by category ID from Platzi Fake Store API
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
        );
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-8">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Category Products</h1>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
