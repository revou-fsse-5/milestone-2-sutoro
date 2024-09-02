// src/components/WishlistView.tsx
import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface WishlistViewProps {
  products: Product[];
}

const WishlistView: React.FC<WishlistViewProps> = ({ products }) => {
  // Function to remove an item from the wishlist
  const handleRemoveFromWishlist = (id: number) => {
    const updatedWishlist = products.filter((item) => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.location.reload(); // Reload to update the wishlist state
  };

  return (
    <div className="w-full py-2">     
      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-lg rounded-lg p-4"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex-1 mr-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Remove
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
