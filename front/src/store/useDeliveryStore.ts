import { create } from 'zustand';
import { User } from '../api/auth';
import { user_store } from './user';

export interface Delivery {
  id?: string;
  cartId: string;
  validation: User[]
}

interface DeliveryStore {
  delivery: Delivery[],
  add: (cartId: string) => void,
  validate: (id: string) => void
}

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  delivery: [],
  add(cartId) {
    set(prev => ({ ...prev, delivery: [{ id: Date.now().toString(), cartId, validation: [] }, ...prev.delivery] }))
  },
  validate(id) {
    const { data: user } = user_store()
    if (user) {
      set(prev => ({ ...prev, delivery: prev.delivery.map(del => del.id !== id ? del : { ...del, validation: [user, ...del.validation] }) }))
    }
  },
}));