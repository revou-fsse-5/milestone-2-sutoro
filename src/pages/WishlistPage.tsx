// src/pages/WishlistPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import WishlistView from '../components/WishlistView'; 

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

  return (
    <div className="container mx-auto py-px">
      <Navbar /> {/* Add Navbar component */}
      <h1 className="text-3xl font-bold text-center mb-px">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid">
          {wishlist.map((product) => (
            <div key={product.id} className="relative p-px border rounded-lg shadow-md">
              <WishlistView products={[product]} /> {/* Display each wishlist item */}
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
