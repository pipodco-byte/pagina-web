import { CartProvider } from '../context/CartContext';

export default function CartProviderWrapper({ children }: { children: any }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
