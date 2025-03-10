import { create } from 'zustand';
import { User } from '../api/auth';
import { user_store } from './user';
import { useCartStore } from './useCartStore';

export interface Delivery {
  id?: string;
  cartId: string;
  validation: User[]
}

interface DeliveryStore {
  delivery: Delivery[];
  add: (cartId: string) => void;
  validate: (idCart: string) => void;
  countProductByDeliveryStatus: (productId: string, isDelivery: boolean) => number;
  countProductInDeliveries: (productId: string) => number;
}

export const useDeliveryStore = create<DeliveryStore>((set, get) => ({
  delivery: [],
  add(cartId) {
    set(prev => ({ ...prev, delivery: [{ id: Date.now().toString(), cartId, validation: [] }, ...prev.delivery] }))
  },
  validate(idCart) {
    const { data: user } = user_store.getState()
    if (!user)
      return;

    set(prev => ({ ...prev, delivery: prev.delivery.map(del => del.cartId !== idCart ? del : { ...del, validation: [user, ...del.validation] }) }))

    if (user.Role === "gerant") {
      useCartStore.getState().delivery(idCart)
    }
  },

  countProductInDeliveries: (productId) => {
    const cartStore = useCartStore.getState();
    return get().delivery.reduce((count, del) => {
      const cart = cartStore.carts.find(c => c.id === del.cartId);
      if (!cart) return count;
      return count + cart.items.reduce((sum, item) => item.productId === productId ? sum + item.quantity : sum, 0);
    }, 0);
  },

  countProductByDeliveryStatus: (productId, isDelivery) => {
    const cartStore = useCartStore.getState();
    return get().delivery.reduce((count, del) => {
      const cart = cartStore.carts.find(c => c.id === del.cartId && c.isDelivery === isDelivery);
      if (!cart) return count;
      return count + cart.items.reduce((sum, item) => item.productId === productId ? sum + item.quantity : sum, 0);
    }, 0);
  },
}));