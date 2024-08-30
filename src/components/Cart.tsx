// src/components/Cart.tsx
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8">
          {cartItems.map(item => (
            <div key={item.id} className="mb-4 border-b pb-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <div className="flex items-center mt-2">
                <label className="mr-4">Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className="w-16 p-2 border border-gray-300 rounded"
                  min="1"
                />
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="mt-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
