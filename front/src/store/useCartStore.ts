import { create } from 'zustand';
import { Cart, CartFormData } from '../types/cart';

interface CartStore {
  carts: Cart[];
  editingCart: Cart | null;
  addCart: (cartData: CartFormData) => void;
  editCart: (cartData: CartFormData) => void;
  deleteCart: (id: string) => void;
  setEditingCart: (cart: Cart | null) => void;
  reset?: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  carts: [],
  editingCart: null,
  addCart: (cartData) => {

    // Ajouter le prix unitaire à chaque item
    const itemsWithPrices = cartData.items.map(item => {
      return {
        ...item,
        unitPrice: item.unitPrice
      };
    });

    const totalAmount = itemsWithPrices.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);

    const newCart: Cart = {
      ...cartData,
      items: itemsWithPrices,
      id: crypto.randomUUID(),
      totalAmount,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ carts: [...state.carts, newCart] }));
  },
  editCart: (cartData) => {
    set((state) => {
      if (!state.editingCart) return state;

      // Conserver les prix unitaires existants ou utiliser les nouveaux prix pour les nouveaux items
      const itemsWithPrices = cartData.items.map(item => {
        const existingItem = state.editingCart?.items.find(i => i.productId === item.productId);
        if (existingItem) {
          return {
            ...item,
            unitPrice: existingItem.unitPrice
          };
        }
        return {
          ...item,
          unitPrice: 0
        };
      });

      const totalAmount = itemsWithPrices.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0);

      return {
        carts: state.carts.map((cart) =>
          cart.id === state.editingCart?.id
            ? {
              ...cartData,
              items: itemsWithPrices,
              id: cart.id,
              totalAmount,
              createdAt: cart.createdAt
            }
            : cart
        ),
        editingCart: null,
      };
    });
  },
  deleteCart: (id) => {
    set((state) => ({
      carts: state.carts.filter((cart) => cart.id !== id),
    }));
  },
  setEditingCart: (cart) => {
    set({ editingCart: cart });
  },
  reset() {
    set({ carts: [] })
  },
}));