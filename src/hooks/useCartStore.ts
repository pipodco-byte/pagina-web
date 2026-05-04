import { useStore } from '@nanostores/react';
import {
  cartItems,
  itemCount,
  cartTotal,
  isCartOpen,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} from '../store/cartStore';

export function useCartStore() {
  return {
    items: useStore(cartItems),
    itemCount: useStore(itemCount),
    total: useStore(cartTotal),
    isOpen: useStore(isCartOpen),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };
}