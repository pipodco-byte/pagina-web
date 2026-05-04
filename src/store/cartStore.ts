import { atom, computed } from 'nanostores';

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
export const isCartOpen = atom(false);

cartItems.listen((items) => {
  if (isBrowser) {
    localStorage.setItem('pipod-cart', JSON.stringify(items));
  }
});

export const itemCount = computed(cartItems, (items) =>
  items.reduce((acc, item) => acc + item.cantidad, 0)
);

export const cartTotal = computed(cartItems, (items) =>
  items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
);

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

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}

export function toggleCart() {
  isCartOpen.set(!isCartOpen.get());
}
