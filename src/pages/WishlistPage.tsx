// src/pages/WishlistPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import ProductList from '../components/ProductList'; 

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const fetchWishlist = () => {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (productId: number) => {
    // Remove item from wishlist
    const updatedWishlist = wishlist.filter((product) => product.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto py-8">
      <Navbar /> {/* Add Navbar component */}
      <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="relative p-4 border rounded-lg shadow-md">
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 transition"
                aria-label="Remove from Wishlist"
              >
                ×
              </button>
              <ProductList products={[product]} /> {/* Display each wishlist item */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your wishlist is currently empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
