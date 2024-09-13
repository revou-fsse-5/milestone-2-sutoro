// src/components/WishlistView.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WishlistView from './WishlistView';

// Mock localStorage
const setItemMock = jest.fn();
const getItemMock = jest.fn(() => JSON.stringify([
  { id: 1, title: 'Product 1', price: 10, images: ['image1.jpg'] },
  { id: 2, title: 'Product 2', price: 20, images: ['image2.jpg'] },
]));
const reloadMock = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: setItemMock,
    getItem: getItemMock,
  },
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: {
    reload: reloadMock,
  },
  writable: true,
});

describe('WishlistView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('removes a product from the wishlist when "Remove" button is clicked', () => {
    render(
      <WishlistView
        products={[
          { id: 1, title: 'Product 1', price: 10, images: ['image1.jpg'] },
          { id: 2, title: 'Product 2', price: 20, images: ['image2.jpg'] },
        ]}
      />
    );

    // Check if the products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    // Get all "Remove" buttons
    const removeButtons = screen.getAllByText('Remove');

    // Click the "Remove" button for Product 1 (assuming it's the first button)
    fireEvent.click(removeButtons[0]);

    // Assert that localStorage.setItem was called with the updated wishlist
    expect(setItemMock).toHaveBeenCalledWith('wishlist', JSON.stringify([
      { id: 2, title: 'Product 2', price: 20, images: ['image2.jpg'] },
    ]));

    // Assert that window.location.reload() was called
    expect(reloadMock).toHaveBeenCalled();
  });
});
