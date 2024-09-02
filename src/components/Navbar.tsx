// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Sini Beli
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/wishlist"
              className="text-white hover:text-gray-200 transition"
            >
              Wishlist
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-white hover:text-gray-200 transition"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white hover:text-gray-200 transition"
            >
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
