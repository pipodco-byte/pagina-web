import React, { useEffect } from 'react';
import PipodNavbar from './pipodNavbar';
import CartDrawer from './cart/CartDrawer';
import { cartItems } from '../store/cartStore';
import type { CartItem } from '../store/cartStore';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  useEffect(() => {
    const saved = localStorage.getItem('pipod-cart');
    if (saved) {
      try {
        const items: CartItem[] = JSON.parse(saved);
        cartItems.set(items);
      } catch (e) {
        console.warn('Failed to parse cart from localStorage');
      }
    }
  }, []);

  return (
    <>
      <PipodNavbar />
      <div style={{ display: 'contents' }}>
        {children}
      </div>
      <CartDrawer />
    </>
  );
}