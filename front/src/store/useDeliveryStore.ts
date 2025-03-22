import { create } from 'zustand';
import { User } from '../api/auth';
import { user_store } from './user';
import { useCartStore } from './useCartStore';
import { Delivery2 } from '../hook/data';

export interface Delivery {
  id?: string;
  cartId: string;
  validation: User[]
}

interface DeliveryStore {
  delivery: Delivery2[];
  add: (cartId: string) => void;
  setDelivery: (data: Delivery2[]) => void;
  validate: (idCart: string) => void;
  countProductByDeliveryStatus: (productId: string, isDelivery: boolean) => number;
  countProductInDeliveries: (productId: string) => number;
}

export const useDeliveryStore = create<DeliveryStore>((set, get) => ({
  delivery: [],
  add(_cartId) {
    // set(prev => ({ ...prev, delivery: [{ id: Date.now().toString(), cartId, validation: [] }, ...prev.delivery] }))
  },
  setDelivery(data) {
    set({delivery: data})
  },
  validate(idCart) {
    const { data: user } = user_store.getState()
    if (!user)
      return;

    // set(prev => ({ ...prev, delivery: prev.delivery.map(del => del.cartId !== idCart ? del : { ...del, validation: [user, ...del.validation] }) }))

    if (user.Role === "gerant") {
      useCartStore.getState().delivery(idCart)
    }
  },

  countProductInDeliveries: (productId) => {
    const cartStore = useCartStore.getState();
    return get().delivery.reduce((count, del) => {
      const cart = cartStore.carts.find(c => c._id === del.id);
      if (!cart) return count;
      return count + cart.items.reduce((sum, item) => item.productId === productId ? sum + item.quantity : sum, 0);
    }, 0);
  },

  countProductByDeliveryStatus: (productId, isDelivery) => {
    const cartStore = useCartStore.getState();
    return get().delivery?.reduce((count, del) => {
      const cart = cartStore.carts.find(c => c._id === del.id && c.isDelivery === isDelivery);
      if (!cart) return count;
      return count + cart.items.reduce((sum, item) => item.productId === productId ? sum + item.quantity : sum, 0);
    }, 0);
  },
}));