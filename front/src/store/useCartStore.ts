import { create } from 'zustand';
import { Cart, CartFormData, CartItem } from '../types/cart';
import { useClientStore } from './useClientStore';
import { Client } from '../types/client';

interface CartStore {
  carts: Cart[];
  editingCart: Cart | null;
  addCart: (cartData: CartFormData) => void;
  editCart: (cartData: CartFormData) => void;
  deleteCart: (id: string) => void;
  setEditingCart: (cart: Cart | null) => void;
  reset?: () => void;
  delivery: (id: string) => void;
  fact: (id: string) => void;
  getById: (id: string) => {
    client: Client | undefined;
    id?: string | undefined;
    reference?: string | undefined;
    clientId?: string | undefined;
    items?: CartItem[] | undefined;
    status?: "pending" | "completed" | "cancelled" | undefined;
    totalAmount?: number | undefined;
    createdAt?: string | undefined;
    isDelivery?: boolean;
    isFacture?: boolean;
};
}

export const useCartStore = create<CartStore>((set, get) => ({
  carts: [],
  editingCart: null,
  addCart: (cartData) => {

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
      isDelivery: false,
      isFacture: false
    };
    set((state) => ({ carts: [...state.carts, newCart] }));
  },
  editCart: (cartData) => {
    set((state) => {
      if (!state.editingCart) return state;

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
  delivery(id) {
    set(prev => ({ ...prev, carts: prev.carts.map(ct => ct.id !== id ? ct : { ...ct, isDelivery: true }) }))
  },
  fact(id) {
    set(prev => ({ ...prev, carts: prev.carts.map(ct => ct.id !== id ? ct : { ...ct, isFacture: true }) }))
  },
  getById(id) {
    return {...get().carts.find(c => c.id === id), client: useClientStore.getState().getById(get().carts.find(ct => ct.id === id)?.clientId!)}
  },
}));