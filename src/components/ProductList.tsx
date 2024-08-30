// src/components/ProductList.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Importing icons
import HeartIcon from '../assets/icons/heart.png';
import CartIcon from '../assets/icons/cart.png';

// Define Product interface (ensure it matches with other pages)
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

// Define the props interface for ProductList
interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // Function to add a product to the wishlist
  const addToWishlist = (product: Product) => {
    const storedWishlist = localStorage.getItem('wishlist');
    const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    if (!wishlist.some((item: Product) => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert(`${product.title} added to wishlist!`);
    } else {
      alert(`${product.title} is already in your wishlist.`);
    }
  };

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    if (!cart.some((item: Product) => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.title} added to cart!`);
    } else {
      alert(`${product.title} is already in your cart.`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition relative"
        >
          <Link to={`/product/${product.id}`} className="block">
            <img
              className="w-full h-48 object-cover rounded mb-4"
              src={product.images[0]}
              alt={product.title}
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </Link>
          <div className="flex space-x-2 mt-4 absolute bottom-2 right-2">
            <img
              src={HeartIcon}
              alt="Add to Wishlist"
              onClick={() => addToWishlist(product)}
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
            />
            <img
              src={CartIcon}
              alt="Add to Cart"
              onClick={() => addToCart(product)}
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
