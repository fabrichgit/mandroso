import { create } from 'zustand';
import { Fournisseur } from '../types/fournisseur';
import { CartItem } from '../types/cart';

export type Commande = {
  id?: string;
  productItems: CartItem[];
  fournisseur: Fournisseur | null;
  createdAt: string | Date;
}

interface CommandeStore {
  commande: Commande[];
  editing: Commande | null;
  add: (data: Commande) => void;
  edit: (data: Commande) => void;
  setEditing: (data: Commande | null) => void;
  reset?: () => void;
  delete: (id: string) => void;
}

export const useCommandeStore = create<CommandeStore>((set) => ({
  commande: [],
  editing: null,
  add: (data) => {
    set((state) => ({ commande: [...state.commande, data] }));
  },
  edit: (data_) => {
    set((state) => {
      if (!state.editing) return state;
      return {
        ...state, editing: null, commande: state.commande.map(prev => prev.id === state.editing?.id ? { prev, ...data_ } : prev)
      };
    });
  },
  delete: (id) => {
    set((state) => ({
      commande: state.commande.filter((cart) => cart.id !== id),
    }));
  },
  setEditing: (data) => {
    set({ editing: data });
  },
  reset() {
    set({ commande: [] })
  },
}));