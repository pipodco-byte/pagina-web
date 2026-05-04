import React from 'react';
import PipodNavbar from './PipodNavbar';
import CartDrawer from './cart/CartDrawer';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
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