// src/components/WishlistView.tsx
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const WishlistView: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Load wishlist items from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Remove item from wishlist
  const handleRemoveFromWishlist = (id: number) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="mt-4 text-red-500 hover:text-red-700"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistView;
