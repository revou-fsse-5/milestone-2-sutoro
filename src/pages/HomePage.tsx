// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Navbar from '../components/Navbar';

// Define the Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // State to handle selected category
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = async (category: string) => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: category ? { categoryId: category } : {}, // Filter by category if selected
      });
      setProducts(response.data);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchProducts(selectedCategory);
    fetchCategories();
  }, [selectedCategory]);

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
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default HomePage;
