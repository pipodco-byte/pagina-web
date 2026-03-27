import { atom } from 'nanostores';

export type CartItem = {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  thumb_src: string;
  slug: string;
};

const isBrowser = typeof window !== 'undefined';
const initialCart = isBrowser ? JSON.parse(localStorage.getItem('pipod-cart') || '[]') : [];

export const cartItems = atom<CartItem[]>(initialCart);

cartItems.listen((items) => {
  if (isBrowser) {
    localStorage.setItem('pipod-cart', JSON.stringify(items));
  }
});

export function addItem(item: Omit<CartItem, 'cantidad'>) {
  const items = cartItems.get();
  const existingItem = items.find((i) => i.id === item.id);

  if (existingItem) {
    const updated = items.map((i) =>
      i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
    );
    cartItems.set(updated);
  } else {
    const newItems = [...items, { ...item, cantidad: 1 }];
    cartItems.set(newItems);
  }
}

export function removeItem(id: string) {
  const items = cartItems.get();
  cartItems.set(items.filter((item) => item.id !== id));
}

export function updateQuantity(id: string, cantidad: number) {
  const items = cartItems.get();
  if (cantidad <= 0) {
    removeItem(id);
    return;
  }
  cartItems.set(
    items.map((item) =>
      item.id === id ? { ...item, cantidad } : item
    )
  );
}

export function clearCart() {
  cartItems.set([]);
}

export function getTotal() {
  const items = cartItems.get();
  return items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

export function getItemCount() {
  const items = cartItems.get();
  return items.reduce((sum, item) => sum + item.cantidad, 0);
}
