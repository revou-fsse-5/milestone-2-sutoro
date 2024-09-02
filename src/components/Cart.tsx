// src/pages/Cart.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import WishlistView from '../components/WishlistView'; 

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = () => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="container mx-auto py-px">
      <Navbar /> {/* Add Navbar component */}
      <h1 className="text-3xl font-bold text-center mb-px">Your Cart</h1>
      {cart.length > 0 ? (
        <div className="grid">
          {cart.map((product) => (
            <div key={product.id} className="relative p-px border rounded-lg shadow-md">
              <WishlistView products={[product]} /> {/* Display each cart item */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is currently empty.</p>
      )}
    </div>
  );
};

export default Cart;
