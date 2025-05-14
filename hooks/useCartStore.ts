// hooks/useCartStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware'; // To persist cart state if needed (optional, requirement was for count to persist across re-renders which component state can do, but this is more robust)

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  // persist( // Uncomment to persist cart in localStorage
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      incrementQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrementQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
            // Optional: remove item if quantity becomes 0 after decrementing from 1
            // .filter(item => item.quantity > 0),
        })),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
  //   {
  //     name: 'cart-storage', // name of the item in the storage (must be unique)
  //   }
  // )
);
